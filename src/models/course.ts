import sequelize = require("sequelize");
import { connection } from "./mysql";
import { Model } from "sequelize";

class Course extends Model {
    public university!: string
    public courseCode!: string
    public courseName!: string
    // public readonly createdAt!: Date
    // public readonly updatedAt!: Date

}
Course.init({
    university: {
        type: new sequelize.DataTypes.STRING(20), // you can omit the `new` but this is discouraged
        primaryKey: true,
        allowNull: false
    },
    courseCode: {
        type: new sequelize.DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    courseName: {
        type: new sequelize.DataTypes.STRING(20),
        allowNull: false
    }
}, {
        sequelize: connection,
        tableName: 'professor',
        timestamps: false
    })

export {
    Course
}