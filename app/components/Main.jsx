import React, { Component } from 'react';

var {Link} = require('react-router');

class Main extends Component {
  constuctor() {
    this.state = {
      currentUser: 1,
    }
  }

  render () {
    return (
      <div>
        <div className="top-bar">
          <Link to="/topics" className="top-bar-left menu forum">
            Min Soo's Forum
          </Link>
          <Link to="/analytics" className="top-bar-left menu analytics">
            Analytics
          </Link>
          <div className="top-bar-right menu">
            Min Soo's Github
          </div>
        </div>
        <div className="row">
          <div className="columns small-centered medium-6 large-8">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Main;
