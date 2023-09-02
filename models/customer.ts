'use strict';
import {
  Model
} from 'sequelize';
interface customerAttributes {
  id: string;
  name: string;
  registrationDate: Date;
  pass: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class customer extends Model <customerAttributes> implements customerAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  id!: string;
  name!: string;
  registrationDate!: Date;
  pass!: string;
    static associate(models: any) {
      // define association here
      customer.belongsToMany(models.book,{
        through: 'rents'
      })
    }
  }
  customer.init(
    {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
   name: {
    type: DataTypes.STRING,
    allowNull: false
   },
   registrationDate: {
    type: DataTypes.DATE,
    allowNull: false
   },
   pass: {
    type: DataTypes.STRING,
    allowNull: false
   },
  }, 
    {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};