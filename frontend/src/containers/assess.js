import React, {Component} from "react";
import {Input} from '@salesforce/design-system-react';
import {Button} from '@salesforce/design-system-react';
// import {invokeApig} from "../libs/awsLib";
// import LoaderButton from "../components/LoaderButton";
// import config from "../config";
export default class assess extends Component {
  constructor(props) {
    super(props);
    this.file = null;
    this.state = {
      isLoading: null,
      content: ""
    };
  }
  validateForm() {
    return this.state.content.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleFileChange = event => {
    this.file = event.target.files[0];
  }
  handleSubmit = async event => {
    console.log("handleSubmit");
    event.preventDefault();
    if (this.file && this.file.size > 5000000) {
      alert("Please pick a file smaller than 5MB");
      return;
    }
    this.setState({isLoading: true});
    try {
      await this.submitExam({content: this.state.content});
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({isLoading: false});
    }
  }
  submitExam(note) {
    // return invokeApig({path: "/exam", method: "POST", body: note});
  }

render() {
  return (<div className="assess">

    <div className="slds-grid slds-grid_align-center">

      <div className="slds-col slds-size_2-of-3">
        <Input className="slds-m-around_large" label="Question 1" id="assistiveLabel-id" placeholder="Enter an Answer"/>

        <div className="slds-m-around_large">
          <label>Attachment
            <input onChange={this.handleFileChange} type="file"/>
          </label>
        </div>
        <Button className="slds-m-around_large" onClick={this.handleSubmit} label="Submit"/>
      </div>
    </div>
  </div>);
}
}
