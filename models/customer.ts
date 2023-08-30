'use strict';
import {
  Model
} from 'sequelize';
interface customerAttributes {
  id: number;
  name: string;
  registrationDate: Date;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class customer extends Model <customerAttributes> implements customerAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  id!: number;
  name!: string;
  registrationDate!: Date;
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
      type: DataTypes.INTEGER,
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
  }, 
    {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};