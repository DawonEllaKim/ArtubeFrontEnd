import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import thunk from "redux-thunk";

// REDUCER
import User from "./modules/user";
import Post from "./modules/post";
import Comment from "./modules/comment";
import Profile from "./modules/profile";

// HISTORY
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  post: Post,
  comment: Comment,
  profile: Profile,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const enhancer = applyMiddleware(...middlewares);
let store = compose(createStore(rootReducer, enhancer));

export default store;
