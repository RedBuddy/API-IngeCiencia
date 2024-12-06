import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import User from './Users.js';

class Profile extends Model { }

Profile.init({
    id_user: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
        primaryKey: true
    },
    university: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    faculty: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    department: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    orcid: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    biography: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    experience: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    google_scholar_link: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    research_gate_link: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Profile',
    tableName: 'PROFILE',
    timestamps: false
});

User.hasOne(Profile, { foreignKey: 'id_user' });
Profile.belongsTo(User, { foreignKey: 'id_user' });

export default Profile;
