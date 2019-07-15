import axios from 'axios';
import { BASE_URL } from '../../constants';
import * as actionTypes from './actionTypes';

export const voteSuccess = poll => {
    return {
        type : actionTypes.VOTE_SUCCESS,
        poll
    }
}

export const voteFail = poll => {
    return {
        type : actionTypes.VOTE_FAIL,
        poll
    }
}

export const vote = (choices, poll) => {
    return dispatch => {
        const firstVote = choices[0];

        let url = `${BASE_URL}/api/add_vote/${firstVote}/` + 
            '?choices=' + choices.join(',');

        axios.put(url)
            .then(res => {
                dispatch(voteSuccess(poll));
            })
            .catch(err => {
                console.log(err);
                dispatch(voteFail(poll));
            })
    }
}

export const commentSuccess = () => {
    return {
        type : actionTypes.COMMENT_SUCCESS
    }
}

export const commentFail = () => {
    return {
        type : actionTypes.COMMENT_FAIL
    }
}

export const postComment = (comment, poll) => {
    return dispatch => {
        const { name, email, text  } = comment;

        axios.post(`${BASE_URL}/api/new_comment/${poll}/`, {
            name : name || '',
            email : email || '',
            text
        })
            .then(res => {
                dispatch(commentSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(commentFail());
            });
    }
}