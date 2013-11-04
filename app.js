// stdin
var readline = require('readline');

var Database = require('./lib/database');
var Transactions = require('./lib/transactions');
var Parser = require('./lib/parser');

var database = new Database();
var transactions = new Transactions(database);
var parser = new Parser(transactions);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function(line) {
  var task = parser.parse(line);
  var output = parser.delegate.apply(parser, task);
  if (typeof(output) == 'string') {
    console.log(output);
  }
});
