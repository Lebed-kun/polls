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