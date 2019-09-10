import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import {flowRight as compose} from 'lodash'
import {gql} from 'apollo-boost';
import { graphql } from 'react-apollo';


const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const ENTER_KEY = 13;



const InputDiv = ({
  channelName,
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,

}) => (
  <SendMessageWrapper>
    <Input
    onKeyDown={(e) => {
      if (e.keyCode === ENTER_KEY && !isSubmitting ){
        handleSubmit(e);
      }
    }}
    onChange={handleChange}
    onBlur={handleBlur}
    name="message"
    value={values.message}
    fluid
    placeholder={`Message #${channelName}`}
    />
  </SendMessageWrapper>
);

const createMessageMutation = gql`
  mutation($channel_id: Int!, $text: String!) {
    createMessage(channel_id: $channel_id, text: $text)
  }
`;

export default compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({ message: '' }),
    handleSubmit: async (values, { props: { channel_id, mutate }, setSubmitting, resetForm }) => {
      if (!values.message || !values.message.trim()) {
        setSubmitting(false);
        return;
      }

      await mutate({
        variables: { channel_id, text: values.message },
      });
      resetForm(false);
    },
  }),
)(InputDiv);
