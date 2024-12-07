import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import User from './Users.js';

class ResearchProject extends Model { }

ResearchProject.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_author: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    vacancies: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    preview_img: {
        type: DataTypes.BLOB('medium'),
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'ResearchProject',
    tableName: 'RESEARCH_PROJECTS',
    timestamps: false
});

// Relaciones
User.hasMany(ResearchProject, { foreignKey: 'id_author' });
ResearchProject.belongsTo(User, { foreignKey: 'id_author' });

export default ResearchProject;
