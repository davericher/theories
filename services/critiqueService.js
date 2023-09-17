const knex = require('knex')(require('../knexfile').development);
const Critique = require('../models/Critique');

class CritiqueService {
  static async createCritique(data) {
    try {
      const critiqueId = await Critique.query(knex).insert(data);
      return critiqueId;
    } catch (error) {
      console.error('Error creating critique:', error);
      throw error;
    }
  }

  static async getCritiqueById(id) {
    try {
      const critique = await Critique.query(knex).findById(id);
      return critique;
    } catch (error) {
      console.error('Error fetching critique:', error);
      throw error;
    }
  }

  static async updateCritique(id, data) {
    try {
      const updatedCritique = await Critique.query(knex).patchAndFetchById(
        id,
        data,
      );
      return updatedCritique;
    } catch (error) {
      console.error('Error updating critique:', error);
      throw error;
    }
  }

  static async deleteCritique(id) {
    try {
      const rowsDeleted = await Critique.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting critique:', error);
      throw error;
    }
  }
}

module.exports = CritiqueService;
