var React = require('react');
var express = require('express');
var app = express();

app.set('views', __dirname + '/lib/tpl');
app.set('view engine', 'twig');
app.use(express.static('web'));

/**
 * Ensure the node-jsx is available for the JSX components.
 */
require('node-jsx').install({harmony: true});

var TestItem = require('./lib/components/test');

app.get('/', function (req, res) {
  var TestFactory = React.createFactory(TestItem);
  var render = React.renderToString(TestFactory({done: false, name: 'Server'}));
  res.render('index', {
    app: render,
  });
});


// Start the server.
app.listen(3000);
