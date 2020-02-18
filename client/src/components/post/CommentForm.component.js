import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post.action';

const CommentForm = ({ post_id, addComment }) => {
  const [text, setText] = useState('');

  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    addComment(post_id, { text });
    setText('');
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment...</h3>
      </div>
      <form className='form my-1' onSubmit={e => onSubmit(e)}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Add a comment'
          required
          value={text}
          onChange={e => onChange(e)}
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
