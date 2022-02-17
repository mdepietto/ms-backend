require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 6500

const bodyParser = require('body-parser')

const mysql = require('mysql')
const { con } = require('./db')
const db = mysql.createConnection(con)

app.use(express.json())
app.use(cors({ origin: "*" }))
app.use(bodyParser.json())

app.post('/apiMedia', (req, res) => {
    var { api, userName } = req.body
    db.query(`SELECT * FROM ${ api } WHERE name = ?`, [ userName.name ], (err, rows) => {
        if (err) throw(err)
        res.send(rows)
    })
})

app.delete('/deleteMedia', (req, res) => {
    var { api, media } = req.body
    db.query(`DELETE FROM ${ api } WHERE id = ?`, [ media ], (err) => { if (err) console.log(err) })
    res.send(console.log('Content deleted...'))
})

app.post('/notesByTitle', (req, res) => {
    var { api, title, userName } = req.body
    db.query(`SELECT * FROM ${ api } WHERE title = ? && name = ?`,
        [ title, userName.name ],
        (err, rows) => {
            if (err) throw(err)
            res.send(rows)
    })
})

app.put('/editNote', (req, res) => {
    var { table, newNote, id } = req.body
    db.query(`UPDATE ${ table } SET note_body = ? WHERE id = ?`,
        [ newNote, id ],
        (err) => { if (err) throw(err) }
    )
    res.send(console.log('Note edited...'))
})

app.post('/addBook', (req, res) => {
    var { title, author, chapters, pages, rating, name } = req.body
    db.query(`INSERT INTO books (title, author, chapters, pages, rating, name) VALUES (?, ?, ?, ?, ?, ?)`,
        [ title, author, chapters, pages, rating, name ],
        (err) => { if (err) throw(err) }
    )
    res.send(console.log('Book added...'))
})

app.post('/addMovie', (req, res) => {
    var { title, director, minutes, rating, name } = req.body
    db.query(`INSERT INTO movies (title, director, minutes, rating, name) VALUES (?, ?, ?, ?, ?)`,
        [ title, director, minutes, rating, name ],
        (err) => { if (err) throw(err) }
    )
    res.send(console.log('Movie added...'))
})

app.post('/addShow', (req, res) => {
    var { title, seasons, rating, name } = req.body
    db.query(`INSERT INTO shows (title, seasons, rating, name) VALUES (?, ?, ?, ?)`,
        [ title, seasons, rating, name ],
        (err) => { if (err) throw(err) }
    )
    res.send(console.log('Show added...'))
})

app.post('/addBookNote', (req, res) => {
    var { title, note_type, note_chapter, note_page, note_body, name } = req.body
    db.query(`INSERT INTO book_notes (title, note_type, note_chapter, note_page, note_body, name) VALUES (?, ?, ?, ?, ?, ?)`,
        [ title, note_type, note_chapter, note_page, note_body, name ],
        (err) => { if (err) throw(err) })
    res.send(console.log('Note saved to database...'))
})

app.post('/addMovieNote', (req, res) => {
    var { title, note_type, note_minute, note_body, name } = req.body
    db.query(`INSERT INTO movie_notes (title, note_type, note_minute, note_body, name) VALUES (?, ?, ?, ?, ?)`,
        [ title, note_type, note_minute, note_body, name ],
        (err) => { if (err) throw(err) })
    res.send(console.log('Note saved to database...'))
})

app.post('/addShowNote', (req, res) => {
    var { title, note_type, note_season, note_episode, note_body, name } = req.body
    db.query(`INSERT INTO show_notes (title, note_type, note_season, note_episode, note_body, name) VALUES (?, ?, ?, ?, ?, ?)`,
        [ title, note_type, note_season, note_episode, note_body, name ],
        (err) => { if (err) throw(err) })
    res.send(console.log('Note saved to database...'))
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}

app.listen(port, (req, res) => {
    console.log(`Listening on port ${ port }`);
})