import { useState, useEffect } from "react";
import fetchURL from "../fetchURL";
import PropTypes, { func } from "prop-types";

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    //FETCH POSTS
    if (!token) {
      props.toggleLogIn(false);
      setIsLoading(false);
    } else {
      fetch(fetchURL + "/user", {
        mode: "cors",
        method: "get",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("Server error");
        })
        .then((data) => {
          if (data.username) {
            setUserName(data.username);
            props.toggleLogIn(true);
          }else {
            props.toggleLogIn(false);
            window.localStorage.removeItem("token");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          props.toggleLogIn(false);
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
        {props.userLoggedIn ? <p>HELLO, {userName}</p> : <p>YOU ARE NOT LOGGED IN</p>}
      </div>
    );
  }
};

Home.propTypes = {
  userLoggedIn: PropTypes.bool,
  toggleLogIn: PropTypes.func

}

export default Home;
