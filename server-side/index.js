const { log } = require('console');
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();



const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));


app.get('/words', (req, res) => {
    const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'TestData.json')));
    const wordsList = testData.wordList;
    const requiredWords = ['adjective', 'adverb', 'noun', 'verb'];
    let words = [];
    
    // Select at least 1 word of each required type
    requiredWords.forEach(type => {
      const filteredWords = wordsList.filter(word => word.type === type);
      
      if (filteredWords.length > 0) {
        const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
        words.push(randomWord);
      }
      
    });
    
    // Select 6 more random words
    while (words.length < 10) {
      const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
      if (!words.includes(randomWord)) {
        words.push(randomWord);
      }
    }
    
    res.json(words);
    console.log(words);
    
  });






  app.post('/rank', express.json(), (req, res) => {
    const testData = JSON.parse(fs.readFileSync(path.join(__dirname, 'TestData.json')));
    const { scoresList } = testData;
    const { score } = req.body;
  
    if (score === undefined) {
      return res.status(400).send('Score parameter missing');
    }
  
    const belowScores = [...new Set(scoresList)].filter(s => s < score);
    const rank = belowScores.length > 0 ? ((belowScores.length / scoresList.length) * 100).toFixed(2) : 0;
    console.log('Rank:', rank);
    res.send({ rank });
  });



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});