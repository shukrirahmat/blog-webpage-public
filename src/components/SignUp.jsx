import { useState } from "react";
import { useNavigate, Navigate, useOutletContext} from "react-router-dom";
import fetchURL from "../fetchURL";

const SignUp = () => {
  const userLoggedIn = useOutletContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [isSigning, setIsSigning] = useState(false);
  const [otherErr, setOtherErr] = useState("")

  const editUsername = (e) => {
    const newname = e.target.value;
    setUsername(newname);
    if (newname.length > 0 && !newname.match("^[a-zA-Z0-9_]+$")) {
      setUsernameErr("Only letters, numbers and underscores are allowed");
    } else {
      setUsernameErr("");
    }
  };

  const editPassword = (e) => {
    const newpassword = e.target.value;
    setPassword(newpassword);
    if (newpassword !== password2) {
      setPasswordErr("Password did not match");
    } else {
      setPasswordErr("");
    }
  };

  const confirmPassword = (e) => {
    const newpassword = e.target.value;
    setPassword2(newpassword);
    if (newpassword !== password) {
      setPasswordErr("Password did not match");
    } else {
      setPasswordErr("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOtherErr("");

    if (username.length < 1 || (password.length < 1 && password2.length < 1)) {
      if (username.length < 1) {
        setUsernameErr("Username is required");
      }
      if (password.length < 1 && password2.length < 1) {
        setPasswordErr("Password is required");
      }
    } else if (!username.match("^[a-zA-Z0-9_]+$") || password !== password2) {
      // Do nothing, sign in failed
    } else {
      setIsSigning(true);

      fetch(fetchURL + "/user/sign-up", {
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
            throw new Error("Failed to sign up. server error");
          }
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            setIsSigning(false);
            setUsernameErr(data.error);
          } else {
            setIsSigning(false);
            navigate("/");
          }
        })
        .catch((err) => {
          setIsSigning(false);
          setOtherErr(err.message);
        });
    }
  };

  if (userLoggedIn) {
    return <Navigate to="/"/>
  }

  return (
    <div>
      <h1>THIS IS SIGN UP PAGE</h1>
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
        <label htmlFor="password2">CONFIRM PASSWORD</label>
        <input
          type="password"
          name="password2"
          id="password2"
          value={password2}
          onChange={confirmPassword}
        />
        {passwordErr && <p>{passwordErr}</p>}
        {otherErr && <p>{otherErr}</p>}
        {!isSigning && <button>SIGN UP</button>}
        {isSigning && <button disabled>SIGNING...</button>}
      </form>
    </div>
  );
};

export default SignUp;
