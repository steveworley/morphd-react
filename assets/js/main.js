/**
 * @jsx React.DOM
 *
 * @file
 * Enter the Browser!
 */
'use strict';

const React = window.React = require('react');
const Block = require('./components/blocks/default');
var events = require('./dispatchers/events');

window.a = events;

var BlockFactory = React.createFactory(Block);

var rendered = React.render(
  BlockFactory({done: false, name: 'This is my name'}),
  document.getElementById('app')
);
