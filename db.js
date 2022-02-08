require('dotenv').config()

const con = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}

// AWS db
// const con = {
//     host: 'database-1.cjgto2usdypj.us-east-2.rds.amazonaws.com',
//     user: 'admin',
//     password: 'yZxx86H#oHXGZ*',
//     database: 'Media_Shelf'
// }

module.exports = { con }