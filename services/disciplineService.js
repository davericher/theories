const knex = require('knex')(require('../knexfile').development);
const Discipline = require('../models/Discipline');

class DisciplineService {
  static async createDiscipline(data) {
    try {
      return await Discipline.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating discipline:', error);
      throw error;
    }
  }

  static async getDisciplineById(id) {
    try {
      return await Discipline.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching discipline:', error);
      throw error;
    }
  }

  static async updateDiscipline(id, data) {
    try {
      return await Discipline.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating discipline:', error);
      throw error;
    }
  }

  static async deleteDiscipline(id) {
    try {
      return await Discipline.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting discipline:', error);
      throw error;
    }
  }
}

module.exports = DisciplineService;
