const db = require('knex')(require('../knexfile').development);

class Analytics {
  static mostActiveUsers(limit = 10) {
    return db('userActivityLog')
      .select('userId')
      .count('userId as activityCount')
      .groupBy('userId')
      .orderBy('activityCount', 'desc')
      .limit(limit);
  }

  static mostDiscussedTheories(limit = 10) {
    return db('critique')
      .select('againstTheory')
      .count('againstTheory as critiqueCount')
      .groupBy('againstTheory')
      .orderBy('critiqueCount', 'desc')
      .limit(limit);
  }

  static mostUsedTags(limit = 10) {
    return db('theoryTag')
      .select('tagId')
      .count('tagId as tagCount')
      .groupBy('tagId')
      .orderBy('tagCount', 'desc')
      .limit(limit);
  }

  // ... Add more analytics methods as needed
}

module.exports = Analytics;
