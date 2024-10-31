import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';

class ResearchProject extends Model { }

ResearchProject.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    details: {
        type: DataTypes.TEXT
    },
    vacancies: {
        type: DataTypes.INTEGER
    },
    preview_path: {
        type: DataTypes.STRING(255)
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
}, {
    sequelize,
    modelName: 'ResearchProject',
    tableName: 'RESEARCH_PROJECTS',
    timestamps: false
});

export default ResearchProject;
