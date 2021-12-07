'use strict';
const faker = require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    var postJSON = [];
   for(var i = 0 ; i < 20 ; i++){
      postJSON.push({
        title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    author: faker.name.firstName(),
    createdAt : new Date()
    });
   }
   await queryInterface.bulkInsert('Posts',postJSON,{});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};