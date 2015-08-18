/**
 * @jsx React.DOM
 *
 * @file
 * Enter the Browser!
 */

'use strict';

const React = require('react');
const app = {events: require('./dispatchers/events')};

const View = require('./components/view')(app);
const TestFactory = React.createFactory(View);

var rendered = React.render(
  TestFactory({
    title: 'Status updates',
    entityType: 'node',
    entityBundle: 'status',
    filter: true,
    limit: 5,
    pagination: true,
    fields: {title: null},
    url: 'http://local.drupal:80/morphd_test'
  }),
  document.getElementById('app')
);

window.app = app;
