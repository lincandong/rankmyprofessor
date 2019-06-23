import sequelize = require("sequelize");
import { connection } from "./mysql";
import { Model } from "sequelize";


class University extends Model {
    public name!: string
    public province!: string
    // public info!: string
    // public readonly createdAt!: Date
    // public readonly updatedAt!: Date

}
University.init({
    name: {
        type: new sequelize.DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true
    },
    province: {
        type: new sequelize.DataTypes.STRING(6),
        allowNull: false,
        primaryKey: true
    },
    // info: {
    //     type: new sequelize.DataTypes.STRING(140),
    // }
}, {
        sequelize: connection,
        tableName: 'university',
        timestamps: false
    })


export {
    University
}