import * as actionTypes from '../actions/actionTypes';

const initialState = {
    vote_success : false,
    vote_fail : true
}

const voteSuccess = (state, action) => {
    return Object.assign({}, state, {
        vote_success : !state.vote_success
    });
}

const voteFail = (state, action) => {
    return Object.assign({}, state, {
        vote_fail : !state.vote_fail
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VOTE_SUCCESS:
            return voteSuccess(state, action);
        case actionTypes.VOTE_FAIL:
            return voteFail(state, action);
        default:
            return state;
    }
}

export default reducer;