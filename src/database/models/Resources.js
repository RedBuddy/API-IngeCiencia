import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import User from './Users.js';

class Resource extends Model { }

Resource.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_author: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' }
    },
    resource_category: {
        type: DataTypes.ENUM('guias', 'talleres', 'convocatorias'),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    link: {
        type: DataTypes.STRING(255)
    },
    pdf: {
        type: DataTypes.BLOB('long'), 
        allowNull: true
    },
    publication_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Resource',
    tableName: 'RESOURCES',
    timestamps: false
});

User.hasMany(Resource, { foreignKey: 'id_author' });
Resource.belongsTo(User, { foreignKey: 'id_author' });

export default Resource;
