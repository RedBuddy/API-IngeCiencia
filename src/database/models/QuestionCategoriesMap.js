import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import Question from './Questions.js';
import Category from './Categories.js';

class QuestionCategoryMap extends Model { }

QuestionCategoryMap.init({
    id_question: {
        type: DataTypes.INTEGER,
        references: { model: Question, key: 'id' },
        primaryKey: true
    },
    id_category: {
        type: DataTypes.INTEGER,
        references: { model: Category, key: 'id' },
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'QuestionCategoryMap',
    tableName: 'QUESTION_CATEGORIES_MAP',
    timestamps: false
});

Question.belongsToMany(Category, { through: QuestionCategoryMap, foreignKey: 'id_question' });
Category.belongsToMany(Question, { through: QuestionCategoryMap, foreignKey: 'id_category' });

export default QuestionCategoryMap;
