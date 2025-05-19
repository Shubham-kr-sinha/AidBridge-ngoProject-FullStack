'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Donation, Distribution }) {
            // define association here
            this.hasOne(Donation, { foreignKey: 'item_id' });
            this.hasOne(Distribution, { foreignKey: 'item_id' });
        }

        toJSON() {
            return {...this.get(), createdAt: undefined, updatedAt: undefined };
        }
    }
    Item.init({
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quality_status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        tableName: 'items',
        modelName: 'Item',
    });
    return Item;
};