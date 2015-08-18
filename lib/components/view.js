/**
 * @jsx React.DOM
 *
 * @file
 * Entity list interface.
 */

'use strict';

var React = require('react');
var _ = require('underscore');

var View = function(app) {
  var events = app.events || require('../dispatchers/events');
  var query = require('../stores/query')(app);

  return React.createClass({
    displayName: 'view',

    uid: null,

    defaults: {
      row: require('./parts/row'),
      filter: require('./parts/filter'),
      pagination: require('./parts/pagination'),
      error: require('./parts/error'),
    },

    /**
     * Set the initial state of the view.
     */
    getInitialState() {
      // Handle updating the view.
      return {
        name: null,
        data: [],
        query: this.props.query || new query(this.props.url),
        error: null
      };
    },

    componentDidMount() {
      events.on('update', this.build);
    },

    componentWillUnmount() {
      events.stop('update', this.build);
    },

    build(data, error) {
      if (error) {
        this.setState({error: error});
        return;
      }

      // Update the data object.
      this.setState( {data: data.data} );
    },

    part(type) {
      var part = this.defaults[type];

      if (typeof part != 'function') {
        return false;
      }

      return React.createFactory(part(app));
    },

    render() {
      var row = this.part('row'),
          filter, pagination, error, title,
          rows = [];

      if (this.props.title) {
        title = this.part('title');
        title = (<title data={this.props.title} />);
      }

      if (this.props.filter) {
        filter = this.part('filter');
        filter = (<filter query={this.state.query} fields={this.props.fields} />);
      }

      if (this.props.pagination) {
        pagination = this.part('pagination');
        pagination = (<pagination />);
      }

      if (this.state.error) {
        error = this.part('error');
        error = (<error data={this.state.error} />);
      }

      _.each(this.state.data, function(data, i) {
        rows.push(<row key={i} data={data} />);
      });


      return (
        <div>
          { error }
          { title }
          { filter }
          { rows }
        </div>
      );
    }
  });
}



module.exports = View;
