import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import User from './Users.js';

class Question extends Model { }

Question.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Question',
    tableName: 'QUESTIONS',
    timestamps: false
});

User.hasMany(Question, { foreignKey: 'id_user' });
Question.belongsTo(User, { foreignKey: 'id_user' });

export default Question;
