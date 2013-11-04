/**
 * Transactional layer
 *
 * Simple implementation: Remember old values whenever a layer is set, and
 * store it inside the topmost layer
 */

module.exports = Transactions = function(database) {
  this.database = database;

  this.layers = [];
}

Transactions.prototype.begin = function() {
  // We don't need to worry about setting value counts to the previous layer--
  // If we use the proper DB functions, it will do the hard work for us
  this.layers.push(Object.create(null));
}

Transactions.prototype.rollback = function() {
  if (this.layers.length == 0) {
    throw new Error('NO TRANSACTION');
  }

  var layer = this.layers.pop();

  for (var key in layer) {
    this.database.set(key, layer[key]);
  }
}

Transactions.prototype.commit = function() {
  if (this.layers.length == 0) {
    throw new Error('NO TRANSACTION');
  }

  // Get rid of all layers.
  this.layers = [];
}

Transactions.prototype.remember = function(name) {
  var length = this.layers.length;
  if (length != 0) {
    // Save old value
    var topLayer = this.layers[length - 1];
    var oldValue = this.database.get(name);
    topLayer[name] = oldValue;
  }
}

Transactions.prototype.set = function(name, value) {
  this.remember(name);
  return this.database.set(name, value);
}

Transactions.prototype.unset = function(name) {
  this.remember(name);
  return this.database.unset(name);
}

Transactions.prototype.get = function(name) {
  return this.database.get(name);
}

Transactions.prototype.numEqualTo = function(value) {
  return this.database.numEqualTo(value);
}
