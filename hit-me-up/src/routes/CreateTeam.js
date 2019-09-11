import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import {Message, Form, Button, Input, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import { gql } from "apollo-boost";

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: '',
      errors: {}

    });
  }

  onSubmit = async () => {
    const { name } = this;
    let response = null;

    try {
      response = await this.props.mutate({
       variables: { name },
     });
   } catch (err) {
     this.props.history.push('/login')
     return;
   }




    const {ok, errors} =  response.data.createTeam;
    console.log(ok)


    if (ok) {
       (this.props.history.push(`/view-team`))
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
    const { name, errors: { nameError } } = this;

    const errorList = [];


    if (nameError) {
      errorList.push(nameError);
    }

    return (
      <body style={{display: "flex", justifyContent:"center", alignItems:"center", width: "100vw", height: "100vh", backgroundImage:"url(https://media2.giphy.com/media/BHNfhgU63qrks/giphy.gif)", backgroundSize:"cover"}}>
      <Container style={{border:"2px solid grey", width:"400px", opacity: "0.8", padding:"20px", backgroundColor: "white"}}  text>
        <Header as="h2">Create A Team</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input name="name" onChange={this.onChange} value={name} placeholder="Team Name" fluid />
          </Form.Field>

          <Button primary onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length ? (
          <Message error header="There was some errors with your submission" list={errorList} />
        ) : null}
      </Container>
    </body>
    );
  }
}

const createTeamMutation = gql`
  mutation($name: String!) {
      createTeam(name: $name) {
          ok
          errors {
            path
            message
          }
        }
      }
    `;

export default graphql(createTeamMutation)(observer(CreateTeam));
