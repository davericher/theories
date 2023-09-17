const knex = require('knex')(require('../knexfile').development);
const Evidence = require('../models/Evidence');

class EvidenceService {
  static async createEvidence(data) {
    try {
      const evidenceId = await Evidence.query(knex).insert(data);
      return evidenceId;
    } catch (error) {
      console.error('Error creating evidence:', error);
      throw error;
    }
  }

  static async getEvidenceById(id) {
    try {
      const evidence = await Evidence.query(knex).findById(id);
      return evidence;
    } catch (error) {
      console.error('Error fetching evidence:', error);
      throw error;
    }
  }

  static async updateEvidence(id, data) {
    try {
      const updatedEvidence = await Evidence.query(knex).patchAndFetchById(
        id,
        data,
      );
      return updatedEvidence;
    } catch (error) {
      console.error('Error updating evidence:', error);
      throw error;
    }
  }

  static async deleteEvidence(id) {
    try {
      const rowsDeleted = await Evidence.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting evidence:', error);
      throw error;
    }
  }
}

module.exports = EvidenceService;
