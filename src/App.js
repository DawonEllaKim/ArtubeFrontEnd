import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configuerStore";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./redux/modules/user";

import "./App.css";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Detail from "./pages/Detail";
import MyPage from "./pages/MyPage";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    if (token) {
      dispatch(userActions.userCheckAPI(token));
    }
  }, []);

  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/detail/:postId" exact component={Detail} />
        <Route path="/mypage/:userId" exact component={MyPage} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
