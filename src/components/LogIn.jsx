import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchURL from "../fetchURL";

const LogIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [otherErr, setOtherErr] = useState("");

  const editUsername = (e) => {
    const newname = e.target.value;
    setUsername(newname);
    setUsernameErr("");
  };

  const editPassword = (e) => {
    const newpassword = e.target.value;
    setPassword(newpassword);
    setPasswordErr("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.length < 1 || password.length < 1) {
      if (username.length < 1) {
        setUsernameErr("Username is required");
      }
      if (password.length < 1) {
        setPasswordErr("Password is required");
      }
    } else {
      setIsLogging(true);

      fetch(fetchURL + "/user/log-in", {
        mode: "cors",
        method: "POST",
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username,
          password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to log in. server error");
          }
          return res.json();
        })
        .then((data) => {
          if (data.usernameErr) {
            setIsLogging(false);
            setUsernameErr(data.usernameErr);
          } else if (data.passwordErr) {
            setIsLogging(false);
            setPasswordErr(data.passwordErr);
          } else {
            setIsLogging(false);
            window.localStorage.setItem("token", data.token);
            navigate("/");
          }
        })
        .catch((err) => {
          setIsLogging(false);
          setOtherErr(err.message);
        });
    }
  };

  return (
    <div>
      <h1>THIS IS LOG IN PAGE</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">USERNAME</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={editUsername}
        />
        {usernameErr && <p>{usernameErr}</p>}
        <label htmlFor="password">PASSWORD</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={editPassword}
        />
        {passwordErr && <p>{passwordErr}</p>}
        {otherErr && <p>{otherErr}</p>}
        {!isLogging && <button>LOG IN</button>}
        {isLogging && <button disabled>Logging in...</button>}
      </form>
    </div>
  );
};

export default LogIn;
