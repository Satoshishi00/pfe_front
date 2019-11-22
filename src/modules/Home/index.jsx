import React, { useState, useCallback, useEffect } from "react";

import Categories from "components/Categories";
import Loader from "components/Loader";

import Qcm from "./Qcm";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [qcms, setQcms] = useState([]);
  const [error, setError] = useState("");

  const buildList = useCallback(
    data => {
      if (typeof data.error !== undefined && data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setQcms(data);
      }
      setLoading(false);
    },
    [error, qcms, loading]
  );

  useEffect(() => {
    const URL = "http://127.0.0.1:8000/qcm/show/all?limit=6&page_number=1";
    fetch(URL, { method: "GET" })
      .then(response => response.json())
      .then(buildList)
      .catch(console.log("error AJAX request"));
  }, []);

  return (
    <div className="container">
      <h1 className="color-grey">Explorer Brainer</h1>
      <Categories />

      <h2 className="color-grey">Quizz les plus populaires</h2>
      <div className="qcms-container">
        <Loader
          loading={loading}
          render={qcms.map(qcm => (
            <Qcm
              key={qcm.id}
              id_qcm={qcm.id}
              name={qcm.name}
              description={qcm.description}
              nb_questions={qcm.nb_questions}
            />
          ))}
        />
      </div>
    </div>
  );
};

export default Home;
