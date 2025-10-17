'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('donations', {
            donation_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            donor_id: {
                type: DataTypes.INTEGER,
                allowNull: false,          
            },
            item_id: {
                type: DataTypes.INTEGER,
                allowNull: false   
            },
            date_received: {
                type: DataTypes.DATE,
                allowNull: false
            },
            branch_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable('donations');
    }
};