import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  let navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //Redirect once count is equal to 0
    count === 0 && navigate("/");
    //CleanUp
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="container p-5 text-center">
      <h2>Redirecting you in {count} seconds.</h2>
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingToRedirect;
