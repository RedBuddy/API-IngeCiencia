import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import Resource from './Resources.js';
import User from './Users.js';

class ResourceCoAuthorsMap extends Model { }

ResourceCoAuthorsMap.init({
    id_resource: {
        type: DataTypes.INTEGER,
        references: { model: Resource, key: 'id' },
        primaryKey: true
    },
    id_coauthor: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'ResourceCoAuthorsMap',
    tableName: 'RESOURCE_COAUTHORS_MAP',
    timestamps: false
});

Resource.belongsToMany(User, { through: ResourceCoAuthorsMap, foreignKey: 'id_resource' });
User.belongsToMany(Resource, { through: ResourceCoAuthorsMap, foreignKey: 'id_coauthor' });

export default ResourceCoAuthorsMap;
