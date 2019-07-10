import React from 'react';
import { 
    BarChart, XAxis, YAxis, Tooltip, Legend, Bar, Cell, CartesianGrid,
    PieChart, Pie } from 'recharts';
import { Row, Col } from 'antd';
  
import { getRandomColor } from '../utils';

const mapStateToProps = state => {
    return {
        vote_success : state.vote_success
    }
}

function AnswersChart(props) {
    const data = props.answers.map(el => {
        return {
            name : el.answer,
            votes : el.votes
        }
    });

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
            <Legend />
            <Bar dataKey="votes" fill={getRandomColor()} />
        </BarChart>
    );

    let contents = null;
    if (props.type === 'double') {
        console.log(props.type);
        const pieChart = (
            <PieChart width={200} height={200}>
                <Pie dataKey="votes" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                <Pie dataKey="votes" data={data} cx={500} cy={200} innerRadius={40} outerRadius={80} fill={getRandomColor()} />
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