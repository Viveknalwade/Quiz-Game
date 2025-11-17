# Quiz-Game
## Objective: 
Fulfill the user stories below and get all the tests to pass to complete the lab.
## User Stories:
1.	You should create an array named questions.
2.	The questions array should contain at least five objects, each having the keys category, question, choices, and answer.
3.	The category key should have the value of a string representing a question category.
4.	The question key should have the value of a string representing a question.
5.	The choices key should have the value of an array containing three strings, which are alternative answers to the question.
6.	The answer key should have the value of a string, representing the correct answer to the question. Also, the value of answer should be included in the choices array.
7.	You should have a function named getRandomQuestion that takes an array of questions as a parameter and returns a random question object from the array.
8.	You should have a function named getRandomComputerChoice that takes the array of the available choices as a parameter, and returns a random answer to the selected question.
9.	You should have a function named getResults that takes the question object as the first parameter and the computer's choice as the second parameter. The function should return The computer's choice is correct! if the answer is correct. Otherwise, it returns The computer's choice is wrong. The correct answer is: <correct-answer>, where <correct-answer> is the value of the correct answer to the chosen question.
