import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import Article from './Articles.js';
import Category from './Categories.js';

class ArticleCategory extends Model { }

ArticleCategory.init({
    id_article: {
        type: DataTypes.INTEGER,
        references: { model: Article, key: 'id' },
        primaryKey: true
    },
    id_category: {
        type: DataTypes.INTEGER,
        references: { model: Category, key: 'id' },
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'ArticleCategory',
    tableName: 'ARTICLE_CATEGORIES_MAP',
    timestamps: false
});

Article.belongsToMany(Category, { through: ArticleCategory, foreignKey: 'id_article' });
Category.belongsToMany(Article, { through: ArticleCategory, foreignKey: 'id_category' });

export default ArticleCategory;
