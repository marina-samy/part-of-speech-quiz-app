import React, { useState, useEffect } from 'react';
import './Quiz.css';
import axios from 'axios';
import Rank from '../RankPage/Rank';
import { GiSandsOfTime } from "react-icons/gi";
import Bg from '../../components/Button/Background/Bg';
import background from '../../imgs/luxury-blue-golden-background_23-2149329427.avif';
import Swal from 'sweetalert2';

export default function Quiz() {

  // State variables
  const [words, setWords] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(50);
  const [timerExpired, setTimerExpired] = useState(false);

  // Calculate the progress bar percentage
  const progress = Math.round((answeredQuestions / words.length) * 100);

  // Check if timer has expired
  useEffect(() => {
    if (timeLeft === 0) {
      setTimerExpired(true);
    }
  }, [timeLeft]);

  // Handle answer selection
  const handleAnswer = (answer) => {
    const currentWord = words[answeredQuestions];
    const isCorrect = currentWord.pos.toLowerCase() === answer.toLowerCase();
  
    setAnswerSelected(true);
    setIsAnswerCorrect(isCorrect);
  
    setCorrectAnswers(prevCorrectAnswers => {
      const updatedCorrectAnswers = [...prevCorrectAnswers];
      updatedCorrectAnswers[answeredQuestions] = {
        ...updatedCorrectAnswers[answeredQuestions],
        selected: answer,
        isCorrect
      };
      return updatedCorrectAnswers;
    });
  };

  // Handle moving to the next word
  const handleNextWord = () => {
    const currentWord = words[answeredQuestions];
    const correctAnswer = correctAnswers[answeredQuestions];
    const isCorrect = currentWord && currentWord.pos.trim().toLowerCase() === (correctAnswer ? correctAnswer.selected.trim().toLowerCase() : '');
  
    setIsAnswerCorrect(isCorrect);
    setAnswerSelected(false);
  
    // Show a message based on whether the answer is correct or not
    if (isCorrect) {
      Swal.fire({
        title: 'Correct!',
        text: 'Great job!',
        icon: 'success',
        confirmButtonText: 'Continue',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          setAnsweredQuestions(answeredQuestions + 1);
          setTimeLeft(50);
          setIsAnswerCorrect(null);
          setTimerExpired(false);
        }
      });
    } else {
      Swal.fire({
        title: 'Incorrect!',
        text: '',
        icon: 'error',
        confirmButtonText: 'Continue',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          setAnsweredQuestions(answeredQuestions + 1);
          setTimeLeft(50);
          setIsAnswerCorrect(null);
          setTimerExpired(false);
        }
      });
    }
  };

  // Reset timer and set timerExpired to false when moving to the next word
  useEffect(() => {
    setTimeLeft(50);
    setTimerExpired(false);
  }, [answeredQuestions]);

  // Set timer to expire when timeLeft is 0
  useEffect(() => {
    const timer = setTimeout(() => {
      if (answerSelected) {
        setTimerExpired(true);
      }
    }, timeLeft * 1000);
  
    return () => clearTimeout(timer);
  }, [timeLeft, answerSelected]);

  // Move to the next word when timer has expired
  useEffect(() => {
    if (timerExpired) {
      handleNextWord();
    }
  }, [timerExpired]);

  // Fetch words data from the server
  useEffect(() => {
    axios.get('http://localhost:4000/words').then(response => {
      setWords(response.data);
    });

    // Start the countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prevTimeLeft => Math.max(prevTimeLeft - 1, 0));
    }, 900);
  
    return () => clearInterval(timer);
  }, []);

  // Render the component
  if (answeredQuestions >= words.length) {
    return (
      <div>
        <Rank correctAnswers={correctAnswers} words={words} />
      </div>
    );
  }

  const currentWord = words[answeredQuestions];
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <Bg background={background} height={'250px'}>

      {/* Progress bar */}
      <div className='progress w-25 my-1'>
        <div
          className='progress-bar progress-bar-striped bg-success'
          role='progressbar'
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin='0'
          aria-valuemax='100'
        >
          {progress}%
        </div>
      </div>

      {/* Countdown timer */}
        <p className='text-white fw-bold' style={{ fontSize: "80px" }}>
          {answeredQuestions + 1} / {words.length}
        </p>
        <p className='fs-3 fw-bold' style={{color:"#74ce74"}}>
          00 : {timeLeft} <GiSandsOfTime />
        </p>
      </Bg>

      {/* Word to be guessed */}
      <h1 className='text-light text-capitalize text-center mt-3' key={currentWord.id}>{currentWord.word}</h1>

      {/* Answer options */}
      <div className='my-2 w-50 bg-light mx-auto rounded shadow p-4'>
        <div className='d-flex flex-column align-items-center justify-content-center mx-auto rounded shadow'
             style={{"background": "lightgrey", "width":"90%"}}>
          <button className='btn' onClick={() => handleAnswer('noun')}>Noun</button>
          <button className='btn' onClick={() => handleAnswer('verb')}>Verb</button>
          <button className='btn' onClick={() => handleAnswer('adjective')}>Adjective</button>
          <button className='btn' onClick={() => handleAnswer('adverb')}>Adverb</button>
        </div>
      </div>
      
      {/* Next button */}
      <button style={{background:"#74ce74", cursor: "pointer"}}
       className='w-50 rounded-pill text-dark text-capitalize mt-4 shadow py-2'
        onClick={handleNextWord} disabled={!answerSelected}>Next</button>
    </div>
  );
}