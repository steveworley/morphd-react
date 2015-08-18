/**
 * @jsx React.DOM
 *
 * @file
 * Block component.
 */

'use strict';

const React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <div className="sample">
        <h1>{ this.props.name }</h1>
      </div>
    );
  }
})
