import axios from 'axios';
import { BASE_URL } from './constants';


const randInt = (start, end) => {
    let result = Math.random() * (end - start + 1);
    result += start;
    return Math.floor(result);
}

export const getRandomColor = () => {
    let red = randInt(0, 255);
    red = red.toString(16);
    let green = randInt(0, 255);
    green = green.toString(16);
    let blue = randInt(0, 255);
    blue = blue.toString(16);

    return `#${red}${green}${blue}`;
}

export const createPoll = poll => {
    const { question, answers, allow_multiple, allow_comments } = poll;
    
    let promise = axios.post(`${BASE_URL}/api/new_poll/`, {
            question,
            answers,
            allow_multiple,
            allow_comments
    });

    return promise;
}

export const cleanArray = arr => {
    return arr.filter(el => el !== undefined);
}

export const generateArray = (func, count, initialValue = 0) => {
    let result = [];
    
    for (let n = 0, arg = initialValue; n < count; n++, arg++) {
        result.push(func(arg, n));
    }

    return result;
}