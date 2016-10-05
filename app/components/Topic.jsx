import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import {browserHistory} from 'react-router';

var {Link} = require('react-router');

import * as ForumAPI from 'ForumAPI';
import Thread from 'Thread';

class Topic extends Component {
  constructor() {
    super();

    this.state = {
      threads: [],
      threadContent: '',
      showThreadInput: false,
      currentUser: 1,
    };
  }

  componentDidMount() {
    var that = this;

    ForumAPI.getThreads(this.props.location.pathname).then(threads => {
      var uuidThreads = new Array();
      threads.map(thread => {
        uuidThreads.push({
          ...thread,
          uuid: uuid()
        });
      });

      this.setState({
        threads: uuidThreads,
      });
    });
  }

  submitThread(e) {
    e.preventDefault();

    var that = this;
    ForumAPI.setThread(
      this.props.location.pathname,
      this.state.threadContent,
      this.state.currentUser
    ).then(response => {
      that.setState({
        threads: [
          ...that.state.threads,
          response
        ],
        threadContent: '',
        showThreadInput: false,
      });
    });
  }

  onCancel() {
    this.setState({
      showThreadInput: false
    });
  }

  onThreadContentChange(e) {
    this.setState({
      threadContent: e.target.value,
    })
  }

  handleAddThread() {
    this.setState({
      showThreadInput: true
    })
  }

  renderAddThreadButton() {
    return (
      <button className="button expanded"
              onClick={this.handleAddThread.bind(this)}>
        Create a thread
      </button>
    );
  }

  renderThreadInput() {
    if (!this.state.showThreadInput) {
      return;
    }

    return (
      <div className="container modal-content threads">
        <form onSubmit={this.submitThread.bind(this)}>
          <input type="text"
                 placeholder="Please insert your thread here"
                 value={this.state.threadContent}
                 onChange={this.onThreadContentChange.bind(this)}/>
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

  handleBack() {
    var paths = this.props.location.pathname.trim().split('/');
    window.location = '#/' + paths[1];
  }

  renderBackButton() {
    return (
      <div>
        <button className="button expanded" onClick={this.handleBack.bind(this)}>
          Back
        </button>
      </div>
    )
  }

  renderThreads() {
    var that = this;

    if (this.state.threads.length > 0) {
      return (
        this.state.threads.map(function(thread, index) {
          let link = that.props.location.pathname + '/' + thread.thread_id +"/posts";
          return (
            <Link to={link}
                  key={thread.uuid}
                  className="button expanded hollow">
              {thread.thread_subject}
            </Link>
          );
        })
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderBackButton()}
        {this.renderAddThreadButton()}
        {this.renderThreadInput()}
        {this.renderThreads()}
      </div>
    )
  }
}

module.exports = Topic;
