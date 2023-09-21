const sequelize = require('sequelize');
const { Theories, Evidence, Tag } = require('../models');

class SearchService {
  static async theoriesByKeyword(keyword) {
    return Theories.findAll({
      where: {
        [sequelize.Op.or]: [
          { name: { [sequelize.Op.iLike]: `%${keyword}%` } },
          { description: { [sequelize.Op.iLike]: `%${keyword}%` } },
        ],
      },
    });
  }

  static async evidencesByKeyword(keyword) {
    return Evidence.findAll({
      where: {
        [sequelize.Op.or]: [
          { source: { [sequelize.Op.iLike]: `%${keyword}%` } },
          { description: { [sequelize.Op.iLike]: `%${keyword}%` } },
        ],
      },
    });
  }

  static async tagsByKeyword(keyword) {
    return Tag.findAll({
      where: {
        name: { [sequelize.Op.iLike]: `%${keyword}%` },
      },
    });
  }
}

module.exports = SearchService;
