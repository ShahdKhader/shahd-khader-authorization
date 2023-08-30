'use strict';
import {
  Model, DataTypes
} from 'sequelize';

interface bookAttributes {
  id: number;
  name: string;
  isbn: string;
  author: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class book extends Model<bookAttributes> implements bookAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  id!: number;
  name!: string;
  isbn!: string;
  author!: string;
    static associate(models: any) {
      // define association here
      book.belongsToMany(models.customer, {
        through: 'rents'
      })
    }
  }
  book.init(
    {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
   name: {
    type: DataTypes.STRING,
    allowNull: false
   },
   isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
   },
   author: {
    type: DataTypes.STRING,
    allowNull: false
   },
  },
    {
    sequelize,
    modelName: 'book',
  });
  return book;
};