'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Donor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Donation }) {
            // define association here
            this.hasMany(Donation, { foreignKey: 'donor_id' });
        }

        toJSON() {
            return {...this.get(), pwd: undefined, createdAt: undefined, updatedAt: undefined };
        }
    }
    Donor.init({
        donor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pwd: {
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
        tableName: 'donors',
        modelName: 'Donor',
    });
    return Donor;
};