# part-of-speech-quiz-app
This is a quiz app that tests the user's knowledge of parts of speech. The user is given a word and must choose whether it is a noun, verb, adjective, or adverb. The quiz includes a timer, a progress bar, and a rank page that shows the user's score and rank.

# Getting Started
To get started with the app, you will need to have Node.js ↗ installed on your computer. Once Node.js is installed, you can download the app from the GitHub repository:

git clone ttps://github.com/marina-samy/part-of-speech-quiz-app.git After downloading the app, navigate to the app directory and install the dependencies:

cd part-of-speech-quiz-app npm install Running the App To run the app, use the following command:

npm start This will start the app on http://localhost:3000 ↗. You can then open that URL in your web browser to access the app.

Using the App
When you first open the app, you will see the quiz page. The quiz includes 10 questions, each with a word and four possible answers (one for each part of speech). The user must choose the correct answer within the given time limit (50 seconds by default). If the user does not choose an answer within the time limit, the question is considered incorrect.

As the user answers questions, a progress bar at the top of the page shows how many questions have been answered and how many are remaining. When the quiz is complete, the user is redirected to the rank page.

The rank page shows the user's score (the percentage of questions answered correctly) and rank (the percentage of scores below the user's score). The user can click the "Try Again" button to retake the quiz.

# Endpoints
The app includes two endpoints:

/api/words: This endpoint returns an array of 10 words, each with a random part of speech (one verb, one adverb, one adjective, and seven nouns). The endpoint is used to populate the quiz questions.

/api/rank: This endpoint calculates the user's rank based on their score. The endpoint expects a POST request with a JSON object containing the user's score (a number between 0 and 100). The endpoint returns a JSON object containing the user's rank (a number between 0 and 100).

# Technologies Used
The app was built using the following technologies:

React.js Node.js Express.js Axios Jest React Testing Library

# Author
This app was created by Marina Samy Amin
