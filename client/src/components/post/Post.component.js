import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post.action';
import PostItem from '../posts/PostItem.component';
import CommentForm from '../post/CommentForm.component';
import CommentItem from '../post/CommentItem.component';
import Spinner from '../layout/Spinner.component';
import { Link } from 'react-router-dom';

const Post = ({ getPost, post: { post, loading }, match }) => {
  // useEffect(() => {
  //   getPost(match.params.id);
  // }, [getPost]);

  useEffect(() => {
    const interval = setInterval(() => {
      getPost(match.params.id);
    }, 3000);
    return () => clearInterval(interval);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back to Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm post_id={post._id} />
      <div className='comments'>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} post_id={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
