'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Employee extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
        
        toJSON() {
            return {...this.get(), createdAt: undefined, updatedAt: undefined };
        }        
    }
    Employee.init({
        employee_id: {
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
        tableName: 'employees',
        modelName: 'Employee',
    });
    return Employee;
};