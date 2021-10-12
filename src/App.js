import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configuerStore";

import "./App.css";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Detail from "./pages/Detail";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route path="/main" exact components={Main} />
        <Route path="/signin" exact components={SignIn} />
        <Route path="/signup" exact components={SignUp} />
        <Route path="/deatil" exact components={Detail} />
        <Route path="/mypage" exact components={MyPage} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
