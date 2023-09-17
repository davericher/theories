const knex = require('knex')(require('../knexfile').development);
const Critics = require('../models/Critic');

class CriticsService {
  static async createCritics(data) {
    try {
      const criticsId = await Critics.query(knex).insert(data);
      return criticsId;
    } catch (error) {
      console.error('Error creating critics:', error);
      throw error;
    }
  }

  static async getCriticsById(id) {
    try {
      const critics = await Critics.query(knex).findById(id);
      return critics;
    } catch (error) {
      console.error('Error fetching critics:', error);
      throw error;
    }
  }

  static async updateCritics(id, data) {
    try {
      const updatedCritics = await Critics.query(knex).patchAndFetchById(
        id,
        data,
      );
      return updatedCritics;
    } catch (error) {
      console.error('Error updating critics:', error);
      throw error;
    }
  }

  static async deleteCritics(id) {
    try {
      const rowsDeleted = await Critics.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting critics:', error);
      throw error;
    }
  }
}

module.exports = CriticsService;
