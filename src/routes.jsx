import App from './App.jsx'
import Home from './components/Home.jsx'
import LogIn from './components/LogIn.jsx'
import SignUp from './components/SignUp.jsx'

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "log-in", element: <LogIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
];

export default routes;