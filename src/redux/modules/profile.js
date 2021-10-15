import { createAction, handleActions } from "redux- actions";
import { produce } from "immer";
import { apis } from "../../common/axios";

const EDIT_PROFILE = "EDIT_PROFILE";
const DELETE_PROFILE = "DELETE_PROFILE";

const editProfile = createAction((EDIT_PROFILE, (userId, profile)=>({
    userId,
    profile,
})))
const deleteProfile = createAction(DELETE_PROFILE, userId =>({userId}));

const initialState = {
    list: []
}

const editProfileMiddleware = () =>{
    return function (dispatch, getState, {history}){
        apis
            .editPost(
            
        )
    }
}


export default handleActions({


})

const profileActions = {

};

export {profileActions};