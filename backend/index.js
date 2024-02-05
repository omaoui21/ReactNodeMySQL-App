const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ADzeko123@@',
  database: 'cruddatabase',
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {

    const FetchData = "SELECT * FROM movie_reviews";
  
    db.query(FetchData,(err, result) => {
        if(err){
            console.error('Error Fetch data:', err);
        }else {
            res.send(result);
          }
    });
  });

app.post('/api/insert', (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;
  const insertQuery = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)";

  db.query(insertQuery, [movieName, movieReview], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data into the database');
    } else {
      console.log('Data inserted successfully:', result);
      res.status(200).send('Data inserted successfully');
    }
  });
});
app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?";
  
    db.query(sqlDelete, [id], (err, result) => {
      if (err) {
        console.error('Error delete data:', err);
      }
    });
  });

app.listen(3001, () => {
  console.log('Port 3001 is listening');
});
