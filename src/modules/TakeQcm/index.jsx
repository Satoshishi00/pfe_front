import React, { useState, useCallback, useEffect, useMemo } from "react";
import ButtonPrimary from "components/StyledButtons/ButtonPrimary";
import Loader from "components/Loader";

import Response from "./Response";

import checkIfUrlInString from "utils/checkIfUrlInString";
import MakeLinkIfUrl from "components/MakeLinkIfUrl";

const TakeQcm = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [qcm, setQcm] = useState([]);
  const [answers, setAnswers] = useState();
  const [isResult, setIsResult] = useState(false);

  const buildList = useCallback(
    data => {
      console.log(data.error);
      if (data && data.error) {
        const error = data.error;
        console.log(error);
      } else {
        const [infos, ...questions] = data;

        setQcm(infos);
        setQuestions(questions);

        /*setQcm(data[0]);
        //On retire la première ligne du tableau qui contient le nom et la description du qcm
        data.splice(0, 1);
        setQuestions(data);*/
      }

      setLoading(false);
    },
    [questions, qcm, loading]
  );

  useEffect(() => {
    const curent_url = window.location.href;
    const id_qcm = curent_url.split("/")[4];
    const URL = "http://127.0.0.1:8000/qcm/" + id_qcm + "/result";
    fetch(URL, { method: "GET" })
      .then(response => response.json())
      .then(buildList)
      .catch(console.log("error AJAX request"));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    let data = new FormData(e.target);
    setAnswers(data);
    setIsResult(true);
  };

  const renderQuestions = useMemo(() => {
    return questions.map(raw => {
      //On récupère dabord la question et l'advice (si on a soumis le résultat)
      //Puis on boucle pour récupérer les réponses

      const question = raw.filter(({ parent }) => !parent)[0];

      console.log(question.id);

      const current_answers = raw.filter(({ parent }) => parent > 0);
      return (
        <div key={question.id}>
          <p className="qcm-question">
            {question.question_response.charAt(0).toUpperCase() +
              question.question_response.slice(1)}
          </p>
          {isResult && (
            <p className="qcm-advice">
              {question.advice ? (
                <MakeLinkIfUrl theString={question.adive} />
              ) : (
                ""
              )}
            </p>
          )}
          <Loader
            loading={loading}
            render={current_answers.map(response => (
              <Response
                id={response.id}
                key={response.id}
                response={response.question_response}
                parent={response.parent}
                good_answer={response.good_rep}
                isResult={isResult}
                answers={answers}
              />
            ))}
          />
        </div>
      );
    });
  }, [questions, isResult, answers, loading]);

  return (
    <div className="container">
      <h1 className="color-grey">QCM - {qcm.qcm_name}</h1>

      <h2 className="color-grey">{qcm.qcm_description}</h2>
      <form id="form" onSubmit={onSubmit}>
        <Loader loading={loading} render={renderQuestions} />
        <ButtonPrimary>Envoyer</ButtonPrimary>
      </form>

      <div className="qcms-container"></div>
    </div>
  );
};

export default TakeQcm;
