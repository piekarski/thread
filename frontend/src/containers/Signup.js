import React, {Component} from "react";
import {Label, Form,FormGroup, Input} from "reactstrap";
import LoaderButton from "../components/LoaderButton";
import "../libs/styles/Signup.css";
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }
  validateForm() {
    return (this.state.email.length > 0 && this.state.password.length > 0 && this.state.password === this.state.confirmPassword);
  }
  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    this.setState({newUser: "test"});
    this.setState({isLoading: false});
  }
  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
  }
  renderConfirmationForm() {
    return (<form onSubmit={this.handleConfirmationSubmit}>
      <FormGroup controlId="confirmationCode" bsSize="large">
        <label>Confirmation Code</label>
        <Input autoFocus="autoFocus" type="text" value={this.state.confirmationCode} onChange={this.handleChange}/>
        <div>Please check your email for the code.</div>
      </FormGroup>
      <LoaderButton block="block" bsSize="large" disabled={!this.validateConfirmationForm()} type="submit" isLoading={this.state.isLoading} text="Verify" loadingText="Verifying…"/>
    </form>);
  }
  renderForm() {
    return (<Form onSubmit={this.handleSubmit}>
      <FormGroup id="email" >
        <Label>Email</Label>
        <Input autoFocus={true} id="email" type="email" value={this.state.email} onChange={this.handleChange}/>
      </FormGroup>
      <FormGroup id="password">
        <Label>Password</Label>
        <Input value={this.state.password} id="password" onChange={this.handleChange} type="password"/>
      </FormGroup>
      <FormGroup id="confirmPassword">
        <Label>Confirm Password</Label>
        <Input value={this.state.confirmPassword} id="confirmPassword" onChange={this.handleChange} type="password"/>
      </FormGroup>
      <LoaderButton block={true} disabled={!this.validateForm()} type="submit" isLoading={this.state.isLoading} text="Signup" loadingText="Signing up…"/>
    </Form>);
  }
  render() {
    return (<div className="Signup">
      {
        this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()
      }
    </div>);
  }
}
