import App from './App.jsx'
import ErrorPage from './components/ErrorPage.jsx';

const routes = [
  {
    path: "/:name?",
    element: <App />,
    errorElement: <ErrorPage />,
  },
];

export default routes;