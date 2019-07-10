import * as actionTypes from '../actions/actionTypes';

const initialState = {
    vote_success : '',
    vote_fail : '',
    comment_success : false,
    comment_fail : false
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

const commentSuccess = (state, action) => {
    return Object.assign({}, state, {
        comment_success : !state.comment_success
    });
}

const commentFail = (state, action) => {
    return Object.assign({}, state, {
        comment_fail : !state.comment_fail
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VOTE_SUCCESS:
            return voteSuccess(state, action);
        case actionTypes.VOTE_FAIL:
            return voteFail(state, action);
        case actionTypes.COMMENT_SUCCESS:
            return commentSuccess(state, action);
        case actionTypes.COMMENT_FAIL:
            return commentFail(state, action);
        default:
            return state;
    }
}

export default reducer;