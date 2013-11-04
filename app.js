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

// Wait forever for commands.
rl.on('line', function(line) {
  // All uppercase must be used;
  var task = parser.parse(line);
  var output = parser.delegate.apply(parser, task);

  // If the command does not exist, a non-string will be returned.
  // We don't print anything in that case.
  if (typeof(output) == 'string') {
    console.log(output);
  }
});
