/**
 * @file
 */
'use strict';

var _ = require('underscore');

class events {
  constructor() {
    this._store = {};
  }

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
   * @param int order
   *   The order in which to call this function.
   *
   * @retur
n   */
  on(event, call, order) {
    const uid = this.uid();

    this._store[event] = this._store[event] || [];
    this._store[event].push({ _uid: uid, callee: call, weight: order || 0 });

    return uid;
  }

  do(event, using) {
    var events = this._store[event] || [];
    _.sortBy(events, 'weight');
    console.log(events);
    console.log(_.uniqueId());
  }
}

module.exports = new events();
