const sequelize = require('sequelize');
const { UserActivityLog, Critique, TheoryTag } = require('../models');

class AnalyticsService {
  static async mostActiveUsers(limit = 10) {
    return UserActivityLog.findAll({
      attributes: [
        'userId',
        [sequelize.fn('COUNT', sequelize.col('userId')), 'activityCount'],
      ],
      group: ['userId'],
      order: [[sequelize.literal('activityCount'), 'DESC']],
      limit,
    });
  }

  static async mostDiscussedTheories(limit = 10) {
    return Critique.findAll({
      attributes: [
        'againstTheory',
        [
          sequelize.fn('COUNT', sequelize.col('againstTheory')),
          'critiqueCount',
        ],
      ],
      group: ['againstTheory'],
      order: [[sequelize.literal('critiqueCount'), 'DESC']],
      limit,
    });
  }

  static async mostUsedTags(limit = 10) {
    return TheoryTag.findAll({
      attributes: [
        'tagId',
        [sequelize.fn('COUNT', sequelize.col('tagId')), 'tagCount'],
      ],
      group: ['tagId'],
      order: [[sequelize.literal('tagCount'), 'DESC']],
      limit,
    });
  }

  // ... Add more analytics methods as needed
}

module.exports = AnalyticsService;
