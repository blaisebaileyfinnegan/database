module.exports = Parser = function(transactions) {
  this.transactions = transactions;
}

var COMMAND_SET = 'SET';
var COMMAND_GET = 'GET';
var COMMAND_UNSET = 'UNSET';
var COMMAND_NUMEQUALTO = 'NUMEQUALTO';
var COMMAND_END = 'END';

var COMMAND_TRANSACTION_BEGIN = 'BEGIN';
var COMMAND_TRANSACTION_ROLLBACK = 'ROLLBACK';
var COMMAND_TRANSACTION_COMMIT = 'COMMIT';

Parser.prototype.parse = function(line) {
  var tokens = line.split(' ');
  var command = tokens[0];
  var arguments = tokens.slice(1);

  return [command, arguments];
}

/**
 * Delegate call out to proper function
 */
Parser.prototype.delegate = function(command, arguments) {
  // Since the database/transactional layer doesn't know of I/O,
  // we'll need to convert errors/integers into actual strings
  // to be printed.
  switch (command) {
    case COMMAND_SET:
      return this.transactions.set.apply(this.transactions, arguments);
    case COMMAND_GET:
      var output = this.transactions.get.apply(this.transactions, arguments);
      if (output == null) {
        return 'NULL';
      } else {
        return output;
      }
    case COMMAND_UNSET:
      return this.transactions.unset.apply(this.transactions, arguments);
    case COMMAND_NUMEQUALTO:
      var output = this.transactions.numEqualTo.apply(this.transactions, arguments);
      return String(output);
    case COMMAND_TRANSACTION_BEGIN:
      return this.transactions.begin();
    case COMMAND_TRANSACTION_ROLLBACK:
      try {
        return this.transactions.rollback();
      } catch(e) {
        return e.message;
      }
    case COMMAND_TRANSACTION_COMMIT:
      try {
        return this.transactions.commit();
      } catch(e) {
        return e.message;
      }
    case COMMAND_END:
      process.exit();
      break;
  }
}