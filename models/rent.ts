'use strict';
import {
  Model
} from'sequelize';
interface rentAttributes {
  bookId	: number;
  customerId	: number;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class rent extends Model<rentAttributes> implements rentAttributes{
    bookId!: number;
    customerId!: number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models :any) {
      // define association here
    }
  }
  rent.init(
    {
      bookId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references:{
          model: 'book',
          key : 'id'
        }
      },
      customerId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references:{
          model: 'customer',
          key : 'id'
        }
      },
    }, {
    sequelize,
    modelName: 'rent',
  });
  return rent;
};