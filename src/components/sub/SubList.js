import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/subCat";
import Loader from "../Loader";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((s) => {
      setSubs(s.data);
      // console.log(c.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div
        className="col btn btn-outline-primary btn-block btn-lg m-3"
        key={s._id}
      >
        <Link className="text-dark" to={`/sub/${s.slug}`}>
          {s.name}
        </Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">{loading ? <Loader /> : showSubs()}</div>
    </div>
  );
};

export default SubList;
