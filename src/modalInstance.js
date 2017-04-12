import React,  { Component } from "react";
import { Button, Modal } from "react-bootstrap";

class  modalInstance extends Component  {

  onChange = () => {
    this.props.onChange()
  }
  onClick = () => {
    this.props.onClick()
  }
  onSubmit = () => {
    this.props.onSubmit()
  }
  render() {
    console.log('props in modalInstance',this.props)
  return (
    <Modal.Dialog >
        <Modal.Header>
            <Modal.Title>{this.props.header}</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.onSubmit}>
            <Modal.Body>
                <h2>Recipe</h2>
                <input value={this.props.title} name="title" onChange={this.onChange} placeholder="Recipe Name"/>
                <h2>Ingredients</h2>
                <input value={this.props.ingredients} name="ingredients" onChange={this.onChange} placeholder="Add Ingredients"/>
            </Modal.Body>

            <Modal.Footer>
                <Button bsStyle="primary" type="submit">{this.props.footer}</Button>
                <Button onClick={this.onClick}>Close</Button>
            </Modal.Footer>
        </form>

    </Modal.Dialog>
  )
  }
};
export default modalInstance;
