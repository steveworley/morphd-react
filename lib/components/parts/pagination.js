/**
 * @jsx React.DOM
 *
 * @file
 * Render a row for the view output.
 */

module.exports = function(app) {
  'use strict';

  var React = require('react');
  var events = app.events || require('../../dispatchers/events');

  return React.createClass({
    render() {
      return (
        <h1>Pagination template</h1>
      );
    }
  });
}
