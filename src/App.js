import React, {Component} from "react";
import "./App.css";
import axios from "axios";
import RecipeItem from "./RecipeItem"
import ModalInstance from "./modalInstance";
import _ from "lodash";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            show: false,
            ingredients: "",
            title: ""
        };
    }

    componentDidMount() {
        axios.get("/recipes").then(response => {
            this.setState({
                recipes: [...response.data]
            });
        }).catch(err => console.log(err));
    }

    onAdd = e => {
        const newRecipe = {
            title: this.state.title,
            ingredients: this.state.ingredients
        }
        axios.post("/new", newRecipe).then(response => {
            newRecipe.id = response.data.ops[0]._id
            console.log(` adding new ${JSON.stringify(newRecipe)}`);
            this.setState({
                recipes: [
                    ...this.state.recipes,
                    newRecipe
                ]
            });
        }).catch(err => console.log(err));
    };

    delete = e => {
        const id = e.target.id
        axios.delete(`/recipe/${id}`).then(res => {
            const recipes = this.state.recipes.filter(recipe => recipe._id !== id);
            this.setState({recipes: recipes});
        })
    };

    onClick = e => {
        this.setState({
            show: !this.state.show
        });
    };

    update = (id, title, ingredients) => {
        const indexUpdated = this.state.recipes.findIndex(recipe => recipe._id === id);
        const recipes = this.state.recipes;
        recipes[indexUpdated] = {
            _id: id,
            title: title,
            ingredients: ingredients
        }
        this.setState({recipes: recipes});
    }

    renderModal = () => {
        return (<ModalInstance header="Add Recipe" onSubmit={this.onAdd} title={this.state.title} ingredients={this.state.ingredients} id={this.state.id} onChange={this.onChange} footer="Add Recipe" onClick={this.onClick}/>);
    };
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const recipes = this.state.recipes.map((recipe, index) => <RecipeItem key={index} recipe={recipe} index={index} delete={this.delete} update={this.update}/>)
        return (
            <div className="App">
                {recipes}
                <button onClick={this.onClick} className="btn btn-primary pull-left">
                    Add Recipe
                </button>
                {this.state.show
                    ? this.renderModal()
                    : null}
            </div>
        );
    }
}

export default App;
