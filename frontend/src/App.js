import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import Routes from "./routes";
import "./libs/styles/app.css";
import {Button} from 'reactstrap';
import RouteNavItem from "./components/RouteNavItem";
import {authUser, signOutUser} from "./libs/awsLib";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    } catch (e) {
      alert(e);
    }
    this.setState({isAuthenticating: false});
  }
  userHasAuthenticated = authenticated => {
    this.setState({isAuthenticated: authenticated});
  }

  handleLogout = event => {
    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (<div className="thread container">
      <div className="row header justify-content-start align-items-center">
        <div className="col ">
          <div className="catch-phrase">community directory</div>

        </div>
        <Navbar className="" color="light" light={true} expand="md">
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav className="ml-auto" navbar={true}>
              {
                this.state.isAuthenticated
                  ? <RouteNavItem onClick={this.handleLogout}>Logout</RouteNavItem>
                  : [
                    <RouteNavItem key={1} href="/signup">
                      Signup
                    </RouteNavItem>,
                    <RouteNavItem key={2} href="/login">
                      Login
                    </RouteNavItem>
                  ]
              }
            </Nav>
          </Collapse>
        </Navbar>

      </div>
      <Routes childProps={childProps}/>
    </div>);
  }
}
export default withRouter(App);
