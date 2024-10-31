import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import Question from './Questions.js';
import User from './Users.js';

class Answer extends Model { }

Answer.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_question: {
        type: DataTypes.INTEGER,
        references: { model: Question, key: 'id' }
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' }
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
    modelName: 'Answer',
    tableName: 'ANSWERS',
    timestamps: false
});

Question.hasMany(Answer, { foreignKey: 'id_question' });
Answer.belongsTo(Question, { foreignKey: 'id_question' });
User.hasMany(Answer, { foreignKey: 'id_user' });
Answer.belongsTo(User, { foreignKey: 'id_user' });

export default Answer;
