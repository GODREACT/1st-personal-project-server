// Htmlreview.js 제목,내용,작성자,작성날짜,이미지,조회수
const Sequelize = require('sequelize');

class Htmlreview extends Sequelize.Model{
  static initiate(sequelize) {
    Htmlreview.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"), 
      },
    },
      
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Htmlreview',
      tableName: 'HtmlreviewTable',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
};

module.exports = Htmlreview;