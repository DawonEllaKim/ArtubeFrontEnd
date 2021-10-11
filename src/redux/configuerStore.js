import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import user from "./modules/user";
import post from "./modules/post";

const middleware = [thunk];
const enhancer = applyMiddleware(...middleware);
const rootReducer = combineReducers({
  user,
  post,
});
const store = createStore(rootReducer, enhancer);

export default store;
