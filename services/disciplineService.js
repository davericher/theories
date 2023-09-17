const knex = require('knex')(require('../knexfile').development);
const Discipline = require('../models/Discipline');

class DisciplineService {
  static async createDiscipline(data) {
    try {
      const disciplineId = await Discipline.query(knex).insert(data);
      return disciplineId;
    } catch (error) {
      console.error('Error creating discipline:', error);
      throw error;
    }
  }

  static async getDisciplineById(id) {
    try {
      const discipline = await Discipline.query(knex).findById(id);
      return discipline;
    } catch (error) {
      console.error('Error fetching discipline:', error);
      throw error;
    }
  }

  static async updateDiscipline(id, data) {
    try {
      const updatedDiscipline = await Discipline.query(knex).patchAndFetchById(
        id,
        data,
      );
      return updatedDiscipline;
    } catch (error) {
      console.error('Error updating discipline:', error);
      throw error;
    }
  }

  static async deleteDiscipline(id) {
    try {
      const rowsDeleted = await Discipline.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting discipline:', error);
      throw error;
    }
  }
}

module.exports = DisciplineService;
