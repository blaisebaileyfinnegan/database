Thumbtack Challenge #2
=======================

Written in JavaScript

## Directory structure
`/lib` - Parser, Transactional layer, and Database  
`/spec` - Unit Tests  
`app.js` - Runner  

## Dependencies
- Node.js >= 0.10
- jasmine-node (to run unit tests)

## Instructions
1. Clone me
2. Install dependencies with `npm install`
3. Run unit tests with `npm test`
4. Start the CLI with `node app`

## Information
The entire program can be separated into the CLI, transactional, and database layer.

The database itself is implemented using an hash table (JS object with null prototype) for
fast lookup. Value cardinality is maintained in the same style by using another hash table
with the values as keys (Space-time tradeoff).

The transactional layer sits on top of the database and lazily remembers previous values.
It does not copy the entire database as-is.

The CLI queries the transactional layer.

Unit tests are written BDD style and mostly copy the spec based off of
http://www.thumbtack.com/challenges/software-engineer.
