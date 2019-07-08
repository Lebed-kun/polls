import axios from 'axios';
import { BASE_URL } from '../../constants';
import * as actionTypes from './actionTypes';

export const voteSuccess = () => {
    return {
        type : actionTypes.VOTE_SUCCESS
    }
}

export const voteFail = () => {
    return {
        type : actionTypes.VOTE_FAIL
    }
}

export const vote = choices => {
    return dispatch => {
        const firstVote = choices[0];

        let url = `${BASE_URL}/api/add_vote/${firstVote}` + 
            '?choices=' + choices.join(',');

        axios.post(url)
            .then(res => {
                dispatch(voteSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(voteFail());
            })
    }
}