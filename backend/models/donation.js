'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Donation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Donor, Item, Branch }) {
            // define association here
            this.belongsTo(Donor, { foreignKey: 'donor_id' });
            this.belongsTo(Item, { foreignKey: 'item_id' });
            this.belongsTo(Branch, { foreignKey: 'branch_id' });
        }
        
        toJSON() {
            return {...this.get(), createdAt: undefined, updatedAt: undefined };
        }        
    }
    Donation.init({
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
        }
    }, {
        sequelize,
        tableName: 'donations',
        modelName: 'Donation',
    });
    return Donation;
};