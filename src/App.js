import React, { Component } from "react";
import "./App.css";
import axios from 'axios';
import ModalInstance from "./modalInstance";
import shortid from "shortid";
import _ from "lodash";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      open: false,
      shows: false,
      close: true,
      ingredients: "",
      title: "",
      id: "",
      recipes: []
    };
  }

  componentDidMount() {
  axios.get('http://localhost:8080/recipes')
    .then(response=>{
      this.setState({
        recipes: [...response.data]
      });
    })
    .catch(err=> console.log(err))

  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = (e) => {
    this.setState({ show: !this.state.show, close: !this.state.close });
    if(e.target.name == 'close'){
      this.setState({ shows: false, show: false});
    }
  };

  onAdd = e => {
    axios.post('http://localhost:8080/new',{  title: this.state.title,
      ingredients: this.state.ingredients,
      id: shortid.generate()})
    .then(response => response.status)
    .catch(err => console.log(err))
    e.preventDefault();
    this.setState({
      recipes: [
        ...this.state.recipes,
        {
          title: this.state.title,
          ingredients: this.state.ingredients,
          id: shortid.generate()
        }
      ],
      close: !this.state.close,
      show: !this.state.show,
      title: "",
      ingredients: ""
    });
  };

  edit = e => {
    this.setState({
      close: !this.state.close,
      shows: !this.state.shows,
      title: e.target.title,
      ingredients: e.target.name,
      id: e.target.id
    });
  };

  delete = e => {
    const recipes = this.state.recipes;
    recipes.splice(e.target.id, 1);
    this.setState({
      recipes: recipes
    });
  };

  onUpdate = e => {
    e.preventDefault();
    axios.post('http://localhost:8080/update',{  title: this.state.title,
      ingredients: this.state.ingredients,
      id: this.state.id })
    .then(response => response.status)
    .catch(err => console.log(err))
    const recipe = {
      id: this.state.id,
      title: this.state.title,
      ingredients: this.state.ingredients
    };
    let recipes = this.state.recipes;
    const index = _.findIndex(this.state.recipes, { id: this.state.id });
    recipes[index] = recipe;
    this.setState({
      recipes,
      close: !this.state.close,
      shows: !this.state.shows,
      title: "",
      ingredients: ""
    });
  };

  renderModal = () => {
    return (
      <ModalInstance
        header="Add Recipe"
        onSubmit={this.onAdd}
        title={this.state.title}
        ingredients={this.state.ingredients}
        onChange={this.onChange}
        footer="Add Recipe"
        onClick={this.onClick}
      />
    );
  };

  updateModal=() =>{
    return (
      <ModalInstance
        header="Update Recipe"
        onSubmit={this.onUpdate}
        title={this.state.title}
        ingredients={this.state.ingredients}
        onChange={this.onChange}
        footer="Update Recipe"
        onClick={this.onClick}
      />
    );
  }

  render() {
    return (
      <div className="App">
          {this.state.recipes.map((recipe, index) => {
            const ingredients = recipe.ingredients.split(',')
            return (
                <Panel  key={recipe.id} collapsible  bsStyle="success"  header={recipe.title}>
                  <h4>Ingredients</h4>
                  <ListGroup fill>
                    {
                      ingredients.map(ingredient => <ListGroupItem key={ingredient}>{ingredient}</ListGroupItem>)
                    }
              </ListGroup>
              <div className='buttons-in-panel pull-left'>
              <button
                onClick={this.edit}
                id={recipe.id}
                title={recipe.title}
                name={recipe.ingredients}
                className='btn btn-info'
              >
                Edit
              </button>
              <button onClick={this.delete} id={index} className='btn btn-danger'>Delete</button>
            </div>
              </Panel>
            );
          })}
        <button onClick={this.onClick} className='btn btn-primary pull-left'>Add Recipe</button>
        {this.state.show ? this.renderModal() : null}
        {this.state.shows ? this.updateModal() : null}
      </div>
    );
  }
}

export default App;
