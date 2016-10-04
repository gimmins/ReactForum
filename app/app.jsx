var React = require('react');
var ReactDOM = require('react-dom');
var { Route, Router, IndexRoute, hashHistory } = require('react-router');

var Main = require('Main');
var Topics = require('Topics');
var Topic = require('Topic');
var Thread = require('Thread');
var Analytics = require('Analytics');

// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="topics" component={Topics}/>
      <Route path="analytics" component={Analytics}/>
      <Route path="topics/:topicId/threads" component={Topic}/>
      <Route path="topics/:topicId/threads/:threadId/posts" component={Thread}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
