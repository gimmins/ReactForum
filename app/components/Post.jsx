import React, { Component } from 'react';
import uuid from 'uuid';

import * as ForumAPI from 'ForumAPI';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      replies: [],
    }
  }

  componentDidMount() {
    var that = this;

    ForumAPI.getReplies(this.props.path, this.props.postId)
    .then(replies => {
      var uuidReplies = new Array();
      replies.map(reply => {
        uuidReplies.push({
          ...reply,
          uuid: uuid()
        });
      });

      this.setState({
        replies: uuidReplies,
      })
    })
  }

  onPost(e) {
    e.preventDefault();

    var that = this;
    ForumAPI.postReply(
      this.props.path,
      this.props.postId,
      this.refs.postContent.value,
      this.props.username
    ).then(response => {
      that.setState({
        replies: [
          ...that.state.replies,
          response
        ],
      });
    });
  }

  renderReplies() {
    return this.state.replies.map((reply, index) => {
      return (
        <div key={reply.uuid} className="container reply">
          {reply.reply_content}
          {reply.reply_by}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        Post
        <div>
          {this.props.username}
        </div>
        <div>
          {this.props.date}
        </div>
        <div>
          {this.props.content}
        </div>
        <div className="reply-container">
          {this.renderReplies()}
        </div>
        <form onSubmit={this.onPost.bind(this)}>
          <ul>
            <li>
              <input type="textarea" ref="postContent"/>
            </li>
            <li>
              <input type="submit" className="button" value="Reply"/>
            </li>
          </ul>
        </form>
      </div>
    )
  }
}

module.exports = Post;
