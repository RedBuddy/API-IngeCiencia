import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import Article from './Articles.js';
import User from './Users.js';

class ArticleView extends Model { }

ArticleView.init({
    id_article: {
        type: DataTypes.INTEGER,
        references: { model: Article, key: 'id' },
        primaryKey: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
        primaryKey: true
    },
    view_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'ArticleView',
    tableName: 'ARTICLE_VIEWS',
    timestamps: false
});

Article.hasMany(ArticleView, { foreignKey: 'id_article' });
ArticleView.belongsTo(Article, { foreignKey: 'id_article' });
User.hasMany(ArticleView, { foreignKey: 'id_user' });
ArticleView.belongsTo(User, { foreignKey: 'id_user' });

export default ArticleView;
