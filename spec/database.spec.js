var Database = require('./../lib/database');

describe('In-memory database', function() {
  var database = new Database();

  describe('Simple commands', function() {
    describe('set', function() {
      it('should be able to set values', function() {
        database.set('mig!', 'wow!');
        expect(database.dictionary['mig!']).toEqual('wow!');

        database.set('421421', 'qwerty');
        expect(database.dictionary['421421']).toEqual('qwerty');

        database.set('hasOwnProperty', 'Nah');
        expect(database.dictionary['hasOwnProperty']).toEqual('Nah');

        database.set('don"t', 'worry');
        expect(database.dictionary['don"t']).toEqual('worry');
      });
    });

    describe('get', function() {
      it('if I get at an unset value, it should return null', function() {
        var out = database.get('Idontexist');
        expect(out).toBeNull();
      });

      it('should be able to get values I previously set', function() {
        expect(database.get('mig!')).toEqual('wow!');
        expect(database.get('421421')).toEqual('qwerty');
        expect(database.get('hasOwnProperty')).toEqual('Nah');
        expect(database.get('don"t')).toEqual('worry');
      });
    });

    describe('unset', function() {
      it('should unset values, even if already unset', function() {
        database.unset('mig!');
        database.unset('421421');
        database.unset('hasOwnProperty');
        database.unset('don"t');

        expect(database.get('mig!')).toBeNull();
        expect(database.get('421421')).toBeNull();
        expect(database.get('hasOwnProperty')).toBeNull();
        expect(database.get('don"t')).toBeNull();

        database.set('mig!', 'again');
        expect(database.get('mig!')).toEqual('again');
      });
    });

    describe('numEqualTo', function() {
      // Set it up again
      database = new Database();

      it('should be able to count how many times a value occurred', function() {
        database.set('1', 'bagel');
        database.set('2', 'bagel');
        database.set('3', 'bagel');
        expect(database.numEqualTo('bagel')).toBe(3);

        database.set('4', 'pie');
        expect(database.numEqualTo('pie')).toBe(1);

        expect(database.numEqualTo('whoAmI')).toBe(0);

        database.unset('4');
        expect(database.numEqualTo('pie')).toBe(0);

        database.unset('3');
        expect(database.numEqualTo('bagel')).toBe(2);
      });
    });
  });
});