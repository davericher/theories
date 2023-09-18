exports.seed = (knex) => {
  return knex('comment')
    .del()
    .then(function () {
      return knex('comment').insert([
        { content: 'This theory is interesting!', userId: 1, theoryId: 1 },
        // ... add more comments as needed
      ]);
    });
};
