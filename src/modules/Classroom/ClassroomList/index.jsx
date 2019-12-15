import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "components/Loader";

import ButtonPrimary from "components/StyledButtons/ButtonPrimary";

const ClassroomList = () => {
  /*const [loading, setLoading] = useState(true);
  const [qcms, setQcms] = useState([]);

  const buildList = useCallback(
    data => {
      if (typeof data.error !== undefined && data.error) {
        const error = data.error;
        console.log(error);
      } else {
        setQcms(data);
      }
      setLoading(false);
    },
    [qcms, loading]
  );

  useEffect(() => {
    const URL = "http://127.0.0.1:8000/qcm/show/all?limit=6&page_number=1";
    fetch(URL, { method: "POST" })
      .then(response => response.json())
      .then(buildList)
      .catch(console.log("error AJAX request"));
  }, []);
  
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
  
  */

  return (
    <div className="container">
      <h1 className="color-grey">Classes</h1>

      <div className="qcms-container">
        <Link to="makeClassroom">
          <ButtonPrimary className="btn-qdd-qcm">Créer</ButtonPrimary>
        </Link>
      </div>

      <p>Vous ne faites partie d'aucune classe</p>
    </div>
  );
};

export default ClassroomList;
