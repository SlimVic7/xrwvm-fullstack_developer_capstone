const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3030;

app.use(cors());
app.use(express.json());

// Pull raw data directly, bypassing the frozen database
let dealerships_data = JSON.parse(fs.readFileSync('./data/dealerships.json', 'utf8'));
let reviews_data = JSON.parse(fs.readFileSync('./data/reviews.json', 'utf8'));

app.get('/fetchDealers', (req, res) => {
  res.json(dealerships_data.dealerships);
});

app.get('/fetchDealers/:state', (req, res) => {
  const state = req.params.state;
  const filtered = dealerships_data.dealerships.filter(d => d.state === state);
  res.json(filtered);
});

app.get('/fetchDealer/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const dealer = dealerships_data.dealerships.filter(d => d.id === id);
  res.json(dealer);
});

app.get('/fetchReviews/dealer/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const reviews = reviews_data.reviews.filter(r => r.dealership === id);
  res.json(reviews);
});

// UPGRADED POST ROUTE: Save the review to RAM!
app.post('/insertReview', (req, res) => {
    const review = req.body.review || req.body;
    if(review.dealership) {
        review.dealership = parseInt(review.dealership);
    }
    // "unshift" forces your new review to the absolute top of the list
    reviews_data.reviews.unshift(review); 
    res.json({status: 200, message: "Review received successfully"});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});