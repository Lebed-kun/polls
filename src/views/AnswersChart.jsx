import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, Cell, CartesianGrid } from 'recharts';

import { getRandomColor } from '../utils';

function AnswersChart(props) {
    const data = props.answers.map(el => {
        return {
            name : el.answer,
            votes : el.votes
        }
    })
    
    return (
        <BarChart 
            width={200}
            height={200}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="votes" fill={getRandomColor()} />
        </BarChart>
    )
}

export default AnswersChart;