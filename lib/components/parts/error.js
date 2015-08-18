/**
 * @jsx React.DOM
 *
 * @file
 * Render an error alert.
 */

var React = require('react');

module.exports = function(app) {
  'use strict';

  return React.createClass({
    render() {
      return (
        <div className="alert alert-danger alert-dismissible">
          <button className="close"><span>&times;</span></button>
          <strong>Oh Snap!</strong> {this.props.data}
        </div>
      )
    }
  });
}
