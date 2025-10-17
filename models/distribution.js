'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Distribution extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Item, Branch, Beneficiary }) {
            // define association here
            this.belongsTo(Item, { foreignKey: 'item_id' });
            this.belongsTo(Branch, { foreignKey: 'branch_id' });
            this.belongsTo(Beneficiary, { foreignKey: 'beneficiary_id' });
        }
        
        toJSON() {
            return {...this.get(), createdAt: undefined, updatedAt: undefined };
        }
    }
    Distribution.init({
        item_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        branch_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        beneficiary_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        tableName: 'distributions',
        modelName: 'Distribution',
    });
    return Distribution;
};