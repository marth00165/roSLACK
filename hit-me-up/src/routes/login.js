import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import {Message, Form, Button, Input, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { gql } from "apollo-boost";

class Login extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
      errors: {},
    });
  }

  onSubmit = async () => {
    const { email, password } = this;
    const response = await this.props.mutate({
      variables: { email, password },
    });

    console.log(response);

    const {
      ok, token, refreshToken, errors,
    } = response.data.login;

    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.props.history.push('/create-team');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });

      this.errors = err;
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  };

  render() {
    const { email, password, errors: { emailError, passwordError } } = this;

    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }

    return (
  <html lang="en">
    <body style={{display: "flex", justifyContent:"center", alignItems:"center", width: "100vw", height: "100vh", backgroundImage:"url(https://wallpapercave.com/wp/Yuj5g8L.jpg)", backgroundSize:"cover"}}>
      <Container style={{border:"2px solid grey", width:"400px", opacity: "0.8", padding:"20px", backgroundColor: "white"}}  text>
        <Header as="h2">Login</Header>
        <Form>
          <Form.Field error={!!emailError}>
            <Input name="email" onChange={this.onChange} value={email} placeholder="Email" fluid />
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input
              name="password"
              onChange={this.onChange}
              value={password}
              type="password"
              placeholder="Password"
              fluid
            />
          </Form.Field>
          <Button primary onClick={this.onSubmit}>Login</Button>
          <Button primary type="button" onClick={() => this.props.history.push("/register")}>Register</Button>
        </Form>
        {errorList.length ? (
          <Message error header="There was some errors with your submission" list={errorList} />
        ) : null}
      </Container>
    </body>
  </html>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));
