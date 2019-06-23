import sequelize = require("sequelize");
import { connection } from "./mysql";
import { Model } from "sequelize";
class Professor extends Model {
    public id!: number
    public name!: string
    public university!: string
    public college!: string
    public score!: number
    public studentNums!: number
    public callRate!: number
    // public readonly createdAt!: Date
    // public readonly updatedAt!: Date

}
Professor.init({
    id: {
        type: new sequelize.DataTypes.INTEGER, // you can omit the `new` but this is discouraged
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },
    name: {
        type: new sequelize.DataTypes.STRING(10),
        allowNull: false
    },
    university: {
        type: new sequelize.DataTypes.STRING(20),
        allowNull: false
        // references: {
        //     // This is a reference to another model
        //     model: University,
        //     // This is the column name of the referenced model
        //     key: 'name',
        //     // This declares when to check the foreign key constraint. PostgreSQL only.
        //     deferrable: sequelize.Deferrable.INITIALLY_IMMEDIATE
        // }
    },
    college: {
        type: new sequelize.DataTypes.STRING(20),
        allowNull: false
    },
    score: {
        type: new sequelize.DataTypes.FLOAT,
        defaultValue: 0.0
    },
    studentNums: {
        type: new sequelize.DataTypes.INTEGER,
        defaultValue: 0
    },
    callRate:{
        type:new sequelize.DataTypes.FLOAT,
        defaultValue:0.0,
        allowNull:true
    }
}, {
        sequelize: connection,
        tableName: 'professor',
        timestamps: false
    })
// Professor.hasMany(Comments, {
//     foreignKey: 'profId',
//     constraints: false
// })
// Comments.belongsTo(Professor,
//     {
//         foreignKey: 'profId',
//         constraints: false
//     }
// )

export {
    Professor
}