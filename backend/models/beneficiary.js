'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Beneficiary extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Distribution }) {
            // define association here
            this.hasOne(Distribution, { foreignKey: 'beneficiary_id' });
        }
        
        toJSON() {
            return {...this.get(), createdAt: undefined, updatedAt: undefined };
        }
    }
    Beneficiary.init({
        beneficiary_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING
        },
        phone_num: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'beneficiaries',
        modelName: 'Beneficiary',
    });
    return Beneficiary;
};