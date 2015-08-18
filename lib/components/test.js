/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var events = require('./../dispatchers/events');

module.exports = React.createClass({
  displayName: 'TodoItem',

  get(name) {
    return this.state[name] || this.props[name];
  },

  getInitialState: function() {
    return { done: null, name: null }
  },

  componentDidMount: function() {
    this.setState({name: this.props.name});

    events.on('test', function() {
      this.setState({name: 'test'});
    }.bind(this));

    setTimeout(function() {
      events.do('test');
    }, 5000)
  },

  render: function() {
    return (
      <label>
        <input type="checkbox" />
        {this.get('name')}
      </label>
    );
  }
});
