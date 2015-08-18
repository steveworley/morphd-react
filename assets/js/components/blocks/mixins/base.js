/**
 * @file
 * Description.
 */
 'use strict';

var events = require('../dispatchers/events');

module.exports = {
  getInitialState() {
    return {
      bid: null,
      title: null,
      content: null
    }
  }
}
