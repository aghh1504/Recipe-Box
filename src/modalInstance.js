import React,  { Component } from "react";
import { Button, Modal } from "react-bootstrap";

export default class  ModalInstance extends Component  {

  onChange = (e) => {
    this.props.onChange(e)
  }
  onClick = (e) => {
    this.props.onClick(e)
  }
  onSubmit = (e) => {
    this.props.onSubmit(e)
  }
  render() {
    console.log('props in modalInstance',this.props)
  return (
    <Modal.Dialog >
        <Modal.Header>
            <Modal.Title>{this.props.header}</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.onSubmit} id={this.props.id}>
            <Modal.Body>
                <h2>Recipe</h2>
                <input value={this.props.title} name="title" onChange={this.onChange} placeholder="Recipe Name" className="form-control"/>
                <h2>Ingredients</h2>
                <input value={this.props.ingredients} name="ingredients" onChange={this.onChange} placeholder="Add Ingredients" className="form-control"/>
            </Modal.Body>
            <Modal.Footer>
                <Button bsStyle="primary" type="submit">{this.props.footer}</Button>
                <Button onClick={this.onClick} name='close'>Close</Button>
            </Modal.Footer>
        </form>
    </Modal.Dialog>
  )
  }
};
