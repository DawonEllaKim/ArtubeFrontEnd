import { createStore, combineReducers, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import user from "./modules/user";
import post from "./modules/post";

export const history = createBrowserHistory();

const middleware = [thunk];
const enhancer = applyMiddleware(...middleware);
const rootReducer = combineReducers({
  user,
  post,
});
const store = createStore(rootReducer, enhancer);

export default store;
