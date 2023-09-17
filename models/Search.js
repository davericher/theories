const knex = require('../knexfile').development;
const db = require('knex')(knex);

class Search {
  static theoriesByKeyword(keyword) {
    return db('theories')
      .where('name', 'ilike', `%${keyword}%`)
      .orWhere('description', 'ilike', `%${keyword}%`);
  }

  static evidencesByKeyword(keyword) {
    return db('evidence')
      .where('source', 'ilike', `%${keyword}%`)
      .orWhere('description', 'ilike', `%${keyword}%`);
  }

  static tagsByKeyword(keyword) {
    return db('tag').where('name', 'ilike', `%${keyword}%`);
  }

  // ... Add more search methods for other entities as needed
}

module.exports = Search;
