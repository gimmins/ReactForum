var React = require('react');
var ReactDOM = require('react-dom');
var { Route, Router, IndexRoute, hashHistory } = require('react-router');
var Main = require('Main');
var Topics = require('Topics');
var Topic = require('Topic');
var Thread = require('Thread');

// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="topics" component={Topics}/>
      <Route path="topics/:topicId" component={Topic}/>
      <Route path="thread/:threadId" component={Thread}/>
    </Route>
  </Router>,
  document.getElementById('app')
);
