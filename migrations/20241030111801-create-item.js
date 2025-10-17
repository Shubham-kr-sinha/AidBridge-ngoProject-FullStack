'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('items', {
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
        await queryInterface.dropTable('items');
    }
};