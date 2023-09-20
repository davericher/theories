const { Op } = require('sequelize');
const Theory = require('./TheoryModel'); // Assuming you have a Theory Sequelize model
const Evidence = require('./EvidenceModel'); // Assuming you have an Evidence Sequelize model
const Tag = require('./TagModel'); // Assuming you have a Tag Sequelize model

class Search {
  static async theoriesByKeyword(keyword) {
    return Theory.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${keyword}%` } },
          { description: { [Op.iLike]: `%${keyword}%` } },
        ],
      },
    });
  }

  static async evidencesByKeyword(keyword) {
    return Evidence.findAll({
      where: {
        [Op.or]: [
          { source: { [Op.iLike]: `%${keyword}%` } },
          { description: { [Op.iLike]: `%${keyword}%` } },
        ],
      },
    });
  }

  static async tagsByKeyword(keyword) {
    return Tag.findAll({
      where: {
        name: { [Op.iLike]: `%${keyword}%` },
      },
    });
  }
}

module.exports = Search;
