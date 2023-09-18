const db = require('knex')(require('../knexfile').development);

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
}

module.exports = Search;
