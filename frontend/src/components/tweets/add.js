import React from 'react';
import { connect } from 'react-redux';
import { create as createTweet } from '../../actions/tweets';
import Button from '../button';

const onSubmit = (event, dispatch, input) => {
  event.preventDefault();

  if (!input.value.trim()) { return; }
  
  createTweet(3, input.value);
  input.value = '';
};

const AddTweet = ({ dispatch }) => {
  let input;

  return (
    <div>
      <Button
        onClick={e => onSubmit(e, dispatch, input)}
        color={"lightgreen"}
        symbol={"+"}
      />
      <input ref={node => { input = node }} />
    </div>
  )
};

// enhance component with dispatch etc...
export default connect()(AddTweet);