import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import Article from './Articles.js';
import User from './Users.js';

class ArticleCoauthor extends Model { }

ArticleCoauthor.init({
    id_article: {
        type: DataTypes.INTEGER,
        references: { model: Article, key: 'id' },
        primaryKey: true
    },
    id_coauthor: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'ArticleCoauthor',
    tableName: 'ARTICLE_COAUTHORS_MAP',
    timestamps: false
});

Article.belongsToMany(User, { through: ArticleCoauthor, foreignKey: 'id_article' });
User.belongsToMany(Article, { through: ArticleCoauthor, foreignKey: 'id_coauthor' });

export default ArticleCoauthor;
