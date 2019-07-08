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