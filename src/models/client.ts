import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/mysql';

export interface ClientInstance extends Model {
    id: number;
    father: string;
    mother: string;
    child: string;
    school: string;
    fone: string;
    value: number;
    debt: boolean;
}

export const Client = sequelize.define<ClientInstance> ('client', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    father: {
        type: DataTypes.STRING
    },
    mother: {
        type: DataTypes.STRING
    },
    child: {
        type: DataTypes.STRING
    },
    school: {
        type: DataTypes.STRING
    },
    fone: {
        type: DataTypes.STRING
    },
    value: {
        type: DataTypes.FLOAT
    },
    debt: {
        type: DataTypes.FLOAT,
        defaultValue: false
    }
},{
    tableName: 'client',
    timestamps: false
});