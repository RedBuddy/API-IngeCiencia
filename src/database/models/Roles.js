import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';

class Role extends Model { }

Role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'ROLES',
    timestamps: false
});

export default Role;
