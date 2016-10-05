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
        <div className="row">
          <div className="large-4 columns"></div>
          <div key={reply.uuid} className="large-8 columns container reply">
            {reply.reply_content}
            {reply.reply_by}
          </div>
        </div>
      )
    })
  }

  renderReplyButton() {
    return (
      <form onSubmit={this.onPost.bind(this)}>
        <div className="row">
          <div className="large-4 columns"></div>
          <div className="large-8 columns container reply-input">
            <textarea type="textarea" ref="postContent"></textarea>
            <input type="submit" className="button expanded reply-button" value="Reply"/>
          </div>
        </div>
      </form>
    );
  }

  renderPosts() {
    const {username, date, content} = this.props;
    return (
      <div className="container posts">
        <div>
          {username}
        </div>
        <div>
          {date}
        </div>
        <div>
          {content}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderPosts()}
        <div className="reply-container">
          {this.renderReplyButton()}
          {this.renderReplies()}
        </div>
      </div>
    )
  }
}

module.exports = Post;
