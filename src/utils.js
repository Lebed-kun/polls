import axios from 'axios';
import { BASE_URL } from './constants';


const randInt = (start, end) => {
    let result = Math.random() * (end - start + 1);
    result += start;
    return Math.floor(result);
}

const getRandomColor = (options = {}) => {
    let red = randInt(options.minRed || 0, options.maxRed || 255);
    red = red.toString(16);
    let green = randInt(options.minGreen || 0, options.maxGreen || 255);
    green = green.toString(16);
    let blue = randInt(options.minBlue || 0, options.maxBlue || 255);
    blue = blue.toString(16);

    return `#${red}${green}${blue}`;
}

export const getColors = number => {
    let result = [];
    let restrictions = {
        maxRed : 235,
        maxGreen : 235,
        maxBlue : 235
    }

    for (let i = 0; i < number; i++) {
        result.push(getRandomColor(restrictions));
    }

    return result;
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