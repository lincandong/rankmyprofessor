import sequelize = require("sequelize");
import { connection } from "./mysql";
import { Model } from "sequelize";


class Comments extends Model {
    public profId!: number
    public content!: string
    public score!: number
    public date!: Date
    public callOrNot!: boolean
    // public readonly createdAt!: Date
    // public readonly updatedAt!: Date

}
Comments.init({
    profId: {
        type: new sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    content: {
        type: new sequelize.DataTypes.STRING(140),
        allowNull: true
    },
    date: {
        type: new sequelize.DataTypes.DATE,
        allowNull: true
    },
    score: {
        type: new sequelize.DataTypes.FLOAT,
        allowNull: false
    },
    callOrNot: {
        type: sequelize.DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
        sequelize: connection,
        tableName: 'comments',
        timestamps: false
    })


export {
    Comments
}
