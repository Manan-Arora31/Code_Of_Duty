import React, { useState } from 'react';
import axios from 'axios';

const AdminQuizCreation = () => {
  const [quizDetails, setQuizDetails] = useState({
    title: "",
    category: "",
    questions: [{ text: "", options: ["", "", ""], correctOption: "" }],
  });
   
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails({ ...quizDetails, [name]: value });
  };
  const handleQuestionTextChange = (e, questionIndex) => {
    const { value } = e.target;
    const updatedQuestions = [...quizDetails.questions];
    updatedQuestions[questionIndex].text = value;
    setQuizDetails({ ...quizDetails, questions: updatedQuestions });
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const updatedQuestions = [...quizDetails.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuizDetails({ ...quizDetails, questions: updatedQuestions });
  };

  const handleCorrectOptionChange = (e, questionIndex) => {
    const { value } = e.target;
    setQuizDetails({
      ...quizDetails,
      questions: quizDetails.questions.map((question, index) => {
        if (index === questionIndex) {
          return { ...question, correctOption: value };
        }
        return question;
      }),
    });
  };

  const handleAddQuestion = () => {
    setQuizDetails({
      ...quizDetails,
      questions: [
        ...quizDetails.questions,
        { text: '', options: ['', '', ''], correctOption: '' },
      ],
    });
  };

  const handleRemoveQuestion = (questionIndex) => {
    const updatedQuestions = quizDetails.questions.filter((_, index) => index !== questionIndex);
    setQuizDetails({ ...quizDetails, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/quiz/createQuiz", quizDetails);
      // handle success
      console.log(response.data);
      setQuizDetails({
        title: "",
        category: "",
        questions: [{ text: "", options: ["", "", ""], correctOption: "" }],
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>

      
      <label> Title:</label>
        <input 
         type="text"
         name="title"
         value={quizDetails.title}
         onChange={(e)=>handleInputChange(e)}
         />
         
         <label>Category:</label>
        <input
          type="text"
          name="category"
          value={quizDetails.category}
          onChange={(e) => handleInputChange(e)}
        />
        {quizDetails.questions.map((question, index) => (
          <div key={index}>
            <label>{`Question ${index + 1}:`}</label>
            <input
              type="text"
              name={`text-${index}`}
              value={question.text}
              onChange={(e) => handleQuestionTextChange(e, index)}
            />

            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>{`Option ${optionIndex + 1}:`}</label>
                <input
                  type="text"
                  name={`option-${index}-${optionIndex}`}
                  value={option}
                  onChange={(e) => handleOptionChange(e, index, optionIndex)}
                />
              </div>
            ))}

            <label>Correct Option:</label>
            <input
              type="text"
              name="correctOption"
              value={question.correctOption}
              onChange={(e) => handleCorrectOptionChange(e, index)}
            />

            <button type="button" onClick={() => handleRemoveQuestion(index)}>
              Remove Question
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>

        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default AdminQuizCreation;