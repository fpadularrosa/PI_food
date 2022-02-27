const { DataTypes } = require('sequelize');


module.exports = sequelize => {
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {len: [5, 30]}
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
    },
    dish:{
      type: DataTypes.STRING
    },
  },{
    timestamps: false
  })
};

