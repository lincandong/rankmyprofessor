import sequelize = require("sequelize");
import { connection } from "./mysql";
import { Model } from "sequelize";
import { Professor } from "./professor";

class Gpa extends Model {
    public profId!: number
    public courseCode!: string
    public studentNums!: number
    public grade!: number
    // public readonly createdAt!: Date
    // public readonly updatedAt!: Date

}
Gpa.init({
    profId: {
        type: new sequelize.DataTypes.INTEGER, // you can omit the `new` but this is discouraged
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: new sequelize.DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    studentNums: {
        type: new sequelize.DataTypes.INTEGER,
        defaultValue: 0
    },
    grade: {
        type: new sequelize.DataTypes.FLOAT,
        defaultValue: 0
    }
}, {
        sequelize: connection,
        tableName: 'professor',
        timestamps: false
    })


export {
    Gpa
}