import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import Role from './Roles.js';


class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    registration_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    profile_img: {
        type: DataTypes.BLOB('medium'), 
        allowNull: true
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        references: {
            model: Role,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'USERS',
    timestamps: false
});


// Relaciones
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

export default User;