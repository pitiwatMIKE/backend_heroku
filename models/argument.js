const Sequelize = require("sequelize");
const sequelize = require("../db_instance");

const argument = sequelize.define(
    "argument",
    {      
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
    },
    {
      // options
    }
  );


(async () => {
  await argument.sync({ force: false });    
})();

  
module.exports = argument;