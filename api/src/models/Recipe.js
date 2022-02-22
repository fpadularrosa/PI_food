const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.STRING
    },
    healthScore: {
      type: DataTypes.STRING
    },
    steps:{
      type: DataTypes.TEXT
    },
    image:{
      type: DataTypes.STRING
    }
  },{
    timestamps: false
  })
};

