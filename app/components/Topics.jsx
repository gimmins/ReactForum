import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import {Link} from 'react-router';

import * as ForumAPI from 'ForumAPI';

class Topics extends Component {
  constructor() {
    super();

    this.state = {
      topics: [],
      topicContent: '',
      showTopicInput: false,
      currentUser: 1,
    };
  }

  componentDidMount() {
    var that = this;

    ForumAPI.getTopics().then(topics => {
      var uuidTopics = new Array();
      topics.map(topic => {
        uuidTopics.push({
          ...topic,
          uuid: uuid()
        });
      });

      that.setState({
        topics: uuidTopics,
      });
    });
  }

  submitTopic(e) {
    e.preventDefault();

    var that = this;
    ForumAPI.setTopic(this.state.topicContent, this.state.currentUser).then(response => {
      that.setState({
        topics: [
          ...that.state.topics,
          response
        ],
        topicContent: '',
        showTopicInput: false,
      });
    });
  }

  onCancel() {
    this.setState({
      showTopicInput: false
    });
  }

  onTopicContenChange(e) {
    this.setState({
      topicContent: e.target.value,
    })
  }

  handleAddTopic() {
    this.setState({
      showTopicInput: true
    })
  }

  renderAddTopicButton() {
    return (
      <button className="button expanded"
              onClick={this.handleAddTopic.bind(this)}>
        Create a topic
      </button>
    );
  }

  renderTopicInput() {
    if (!this.state.showTopicInput) {
      return;
    }

    return (
      <div className="container modal-content topics">
        <form onSubmit={this.submitTopic.bind(this)}>
          <input type="text" ref="topicText"
                 value={this.state.topicContent}
                 placeholder='Please insert your topics here'
                 onChange={this.onTopicContenChange.bind(this)}/>
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

  renderTopics() {
    if (this.state.topics.length > 0) {
      return (
        this.state.topics.map(function(topic, index) {
          let link = "/topics/" + topic.topic_id + '/threads';
          return (
            <Link to={link}
                  key={topic.uuid}
                  className="button expanded hollow">
              {topic.topic_subject}
            </Link>
          );
        }
      ));
    }
  }

  render() {
    return (
      <div>
        {this.renderAddTopicButton()}
        {this.renderTopicInput()}
        {this.state.renderTopicInput ? this.renderTopicInput() : ''}
        {this.renderTopics()}
      </div>
    )
  }
}

module.exports = Topics;
