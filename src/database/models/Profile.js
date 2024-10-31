import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import User from './Users.js';

class Profile extends Model { }

Profile.init({
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    biography: DataTypes.TEXT,
    experience: DataTypes.TEXT
}, {
    sequelize,
    modelName: 'Profile',
    tableName: 'PROFILE',
    timestamps: false
});

User.hasOne(Profile, { foreignKey: 'id_user' });
Profile.belongsTo(User, { foreignKey: 'id_user' });

export default Profile;
