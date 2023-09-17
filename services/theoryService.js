const knex = require('knex')(require('../knexfile').development);
const Theory = require('../models/Theory');

class TheoryService {
  static async createTheory(data) {
    try {
      const theoryId = await Theory.query(knex).insert(data);
      return theoryId;
    } catch (error) {
      console.error('Error creating theory:', error);
      throw error;
    }
  }

  static async getTheoryById(id) {
    try {
      const theory = await Theory.query(knex).findById(id);
      return theory;
    } catch (error) {
      console.error('Error fetching theory:', error);
      throw error;
    }
  }

  static async updateTheory(id, data) {
    try {
      const updatedTheory = await Theory.query(knex).patchAndFetchById(
        id,
        data,
      );
      return updatedTheory;
    } catch (error) {
      console.error('Error updating theory:', error);
      throw error;
    }
  }

  static async deleteTheory(id) {
    try {
      const rowsDeleted = await Theory.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting theory:', error);
      throw error;
    }
  }
}

module.exports = TheoryService;
