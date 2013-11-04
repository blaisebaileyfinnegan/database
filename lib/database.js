module.exports = Database = function () {
  // Use null prototype so we don't inherit any keys from
  // the default object
  this.dictionary = Object.create(null);

  // For an efficient numequalto
  this.reverseDictionary = Object.create(null);
}

Database.prototype.set = function(name, value) {
  this.dictionary[name] = value;

  if (this.reverseDictionary[value] == undefined) {
    this.reverseDictionary[value] = 0;
  }

  this.reverseDictionary[value]++;
}

Database.prototype.get = function(name) {
  if (!(name in this.dictionary) || (this.dictionary[name] == undefined)) {
    return null;
  }

  return this.dictionary[name];
}

Database.prototype.unset = function(name) {
  var value = this.dictionary[name];
  this.reverseDictionary[value]--;

  this.dictionary[name] = undefined;
}

Database.prototype.numEqualTo = function(value) {
  if (this.reverseDictionary[value] == undefined) {
    return 0;
  }

  return this.reverseDictionary[value];
}