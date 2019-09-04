import React from 'react';
import {extendObservable} from 'mobx';
import {observer} from 'mobx-react';
import { Button, Input, Container, Header } from 'semantic-ui-react';


export default observer(class Login extends React.Component {

  constructor(props){
    super(props);

    extendObservable(this, {
      email: '',
      password:'',

    })
  }

  onClick = (e) => {
    e.preventDefault();
    const {email, password} = this;
    console.log(email);
    console.log(password);

  }

  onChange = e => {
    const {name, value} = e.target;
    this[name] = value;
  }

  render() {
    const {email, password} = this;
    return(

      <Container text>
        <Header as='h2'>Login</Header>

        <Input name = "email" onChange={this.onChange} value= {email} fluid placeholder='Email' />
        <Input name = "password" onChange={this.onChange} value= {password} type="password" fluid placeholder='Password'/>


        <Button onClick = {this.onClick} primary>Login</Button>


      </Container>




    )
  }
})
