import React, { Component } from 'react';
import axios from 'axios';

import Post from 'Post';

var posts = [
  {
    username: 'gontamaru',
    date: '6/21/2016 07:20',
    contents: 'I always thought that this would work'
  },
  {
    username: 'gontamaru',
    date: '6/21/2016 07:20',
    contents: 'I always thought that this would work'
  },
  {
    username: 'gontamaru',
    date: '6/21/2016 07:20',
    contents: 'I always thought that this would work'
  }
]

class Thread extends Component {
  renderPosts() {
    return (
      posts.map(function(post, index) {
        return (
          <div key={index}>
            <Post username={post.username} date={post.date} conents={post.conents} />
          </div>
        );
      })
    );
  }
  render() {
    return (
      <div>
        {this.renderPosts()}
      </div>
    );
  }
}

module.exports = Thread;
