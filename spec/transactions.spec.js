var Database = require('./../lib/database');
var Transactions = require('./../lib/transactions');

describe('Transactional layer', function() {
  var database;
  var transactions;

  beforeEach(function() {
    database = new Database();
    transactions = new Transactions(database);
  })

  it('should support simple rollbacks', function() {
    transactions.begin();
    transactions.set('a', '10');
    expect(transactions.get('a')).toEqual('10');
    transactions.begin();
    transactions.set('a', '20');
    expect(transactions.get('a')).toEqual('20');
    transactions.rollback();
    expect(transactions.get('a')).toEqual('10');
    transactions.rollback();
    expect(transactions.get('a')).toBeNull();
  });

  it('should support committing transactions', function() {
    transactions.begin();
    transactions.set('a', '30');
    transactions.begin();
    transactions.set('a', '40');
    transactions.commit();
    expect(transactions.get('a')).toEqual('40');
    expect(transactions.rollback).toThrow();
  });

  it('should be support using unset', function() {
    transactions.set('a', '50');
    transactions.begin();
    expect(transactions.get('a')).toEqual('50');
    transactions.set('a', '60');
    transactions.begin();
    transactions.unset('a');
    expect(transactions.get('a')).toBeNull();
    transactions.rollback();
    expect(transactions.get('a')).toEqual('60');
    transactions.commit();
    expect(transactions.get('a')).toEqual('60');
  });

  it('should work with numequalto', function() {
    transactions.set('a', '10');
    transactions.begin();
    expect(transactions.numEqualTo('10')).toBe(1);
    transactions.begin();
    transactions.unset('a');
    expect(transactions.numEqualTo('10')).toBe(0);
    transactions.rollback();
    expect(transactions.numEqualTo('10')).toBe(1);
  });
});