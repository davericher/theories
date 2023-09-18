const knex = require('knex')(require('../knexfile').development);
const Evidence = require('../models/Evidence');

class EvidenceService {
  static async createEvidence(data) {
    try {
      return await Evidence.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating evidence:', error);
      throw error;
    }
  }

  static async getEvidenceById(id) {
    try {
      return await Evidence.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching evidence:', error);
      throw error;
    }
  }

  static async updateEvidence(id, data) {
    try {
      return await Evidence.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating evidence:', error);
      throw error;
    }
  }

  static async deleteEvidence(id) {
    try {
      return await Evidence.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting evidence:', error);
      throw error;
    }
  }
}

module.exports = EvidenceService;
