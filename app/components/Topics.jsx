import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router';

import * as ForumAPI from 'ForumAPI';

class Topics extends Component {
  constructor() {
    super();

    this.state = {
      topics: [],
      showTopicInput: false,
    };
  }

  handleAddTopic() {
    this.setState({
      showTopicInput: true
    })
  }

  componentDidMount() {
    var that = this;

    ForumAPI.getTopics().then(topics => {
      that.setState({
        topics: topics,
      })
    });
  }

  renderAddTopicButton() {
    return (
      <button className="button expanded" onClick={this.handleAddTopic.bind(this)}>
        Create a topic
      </button>
    );
  }

  renderTopicInput() {
    if (!this.state.showTopicInput) {
      return;
    }

    console.log('hello');

    return (
      <div className="container modal-content">
        <form onSubmit={this.submitTopic.bind(this)}>
          <input type="text" ref="topicText" defaultValue={this.state.topic} onChange={this.onTopicChange.bind(this)}/>
          <button className="button expanded">
            Submit
          </button>
          <button className="button expanded" onClick={this.onModalClose.bind(this)}>
            Cancel
          </button>
        </form>
      </div>
    );
  }

  renderTopics() {
    if (this.state.topics.length > 0) {
      return (
        this.state.topics.map(function(topic, index) {
          let link = "/topics/" + topic.topic_id;
          return (
            <Link to={link} key={topic.topic_id} className="button expanded hollow">
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
        {this.state.renderTopicInput ? this.renderTopicInput() : ''}
        {this.renderTopics()}
      </div>
    )
  }
}

module.exports = Topics;
