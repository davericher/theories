/* eslint-disable no-restricted-syntax,no-await-in-loop */
const {
  Theory,
  User,
  VersionHistory,
  TheoryTag,
  TheoryDiscipline,
  sequelize,
} = require('../models');

class TheoryService {
  static async getAllTheories() {
    return Theory.findAll();
  }

  static async getTheoryById(id) {
    return Theory.findByPk(id);
  }

  static async updateTheory(id, theoryData) {
    const theory = await Theory.findByPk(id);
    if (theory) {
      return theory.update(theoryData);
    }
    return null;
  }

  static async deleteTheory(id) {
    const theory = await Theory.findByPk(id);
    if (theory) {
      return theory.destroy();
    }
    return null;
  }

  // Relationship Functions
  static async getProposedByUser(theoryId) {
    const theory = await Theory.findByPk(theoryId, {
      include: [{ model: User, as: 'proposedByUser' }],
    });
    return theory ? theory.proposedByUser : null;
  }

  static async createTheory(data, userId) {
    let transaction;

    try {
      transaction = await sequelize.transaction();

      const newTheory = await Theory.create(
        {
          title: data.title,
          description: data.description,
          category: data.category,
          // ... other fields
        },
        { transaction },
      );

      await VersionHistory.create(
        {
          theoryId: newTheory.id,
          versionNumber: 1,
          dateOfChange: new Date(),
          changedBy: userId,
          changeDescription: 'Initial version',
        },
        { transaction },
      );

      if (data.tags) {
        for (const tag of data.tags) {
          await TheoryTag.create(
            {
              theoryId: newTheory.id,
              tagId: tag.id,
            },
            { transaction },
          );
        }
      }

      if (data.disciplines) {
        for (const discipline of data.disciplines) {
          await TheoryDiscipline.create(
            {
              theoryId: newTheory.id,
              disciplineId: discipline.id,
            },
            { transaction },
          );
        }
      }

      if (data.citations) {
        for (const citation of data.citations) {
          await Citation.create(
            {
              theoryId: newTheory.id,
              source: citation.source,
              link: citation.link,
              // ... other fields
            },
            { transaction },
          );
        }
      }

      await transaction.commit();
      return newTheory;
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error('Error creating theory:', error);
      throw new Error('Failed to create theory');
    }
  } // Version Functions

  static async createVersionForTheory(theoryId, versionData) {
    return VersionHistory.create({ ...versionData, theoryId });
  }

  static async getLatestVersionForTheory(theoryId) {
    return VersionHistory.findLatestVersion(theoryId);
  }

  static async getAllVersionsForTheory(theoryId) {
    return VersionHistory.findByTheoryId(theoryId);
  }

  // Convenience Functions
  static async getTheoryWithLatestVersion(theoryId) {
    const theory = await Theory.findByPk(theoryId);
    if (!theory) return null;

    const latestVersion = await this.getLatestVersionForTheory(theoryId);
    return {
      ...theory.toJSON(),
      latestVersion,
    };
  }

  // ... Add more functions as needed
}

module.exports = TheoryService;
