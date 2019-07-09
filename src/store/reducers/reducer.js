import * as actionTypes from '../actions/actionTypes';

const initialState = {
    vote_success : '',
    vote_fail : ''
}

const voteSuccess = (state, action) => {
    return Object.assign({}, state, {
        vote_success : action.poll
    });
}

const voteFail = (state, action) => {
    return Object.assign({}, state, {
        vote_fail : action.poll
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