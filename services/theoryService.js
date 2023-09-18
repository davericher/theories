const knex = require('knex')(require('../knexfile').development);
const Theory = require('../models/Theory');

class TheoryService {
  static async createTheory(data) {
    try {
      return await Theory.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating theory:', error);
      throw error;
    }
  }

  static async getTheoryById(id) {
    try {
      return await Theory.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching theory:', error);
      throw error;
    }
  }

  static async updateTheory(id, data) {
    try {
      return await Theory.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating theory:', error);
      throw error;
    }
  }

  static async deleteTheory(id) {
    try {
      return await Theory.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting theory:', error);
      throw error;
    }
  }
}

module.exports = TheoryService;
