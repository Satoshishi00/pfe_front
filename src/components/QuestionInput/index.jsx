import React, { useState, useEffect, useCallback } from "react";

import StyledContainerInput from "components/ContainerInput";
import CustomInput from "components/CustomInput";

import "react-toastify/dist/ReactToastify.css";

const QuestionInput = props => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerIndex, setAnswerIndex] = useState(1);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    addAnswer();
  }, []);

  const update = useCallback(
    (e, { name, value }) => {
      /*switch (name) {
        case "question" + props.num:
          setQuestion(value);
          console.log("question input state : ", value);
          break;
        case "q" + props.num + "-rep1":
          setAnswer(value);
          console.log("answer input state : ", value);
          break;
        default:
          break;
      }*/
      if (name === "question" + props.num) {
        setQuestion(value);
        console.log("question input state : ", value);
      } else if (name.substr(0, 5 + props.num) === "q" + props.num + "-rep") {
        setAnswer(value);
        console.log("answer input state : ", value);
      } else {
        console.log("substr : ", name.substr(0, 5 + props.num));
        console.log("field name : ", "q" + props.num + "-rep");
      }
    },
    [setQuestion, setAnswer]
  );

  const addAnswer = e => {
    e && e.preventDefault();
    setAnswers([
      ...answers,
      <div className="relative">
        <CustomInput
          id="answer-input-html"
          type="text"
          key={`q${props.num}-rep${answerIndex}`}
          update={update}
          value={answer}
          placeholder={`Réponse ${answerIndex}`}
          name={`q${props.num}-rep${answerIndex}`}
          color="grey"
          className="ct-input"
        />
        <i className="fas fa-minus" onClick={deleteAnswer}></i>
      </div>
    ]);

    setAnswerIndex(answerIndex + 1);
  };

  const deleteAnswer = () => {
    console.log("toto");
  };

  return (
    <div id={"question-html-" + props.num}>
      <StyledContainerInput id={"question-" + props.num} className="mg-t">
        <CustomInput
          type="text"
          key={"question" + props.num}
          update={update}
          value={question}
          placeholder="Question"
          name={"question" + props.num}
          color="grey"
          className="ct-input"
        />
        {answers.map(answer => answer)}
      </StyledContainerInput>
      <div className="add-answer-container">
        <div className="add-answer" onClick={addAnswer}>
          +
        </div>
      </div>
    </div>
  );
};

export default QuestionInput;
