import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FcFlashOn } from "react-icons/fc";
import { BsStarFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Bg from '../../components/Button/Background/Bg';
import background from '../../imgs/luxury-blue-golden-background_23-2149329427.avif';
import Quiz from '../QuizPage/Quiz';

// Calculate the score based on the correctAnswers and userAnswers arrays
const calculateScore = (correctAnswers, userAnswers) => {
  let numQuestions = correctAnswers.length;
  let numCorrect = 0;

  console.log('correctAnswers:', correctAnswers);
  console.log('userAnswers:', userAnswers);

  for (let i = 0; i < numQuestions; i++) {
    if (userAnswers[i] === correctAnswers[i]?.pos) {
      numCorrect++;
    }
  }

  const score = numCorrect / numQuestions * 100;
  return score;
};

export default function Rank({ correctAnswers, words }) {

  // State variables
  const [rank, setRank] = useState(0);
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState(false);

  // Calculate the score and rank and set the state variables accordingly
  useEffect(() => {
    if (correctAnswers && correctAnswers.length > 0) {
      const userAnswers = correctAnswers.map(answer => answer.selected);
      const calculatedScore = calculateScore(words, userAnswers);
      console.log('Calculated Score:', calculatedScore);
      setScore(calculatedScore);
      calculateRank(calculatedScore);
    }
  }, [correctAnswers]);

  // Handle Try Again button click
  const handleTryAgain = () => {
    setRank(0);
    setScore(0);
    setClicked(true);
  };

  // If Try Again button is clicked, return to the quiz
  if (clicked) {
    return <Quiz />;
  }

  // Calculate the rank based on the score
  const calculateRank = (score) => {
    axios.post('http://localhost:4000/rank', { score })
      .then(response => {
        const { rank } = response.data;
        console.log('Rank:', rank);
        setRank(rank);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Render the Rank component
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <Bg background={background} height={'320px'}>
        <p className='text-white fw-bold' style={{ fontSize: "80px" }}>
          Congratulations!
        </p>

        {/* Display the number of correct answers */}
        <p className='fs-4 fw-bold' style={{ color: "#74ce74" }}>
          You Have Answer {correctAnswers && correctAnswers.filter(answer => answer && answer.isCorrect).length} Correct Answeres From {words.length}
        </p>       
      </Bg>

      {/* Display the score and rank */}
      <div className='w-75 d-flex justify-content-evenly align-items-center flex-wrap mt-5'>
        <div className="col-lg-3 col-md-12 p-2 rounded shadow  text-center" style={{ background: "rgba(3, 3, 34, 0.722)" }}>
          <BsStarFill className='fs-2 my-2' style={{ color: "#74ce74" }} />
          <p className='fs-2' style={{ color: "#74ce74" }}>{score}</p>
          <small className='text-white'>Your Score</small>
        </div>

        <div className="col-lg-3 col-md-12 p-2 rounded shadow text-center" style={{ background: "rgba(3, 3, 34, 0.722)" }}>
          <FcFlashOn className='fs-2 my-2' />
          <p className='text-warning fs-2' style={{ color: "#74ce74" }}>{rank}% </p>
          <small className='text-white'>Your Rank</small>
        </div>
      </div>

      {/* Try Again button */}
      <button style={{ background: "#74ce74", cursor: "pointer" }} className='w-50 rounded-pill text-dark text-capitalize mt-4 shadow py-2' onClick={handleTryAgain}> Try Again </button>
    </div>
  );
}