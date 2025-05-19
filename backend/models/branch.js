'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Branch extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Donation, Distribution }) {
            // define association here
            this.hasOne(Donation, { foreignKey: 'branch_id' });
            this.hasOne(Distribution, { foreignKey: 'branch_id' });
        }
        
        toJSON() {
            return {...this.get(), createdAt: undefined, updatedAt: undefined };
        }
    }
    Branch.init({
        branch_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        tableName: 'branches',
        modelName: 'Branch',
    });
    return Branch;
};