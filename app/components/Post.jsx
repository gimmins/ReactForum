import React, { Component } from 'react';
import uuid from 'uuid';
import moment from 'moment';

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
      that.refs.postContent.value = '';
    });
  }

  renderReplies() {
    return this.state.replies.map((reply, index) => {
      var readableDate = moment(reply.reply_date, "YYYY-MM-DD HH:mm:ss").format("dddd MMMM Do YYYY");
      return (
        <div key={reply.uuid} className="row replies">
          <div className="large-4 columns"></div>
          <div key={reply.uuid}
               className="large-8 columns button warning hollow reply-button">
            <p>
              {reply.reply_by}
            </p>
            <p className="date">
              {readableDate}
            </p>
            <p className="content">
              {reply.reply_content}
            </p>
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
            <input type="submit"
                   className="button expanded reply-button"
                   value="Reply"/>
          </div>
        </div>
      </form>
    );
  }

  renderPosts() {
    const {username, date, content} = this.props;
    var readableDate = moment(date, "YYYY-MM-DD HH:mm:ss").format("dddd MMMM Do YYYY");
    return (
      <div className="button hollow posts">
        <div>
          {username}
        </div>
        <div className="date">
          <p>
            {readableDate}
          </p>
        </div>
        <div className="content">
          <p>
            {content}
          </p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderPosts()}
        <div className="reply-container">
          {this.renderReplies()}
          {this.renderReplyButton()}
        </div>
      </div>
    )
  }
}

module.exports = Post;
