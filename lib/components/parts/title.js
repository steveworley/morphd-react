/**
 * @jsx React.DOM
 *
 * @file
 * Render the view title.
 */

var React = require('react');

module.exports = function(app) {
  'use strict';

  return React.createClass({
    render() {
      return (
        <h1 className='view-title'>{ this.props.data }</h1>
      )
    }
  });
}
