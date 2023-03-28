import "semantic-ui-css/semantic.min.css";
import Login from "./Pages/Login";
import { Template } from "./template";

function App() {
  const login = sessionStorage.getItem("isLoggedIn");

  // return login !== "true" ? <Login /> : <Template />;
  return <Template />;
}

export default App;
