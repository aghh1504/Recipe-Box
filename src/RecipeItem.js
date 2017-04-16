import React, { Component } from "react";
import axios from "axios";
import ModalInstance from "./modalInstance";
import _ from "lodash";
import { Panel, ListGroup, ListGroupItem } from "react-bootstrap";

class RecipeItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      shows: false
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  edit = e => {
    this.setState({
      shows: !this.state.shows,
      title: e.target.title,
      ingredients: e.target.name
    });
  };

  onUpdate = e => {
    e.preventDefault();
    console.log('id update: ', this.props.recipe._id);
    axios
      .put(`/recipe/`, {
        title: this.state.title,
        ingredients: this.state.ingredients,
        _id: this.props.recipe._id
      })
      .then(response => {
        console.log('response from update', response)
        this.props.update(this.props.recipe._id, this.state.title, this.state.ingredients)
        this.setState({
          close: !this.state.close,
          shows: !this.state.shows,
          title: "",
          ingredients: ""
        });
      })
      .catch(err => console.log(err))
  };


  updateModal = () => {
    return (
      <ModalInstance
        header="Update Recipe"
        onSubmit={this.onUpdate}
        title={this.state.title}
        ingredients={this.state.ingredients}
        onChange={this.onChange}
        id={this.state.id}
        footer="Update Recipe"
        onClick={this.onClick}
      />
    );
  };

  render() {
    console.log(`reciper item ${JSON.stringify(this.props.recipe)}`);
    const ingredients = this.props.recipe.ingredients ? this.props.recipe.ingredients.split(",") : [];
    return (
      <div>
            <Panel
              key={this.props.index}
              collapsible
              bsStyle="success"
              header={this.props.recipe.title}
            >
              <h4>Ingredients</h4>
              <ListGroup fill>
                {ingredients.map(ingredient => (
                  <ListGroupItem key={ingredient}>{ingredient}</ListGroupItem>
                ))}
              </ListGroup>
              <div className="buttons-in-panel pull-left">
                <button
                  onClick={this.edit}
                  id={this.props.recipe._id}
                  title={this.props.recipe.title}
                  name={ingredients}
                  className="btn btn-info"
                >
                  Edit
                </button>
                <button
                  onClick={this.props.delete}
                  id={this.props.recipe._id}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </Panel>

        {this.state.shows ? this.updateModal() : null}
      </div>
    );
  }
}

export default RecipeItem;
