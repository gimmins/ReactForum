import React from 'react';
import axios from 'axios';
import moment from 'moment';
import uuid from 'uuid';

function getTopics() {
  return axios.get('http://www.gimmins.com/forum_api.php/topics')
  .then(function(response) {
    if (response.status === 200) {
      console.log(response);
      return response.data;
    }
  });
}

function setTopic(topic, user) {
  return axios.post('http://www.gimmins.com/forum_api.php/topics', {
    topic: topic,
    user: user,
  })
  .then(response => {
    if (response.status === 200) {
      response.data[0].uuid = uuid();
      return response.data[0];
    }
  });
}

function getThreads(path) {
  return axios.get(`http://www.gimmins.com/forum_api.php${path}`)
  .then(response => {
    if (response.status === 200) {
      return response.data;
    }
  })
}

function setThread(path, thread, user) {
  return axios.post(`http://www.gimmins.com/forum_api.php${path}`, {
    thread: thread,
    user: user,
  })
  .then(response => {
    if (response.status === 200) {
      console.log(response.data);
      response.data[0].uuid = uuid();
      return response.data[0];
    }
  });
}

function getPosts(path) {
  return axios.get(`http://www.gimmins.com/forum_api.php/${path}`)
  .then(response => {
    if (response.status === 200) {
      return response.data;
    }
  })
}

function setPost(path, post, user) {
  return axios.post(`http://www.gimmins.com/forum_api.php${path}`, {
    post: post,
    user: user,
  })
  .then(response => {
    if (response.status === 200) {
      response.data[0].uuid = uuid();
      return response.data[0];
    }
  })
}

function getReplies(path, postId) {
  return axios.get(`http://www.gimmins.com/forum_api.php${path}/${postId}`)
  .then(response => {
    if (response.status === 200) {
        return response.data;
    }
  })
}

function postReply(path, postId, reply, user) {
  var date = moment().format('YYYY-MM-DD');

  return axios.post(`http://www.gimmins.com/forum_api.php${path}/${postId}`, {
    reply: reply,
    user: user,
  })
  .then(response => {
    if (response.status === 200) {
      response.data[0].uuid = uuid();
      return response.data[0];
    }
  })
}

function getTotal() {
  return axios.get('http://www.gimmins.com/forum_api.php/analytics/total')
  .then(response => {
    if (response.status === 200) {
      return response.data;
    }
  })
}

export {
  getTopics,
  setTopic,
  getThreads,
  setThread,
  getPosts,
  setPost,
  getReplies,
  postReply,
  getTotal,
}
