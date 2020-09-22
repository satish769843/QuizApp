import React, { useState } from "react";
import { Route } from "react-router-dom";
import Homenav from "./components/HomeHeader.component";
import Loginnav from "./components/LoginNav.component";
import Taketest from "./components/TakeTest.component";
import Login from "./components/LoginRegister.component";
import dashboard from "./components/Dashboard.component";
import Testresult from "./components/TestResult.component";
import Ques from "./components/Question.component";

function App() {
  const [loggedin, setloggedin] = useState(false);

  return (
    <React.Fragment>
      <nav>
        {loggedin ? (
          <Loginnav setloggedin={setloggedin} />
        ) : (
          <Homenav setloggedin={setloggedin} />
        )}
      </nav>
      <main>
        <Route exact path="/" component={Taketest} />
        <Route
          exact
          path={["/login", "/register"]}
          render={() => <Login setloggedin={setloggedin} />}
        />
        <Route exact path="/dashboard" component={dashboard} />
        <Route exact path="/abouttest" component={Testresult} />
        <Route exact path="/test" component={Ques} />
      </main>
    </React.Fragment>
  );
}

export default App;
