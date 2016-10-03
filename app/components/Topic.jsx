import React, { Component } from 'react';
import axios from 'axios';
var {Link} = require('react-router');

import Thread from './Thread';

var threads = [
  'Thread 1',
  'Thread 2',
  'Thread 3',
  'Thread 4',
  'Thread 5',
]

class Topic extends Component {
  constructor() {
    super();

    this.state = { threads: [] };
  }

  componentDidMount() {
    let paths = this.props.location.pathname.split('/');

    let topic_id = paths[2];
    let resourcePath = '/threads/' + paths[2];

    var that = this;
    axios.get('http://localhost:8888/api.php' + resourcePath)
    .then(function(response) {
      that.setState({threads: response.data})
    });
  }

  renderThreads() {
    return (
      threads.map(function(thread, index) {
        let link = "/thread/" + index;
        return (
          <Link to={link} key={index} className="button expanded hollow">
            {thread}
          </Link>
        );
      }
    ));
  }

  render() {
    return (
      <div>
        {this.renderThreads()}
      </div>
    )
  }
}

module.exports = Topic;
