import React, {Component} from "react";
import config from "../config";
import {CognitoUserPool, AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";
import LoaderButton from "../components/LoaderButton";
// import "./Login.css";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  login(email, password) {

    const userPool = new CognitoUserPool({UserPoolId: config.cognito.USER_POOL_ID, ClientId: config.cognito.APP_CLIENT_ID});
    const user = new CognitoUser({Username: email, Pool: userPool});
    const authenticationData = {
      Username: email,
      Password: password
    };
    console.log(userPool);
    console.log(user);
    const authenticationDetails = new
    AuthenticationDetails(authenticationData);
    return new Promise((resolve, reject) => user.authenticateUser(authenticationDetails, {
      onSuccess: result => resolve(),
      onFailure: err => reject(err)
    }));
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({isLoading: true});
    try {
      await this.login(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({isLoading: false});
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (<div className="container Login">
      <div className="row justify-content-center Login">
        <Form className="" onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <LoaderButton block={true} disabled={!this.validateForm()} type="submit" isLoading={this.state.isLoading} text="Login" loadingText="Logging in…"/>
          </FormGroup>
        </Form>
      </div>

    </div>);
  }
}
