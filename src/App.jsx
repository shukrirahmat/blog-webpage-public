import { Link, useParams, useNavigate} from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home.jsx";
import LogIn from "./components/LogIn.jsx";
import SignUp from "./components/SignUp.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

function App() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const toggleLogIn = (state) => {
    setUserLoggedIn(state);
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    navigate("/");
    navigate(0);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <h1>MY BLOG</h1>
        </Link>
        {!userLoggedIn && <Link to="/log-in">LOG IN</Link>}
        <p></p>
        {!userLoggedIn && <Link to="/sign-up">SIGN UP</Link>}
        <p></p>
        {userLoggedIn && <button onClick={handleLogOut}>LOG OUT</button>}
      </nav>
      <hr></hr>
      {name === "sign-up" ? (
        <SignUp />
      ) : name === "log-in" ? (
        <LogIn />
      ) : !name ? (
        <Home userLoggedIn={userLoggedIn} toggleLogIn={toggleLogIn} />
      ) : (
        <ErrorPage/>
      )}
    </>
  );
}

export default App;
