import React, { Component } from 'react';

class Post extends Component {
  onPost(e) {
    e.preventDefault();
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
          {this.props.contents}
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
