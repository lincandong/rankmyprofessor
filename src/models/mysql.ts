import { Sequelize } from "sequelize";

const connection = new Sequelize({
    database: 'sicool',
    username: 'sicool-access',
    password: '123',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

const authenticate = (async () => {
    console.log("Connecting to the database...")
    await connection.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.')
        }).catch(err => {
            console.error('Unable to connect to the database:', err)
        })
})
const sync = (async () => {
    console.log("Synchronizing models from database...");
    await connection.sync()
        .then(() => {
            console.log("Models has been synchronized successfully.")
        }).catch(err => {
            console.error('Unable to connect to synchronized models:', err)
        })
})

async function init() {
    await authenticate()
    //await sync()
}
init()

export {
    connection, init
}
