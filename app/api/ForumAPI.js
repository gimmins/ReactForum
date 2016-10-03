import React from 'react';
import axios from 'axios';

function getTopics() {
  return axios.get('http://localhost:8888/forum_api.php/topics')
  .then(function(response) {
    if (response.status === 200) {
      return response.data;
    }
  });
}

function setTopic(topic) {
  return axios.post('http://localhost:8888/forum_api.php/topics', topic)
  .then(function(response) {
    if (response.status === 200) {
      return response.data;
    }
  });
}

export {
  getTopics,
  setTopic,
}
