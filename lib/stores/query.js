/**
 * @file
 * A base query object.
 */

var events = require('../dispatchers/events');
var qs = require('qs');

// Ensure that fetch is available.
require('es6-promise').polyfill();
require('isomorphic-fetch');

module.exports = function(app) {
  'use strict';

  class query {

    /**
     * Build the query.
     *
     * @param string url
     *   The URL that the query will be submitted to.
     */
    constructor(url) {
      this._where = {};
      this.limit = null;
      this.url = url;
    }

    /**
     * Add a condition to the query.
     *
     * @param string key
     *   The field to add to the query.
     * @param string value
     *   The value for key.
     */
    where(key, value) {
      this._where[key] = value;
      return this;
    }

    /**
     * {@inhertidoc}
     */
    and(key, value) {
      return this._where(key, value);
    }

    /**
     * Add a not condition to the query.
     *
     * @param string key
     *   The field to add to the query.
     * @param string value
     *   The value for key.
     */
    not(key, value) {
      this._where[key] = {"$not": value};
      return this;
    }

    /**
     * Add an in condition to the query.
     *
     * @param string key
     *   The key to add to the query.
     */
    in(key /*, [params] */) {
      var terms = _.toArray(arguments).slice(1);
      this._where[key] = {"$in": terms};
      return this;
    }

    like(key, value) {
      this._where[key] = {"$like": value};
      return this;
    }

    /**
     * Add a limit to the query.
     */
    limit(int) {
      this.limit = int;
    }

    mock() {
      var objects = {data: [{title: 'test', content: 'here we are to save the day!'}, {title: 'test 2', content: 'I like turtles'}]};
      events.do('loading');
      setTimeout(function() {
        events.do('update', objects, null, null);
      }, 2000);
    }

    mockError() {
      var objects = {error: 'Malformed query syntax.'};
      events.do('update', objects, 1000, null);
    }

    execute() {

      // Trigger a loading event.
      events.do('loading');

      var url = this.url + '?where=' + JSON.stringify(this._where);
      if (this.limit) {
        url += '&limit=' + this.limit;
      }

      fetch(url)
        // Check the response for failure statues.
        .then(function(response) {
          return response.json();
        })
        .then(function(body) {
          this._where = {};
          if (body.error) {
            throw new Error(body.error_description);
          }
          events.do('update', {data: body});
          return true;
        }.bind(this))
        .catch(function(error) {
          events.do('update', null, error.message, error);
        })
    }
  }

  events = app.events || events;
  return query;
}
