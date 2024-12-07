import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import ResearchProject from './ResearchProjects.js';
import Category from './Categories.js';

class ProjectCategoryMap extends Model { }

ProjectCategoryMap.init({
    id_project: {
        type: DataTypes.INTEGER,
        references: {
            model: ResearchProject,
            key: 'id'
        },
        primaryKey: true
    },
    id_category: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id'
        },
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'ProjectCategoryMap',
    tableName: 'PROJECT_CATEGORIES_MAP',
    timestamps: false
});

// Relaciones
ProjectCategoryMap.belongsTo(ResearchProject, { foreignKey: 'id_project' });
ProjectCategoryMap.belongsTo(Category, { foreignKey: 'id_category' });
ResearchProject.hasMany(ProjectCategoryMap, { foreignKey: 'id_project' });
Category.hasMany(ProjectCategoryMap, { foreignKey: 'id_category' });

export default ProjectCategoryMap;