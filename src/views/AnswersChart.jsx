import React from 'react';
import { 
    BarChart, XAxis, YAxis, Tooltip, Legend, Bar, Cell, CartesianGrid,
    PieChart, Pie } from 'recharts';
import { Row, Col } from 'antd';
  
import { CHART_COLORS } from '../constants';
import { getColors } from '../utils';

function AnswersChart(props) {
    const data = props.answers.map(el => {
        return {
            name : el.answer,
            votes : el.votes
        }
    });

    let colors = getColors(CHART_COLORS);

    const barChart = (
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
            <Bar dataKey="votes">
                {data.map((el, id) => (
                    <Cell key={`${props.poll.question}_${id}`} fill={colors[id % CHART_COLORS]} />
                ))}
            </Bar>
        </BarChart>
    );

    let contents = null;
    if (props.type === 'double' && window.innerWidth > 425) {
        colors = getColors(CHART_COLORS);

        const pieChart = (
            <PieChart width={200} height={200}>
                <Pie dataKey="votes" isAnimationActive={false} data={data} cx="50%" cy="50%" outerRadius={80} label >
                    {data.map((el, id) => (
                        <Cell key={`${props.poll.question}_${id}`} fill={colors[id % CHART_COLORS]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        );
        
        contents = (
            <Row gutter={24}>
                <Col span={12}>
                    {barChart}
                </Col>
                
                <Col span={12}>
                    {pieChart}
                </Col>
            </Row>
        );
    } else {
        contents = barChart;
    }
    
    return contents;
}

export default AnswersChart;