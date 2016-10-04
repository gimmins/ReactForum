import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';

import Post from 'Post';
import * as ForumAPI from 'ForumAPI';

class Thread extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      postContent: '',
      showPostInput: false,
      currentUser: 1,
    };
  }

  componentDidMount() {
    var that = this;

    ForumAPI.getPosts(this.props.location.pathname).then(posts => {
      var uuidPosts = new Array();
      posts.map(post => {
        uuidPosts.push({
          ...post,
          uuid: uuid()
        });
      });

      this.setState({
        posts: uuidPosts,
      })
    });
  }

  submitPost(e) {
    e.preventDefault();

    var that = this;
    ForumAPI.setPost(
      this.props.location.pathname,
      this.state.postContent,
      this.state.currentUser
    ).then(response => {
      that.setState({
        posts: [
          ...that.state.posts,
          response
        ],
        postContent: '',
        showPostInput: false,
      });
    });
  }

  onCancel() {
    this.setState({
      showPostInput: false
    });
  }

  onPostContentChange(e) {
    this.setState({
      postContent: e.target.value,
    })
  }

  handleAddPost() {
    this.setState({
      showPostInput: true
    })
  }

  renderAddPostButton() {
    return (
      <button className="button expanded"
              onClick={this.handleAddPost.bind(this)}>
        Create a post
      </button>
    );
  }

  renderPostInput() {
    if (!this.state.showPostInput) {
      return;
    }

    return (
      <div className="container modal-content">
        <form onSubmit={this.submitPost.bind(this)}>
          <input type="text"
                 value={this.state.postContent}
                 onChange={this.onPostContentChange.bind(this)}/>
          <button className="button expanded">
            Submit
          </button>
        </form>
        <button className="button expanded alert"
                onClick={this.onCancel.bind(this)}>
          Cancel
        </button>
      </div>
    );
  }

  renderPosts() {
    var that = this;
    return (
      this.state.posts.map(function(post, index) {
        let path = that.props.location.pathname;
        return (
          <div key={post.uuid}>
            <Post path={path}
                  postId={post.post_id}
                  username={post.post_by}
                  date={post.post_date}
                  content={post.post_content} />
          </div>
        );
      })
    );
  }

  render() {
    return (
      <div>
        {this.renderAddPostButton()}
        {this.renderPostInput()}
        {this.renderPosts()}
      </div>
    );
  }
}

module.exports = Thread;
