import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import User from './Users.js';

class VerifyToken extends Model { }

VerifyToken.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isValid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: 'VerifyToken',
    tableName: 'VERIFY_TOKENS',
    timestamps: false
});

// Relaciones
VerifyToken.belongsTo(User, { foreignKey: 'id_user' });
User.hasMany(VerifyToken, { foreignKey: 'id_user' });

export default VerifyToken;