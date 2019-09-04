import React from "react";
import {Input, Container, Header, Button, Message} from 'semantic-ui-react';
import { gql } from "apollo-boost";
import {graphql} from 'react-apollo';

 class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  };

  onChange = e => {

    const {name, value} = e.target;
    //name = "email"
    this.setState({
      [name]: value
    })
  };

  onClick = async() => {
  this.setState({
    usernameErr: '',
    emailErr: '',
    passwordErr: ''
  })
  const {username, email, password} = this.state;
  const response = await this.props.mutate({
      variables: {username,email,password},
    });

    const {ok, errors} = response.data.register;
    if (ok) {
      this.props.history.push('/')
    } else {
      const err = {};
      errors.forEach( ({path, message}) => {
        err[`${path}Err`] = message;
        //err['passwordErr'] = 'too long.. '
      });
      this.setState(err)

    }

  };


  render(){
    const {username,email,password, usernameErr, emailErr, passwordErr} = this.state;
    const errorList = [];

    if(usernameErr){
      errorList.push(usernameErr)
    }

    if(emailErr){
      errorList.push(emailErr)
    }

    if(passwordErr){
      errorList.push(passwordErr)
    }

    return (

      <Container text>
        <Header as='h2'>Register</Header>
        <Input
        error = {!!usernameErr}
        name = "username"
        onChange={this.onChange}
        value= {username}
        fluid
        placeholder='Username'
        />

        <Input
        error = {!!emailErr}
        name = "email"
        onChange={this.onChange}
        value= {email}
        fluid
        placeholder='Email'
        />
        <Input
        error = {!!passwordErr}
        name = "password"
        onChange={this.onChange}
        value= {password}
        type="password"
        fluid
        placeholder='Password'
         />
        <Button onClick = {this.onClick} primary>Register</Button>
        {(usernameErr || emailErr || passwordErr) ? <Message
        error
        header='There was some errors with your submission'
        list={errorList}
  />: null}
      </Container>

    )
  }

}
const registerMutation = gql `
mutation($username: String!, $email: String!, $password: String!) {
register(username: $username, email: $email, password: $password ){
  ok
  errors {
    path
    message
  }
}
}
`;

export default graphql(registerMutation)(Register)
