// html.js 제목,내용,작성자,작성날짜
const Sequelize = require('sequelize');

class Html extends Sequelize.Model{
  static initiate(sequelize) {
    Html.init({
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
      img_url: {
        type: Sequelize.STRING,
        allowNull: true 
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Html',
      tableName: 'HtmlTable',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
};

module.exports = Html;