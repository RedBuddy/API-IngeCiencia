import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import Article from './Articles.js';

class ArticleView extends Model { }

ArticleView.init({
    id_article: {
        type: DataTypes.INTEGER,
        references: { model: Article, key: 'id' },
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

// Relaciones
Article.hasMany(ArticleView, { foreignKey: 'id_article' });
ArticleView.belongsTo(Article, { foreignKey: 'id_article' });

export default ArticleView;
