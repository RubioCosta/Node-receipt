import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface UserInstance extends Model {
    id: number;
    name: string;
    password: string;
}

export const User = sequelize.define<UserInstance> ('user', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
},{
    tableName: 'user',
    timestamps: false
});