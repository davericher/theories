exports.seed = function (knex) {
  return knex('discipline')
    .del()
    .then(function () {
      return knex('discipline').insert([
        { name: 'Physics' },
        { name: 'Biology' },
        // ... add more disciplines as needed
      ]);
    });
};
