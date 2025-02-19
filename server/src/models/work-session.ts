import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection.js';
import { User } from './user.js';

export class workSession extends Model {
    public id!: number;
    public employee_id!: number;
    public clock_in!: Date;
    public clock_out!: Date | null;
}

workSession.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: User, key: 'id' }
        },
        clock_in: { type: DataTypes.DATE, allowNull: false },
        clock_out: { type: DataTypes.DATE, allowNull: true }
    },
    { sequelize, modelName: 'workSession' }
);