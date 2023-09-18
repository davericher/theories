const knex = require('knex')(require('../knexfile').development);
const Critics = require('../models/Critic');

class CriticsService {
  static async createCritics(data) {
    try {
      return await Critics.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating critics:', error);
      throw error;
    }
  }

  static async getCriticsById(id) {
    try {
      return await Critics.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching critics:', error);
      throw error;
    }
  }

  static async updateCritics(id, data) {
    try {
      return await Critics.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating critics:', error);
      throw error;
    }
  }

  static async deleteCritics(id) {
    try {
      return await Critics.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting critics:', error);
      throw error;
    }
  }
}

module.exports = CriticsService;
