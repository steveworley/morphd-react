/**
 * @file
 * Event dispatcher for the application.
 */

'use strict';

var _ = require('underscore');

class events {
  constructor() {
    this._store = {};
  }

  /**
   * Create a UUID for the event.
   */
  uid(a) {
    return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, this.uid);
  }

  /**
   * Register a callable to a specified event.
   *
   * @param string event
   *   The event name to bind to.
   * @param function call
   *   The function to call.
   * @param int weight
   *   The weight in which to call this function.
   *
   * @return
   */
  on(event, call, weight) {
    var uid = this.uid();

    this._store[event] = this._store[event] || [];
    this._store[event].push({ _uid: uid, callee: call, weight: weight || 0 });

    return uid;
  }

  /**
   * Trigger a registered callable for an event.
   *
   * @param event
   *   The event name to trigger callbacks for.
   */
  do(event) {
    var args = [].slice.apply(arguments).splice(1);
    var events = this._store[event] || [];

    _.each(_.sortBy(events, 'weight'), function(bound) {
      bound.callee.apply(bound, args);
    });
  }

  stop(event, call) {
    var events = this._store[event] || [];
    _.each(_.sortBy(events, 'weight'), function(bound, index) {
      if (bound.callee == call) {
        console.log('found and removing');
        delete events[index];
      }
    });
    this._store[event] = events.filter(function(e) {return !!e;});
    return this;
  }
};

module.exports = new events();
