/**
 * @jsx React.DOM
 *
 * @file
 * Render a row for the view output.
 */

var React = require('react');

module.exports = function(app) {
  'use strict';
  return React.createClass({
    render() {
      return (
        <div className="panel panel-default">
          <div className="panel-heading">{this.props.data.title[0].value}</div>
          <div className="panel-body" dangerouslySetInnerHTML={{__html: this.props.data.body[0].value}}></div>
        </div>
      );
    }
  });
};
