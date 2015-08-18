/**
 * @jsx React.DOM
 *
 * @file
 * Default implementation of the filter component.
 */
'use strict';

var React = require('react');
var _ = require('underscore');

module.exports = function(app) {
  var events = app.events || require('../../dispatchers/events');

  return React.createClass({

    getInitialState() {
      return {
        fields: this.props.fields,
      }
    },

    submit() {
      this.props.query.execute();
    },

    fields() {
      var fields = [];
      _.each(this.state.fields, function(value, field) {
        fields.push(
          <div key={field} className="views-filter-field">
            <label htmlFor={field}>{field}</label>
            <input
              ref={field}
              onChange={this.handleUpdate}
              type="text"
              value={value}
              name={field}
            />
          </div>
        );
      }.bind(this));
      return fields;
    },

    handleUpdate(event) {
      var fields = this.state.fields;
      fields[event.target.name] = event.target.value;
      this.setState({fields: fields});
    },

    handleSubmit() {
      _.each(this.state.fields, function(value, field) {
        if (value) {
          this.props.query.like(field, value);
        }
      }.bind(this));
      this.props.query.execute();
    },

    render() {
      var fields = this.fields();
      var throbber = this.state.loading ? 'loading....' : null;
      return (
        <div className="view-exposed-form">
          { fields }
          <button onClick={this.handleSubmit}>Filter</button>
          { throbber }
        </div>
      );
    }

  });

  return Filter;
}
