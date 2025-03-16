import { useState, useEffect } from "react";
import fetchURL from "../fetchURL";

const Home = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    //FETCH POSTS
    if (!token) {
      setUserLoggedIn(false);
      setIsLoading(false);
    } else {
      fetch(fetchURL + "/user", {
        mode: "cors",
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("Not logged in");
        })
        .then((data) => {
          setUserName(data.username);
          setUserLoggedIn(true);
          setIsLoading(false);
        })
        .catch((err) => {
          setUserLoggedIn(false);
          setIsLoading(false);
        });
    }
  }, []);

  if (isLoading) {
    return <div>LOADING PAGE...</div>;
  } else {
    return (
      <div>
        <h1>THIS IS HOMEPAGE</h1>
        {userLoggedIn ? <p>HELLO, {userName}</p> : <p>YOU ARE NOT LOGGED IN</p>}
      </div>
    );
  }
};

export default Home;
