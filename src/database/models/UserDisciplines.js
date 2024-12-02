import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';
import User from './Users.js';
import Category from './Categories.js';

class UserDiscipline extends Model { }

UserDiscipline.init({
    id_user: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' },
        primaryKey: true
    },
    id_category: {
        type: DataTypes.INTEGER,
        references: { model: Category, key: 'id' },
        primaryKey: true
    }
}, {
    sequelize,
    modelName: 'UserDiscipline',
    tableName: 'USER_DISCIPLINES',
    timestamps: false
});

User.hasMany(UserDiscipline, { foreignKey: 'id_user' });
UserDiscipline.belongsTo(User, { foreignKey: 'id_user' });
UserDiscipline.belongsTo(Category, { foreignKey: 'id_category' });

export default UserDiscipline;
