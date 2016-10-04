import React, {Component} from 'react';

import * as ForumAPI from 'ForumAPI';

class Analytics extends Component {
  constructor() {
    super();

    this.state = {
      total: []
    }
  }

  componentWillMount() {
    var that = this;

    ForumAPI.getTotal().then(total => {
      var arr = [];
      total.map(tot => {
        return arr[tot[0]] = 0;
      })

      total.map(tot => {
        return arr[tot[0]] += parseInt(tot[1]);
      })

      that.setState({
        total:arr
      })
    })
  }

  renderTotal(keys) {
    var value;
    var that = this;

    return keys.map(key => {
      return (
        <div>
          {key}:
          {that.state.total[key]}
        </div>
      )
    })
  }

  render() {
    var keys = Object.keys(this.state.total);
    return (
      <div>
        {keys.length > 0 ? this.renderTotal(keys) : ''}
      </div>
    )
  }
}

module.exports = Analytics;
