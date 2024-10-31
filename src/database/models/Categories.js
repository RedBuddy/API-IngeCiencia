import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';

class Category extends Model { }

Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Category',
    tableName: 'CATEGORIES',
    timestamps: false
});

export default Category;
