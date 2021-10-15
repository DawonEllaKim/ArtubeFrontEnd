//

import { apis } from "../../common/axios"


const initialState = {
  profile: [],
}


const getUserMiddleware = () => {
  return function(dispatch, getState, {history}) {
    apis.userCheck().then(res => {
      const user = res.data.user
    }

  }
}