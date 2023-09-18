exports.seed = (knex) => {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        { username: 'alice', password: 'password123', role: 'admin' },
        { username: 'bob', password: 'password123', role: 'user' },
        // ... add more users as needed
      ]);
    });
};
