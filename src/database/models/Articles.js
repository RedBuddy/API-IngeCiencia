import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import User from './Users.js';

class Article extends Model { }

Article.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_author: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' }
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    doi: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    abstract: DataTypes.TEXT,
    publication_date: DataTypes.DATE,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    link: DataTypes.STRING(255),
    pdf: {
        type: DataTypes.BLOB('long'), 
        allowNull: true
    },
    preview_img: {
        type: DataTypes.BLOB('medium'), 
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('published', 'archived'),
        defaultValue: 'published'
    }
}, {
    sequelize,
    modelName: 'Article',
    tableName: 'ARTICLES',
    timestamps: false
});

User.hasMany(Article, { foreignKey: 'id_author' });
Article.belongsTo(User, { foreignKey: 'id_author' });

export default Article;
