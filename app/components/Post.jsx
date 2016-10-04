import React, { Component } from 'react';

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

    ForumAPI.getReplies(this.props.path, this.props.postId).then(replies => {
      this.setState({
        replies: replies,
      })
    })
  }

  onPost(e) {
    e.preventDefault();

    ForumAPI.postReply(this.props.path, this.props.postId, this.refs.postContent.value, this.props.username);
  }

  renderReplies() {
    return this.state.replies.map((reply, index) => {
      return (
        <div key={reply.reply_id}>
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
        {this.renderReplies()}
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
