import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import thunk from "redux-thunk";

import user from "./modules/user";
import post from "./modules/post";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user,
  post,
  router: connectRouter(history),
});

// 미들웨어는 액션 실행과 리듀서 사이에 api요청같은 것을 수행함
// history를 쓰는 것도 같음
// 비동기 요청 후 .then해서 history 사용할 수 있음
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라
// if문을 쓴 이유는 개발환경일때만 쓰려고
// 개발환경이 아니라 production 환경일 때 사용하면 굳이 필요없는 상황인데 프로젝트 크기만 커지는 것을 초래
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// 돌아가는 환경이 브라우저가 아닐때도 있음
// 브라우저 아닐때는 window객체가 없음
// 환경이 브라우저일때만 실행하려고 만들어놓은 코드
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// 스토어에 브라우저 히스토리 들어감

// 스토어 만들기
let store = initialStore => createStore(rootReducer, enhancer);

// store() 이렇게 실행하면 만들어진 스토어가 드루감
export default store();
