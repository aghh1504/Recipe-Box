import React, { Component } from 'react';
import './App.css';
import modalInstance from './modalInstance'
import { Modal, Button } from 'react-bootstrap';
import shortid from 'shortid';
import _ from 'lodash';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        show:false,
        shows:false,
        close: true,
        ingredients: '',
        title: '',
        id: '',
        recipes: []
    }
  }

  onChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  onClick = () => {
    this.setState({show: !this.state.show, close: !this.state.close})
  }

  onAdd = (e) => {
      e.preventDefault();
      this.setState({
          recipes: [...this.state.recipes, {title:this.state.title, ingredients:this.state.ingredients, id: shortid.generate() }],
          close: !this.state.close,
          show: !this.state.show,
          title: '',
          ingredients: ''
      });
  }

  edit = (e) => {
      console.log('edit', e.target, e.target.id)
     this.setState({
         close: !this.state.close,
         shows: !this.state.shows,
         title: e.target.title,
         ingredients: e.target.name,
         id: e.target.id
     })
  }

  delete = (e) => {
      const recipes = this.state.recipes;
      recipes.splice(e.target.id, 1);
      this.setState({
          recipes: recipes
      });
  }

  onUpdate = (e) => {
     e.preventDefault();
    const recipe = {
      id: this.state.id,
      title: this.state.title,
      ingredients: this.state.ingredients
    };
    let recipes = this.state.recipes;
    const index = _.findIndex(this.state.recipes, {id: this.state.id});
    recipes[index] = recipe;
    console.log(recipes);
    this.setState({
      recipes,
      close: !this.state.close,
      shows: !this.state.shows,
      title: '',
      ingredients: ''

    });
  }


  //     <Modal.Dialog show={this.state.show} close={this.state.close}>
  //         <Modal.Header>
  //             <Modal.Title>Add Recipe</Modal.Title>
  //         </Modal.Header>
  //         <form onSubmit={this.onAdd}>
  //             <Modal.Body>
  //                 <h2>Recipe</h2>
  //                 <input value={this.state.title} name="title" onChange={this.onChange} placeholder="Recipe Name"/>
  //                 <h2>Ingredients</h2>
  //                 <input value={this.state.ingredients} name="ingredients" onChange={this.onChange} placeholder="Add Ingredients"/>
  //             </Modal.Body>
  //
  //             <Modal.Footer>
  //                 <Button bsStyle="primary" type="submit">Add Recipe</Button>
  //                 <Button onClick={this.onClick}>Close</Button>
  //             </Modal.Footer>
  //         </form>
  //
  //     </Modal.Dialog>

  // renderModal = () => {
  //   console.log('renderModal function called');
  //     return (
  //         <modalInstance
  //           header='Add Recipe'
  //           onSubmit= {this.onAdd}
  //           title= {this.state.title}
  //           ingredients= {this.state.ingredients}
  //           onChange= {this.onChange}
  //           footer= 'Add Recipe'
  //           onClick= {this.onClick}
  //         />
  //      )
  // }

  updateModal(){
      return (
          <Modal.Dialog show={this.state.show} close={this.state.close}>
              <Modal.Header>
                  <Modal.Title>Edit Recipe</Modal.Title>
              </Modal.Header>
              <form onSubmit={this.onUpdate}>
                  <Modal.Body>
                      <h2>Recipe</h2>
                      <input value={this.state.title} name="title" onChange={this.onChange} placeholder="Recipe Name"/>
                      <h2>Ingredients</h2>
                      <input value={this.state.ingredients} name="ingredients" onChange={this.onChange} placeholder="Add Ingredients"/>
                  </Modal.Body>

                  <Modal.Footer>
                      <Button bsStyle="primary" type="submit">Update Recipe</Button>
                      <Button onClick={this.onClick}>Close</Button>
                  </Modal.Footer>
              </form>
          </Modal.Dialog>
      )
  }

  render() {
    console.log('props in app.js',this.props)

    return (
      <div className="App">
          <ul>
          {
              this.state.recipes.map((recipe, index) => {
                    return(
                      <li key={recipe.id}>
                         <h4>{recipe.title}</h4>
                          <p>{recipe.ingredients}</p>
                          <button onClick={this.edit} id={recipe.id} title={recipe.title} name={recipe.ingredients} >Edit</button>
                          <button onClick={this.delete} id={index}>Delete</button>
                      </li>
                    );
              })
          }
          </ul>
          <button onClick={this.onClick}>Add Recipe</button>
          {/* { this.state.show ? this.renderModal() : null } */}
          { this.state.shows ? this.updateModal() : null }

          {
            this.state.show ? <modalInstance
              header='Add Recipe'
              onSubmit= {this.onAdd}
              title= {this.state.title}
              ingredients= {this.state.ingredients}
              onChange= {this.onChange}
              footer= 'Add Recipe'
              onClick= {this.onClick}
            /> : null
          }


      </div>

    );
  }
}

export default App;
