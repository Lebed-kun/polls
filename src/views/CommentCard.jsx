import React from 'react';
import { Card } from 'antd';

function CommentCard(props) {
    let name = props.comment.name || 'Анон';
    
    let title = props.comment.email ? (
        <a href={`mailto:${props.comment.email}`}>
            {name}
        </a>
    ) : name;

    let date = new Date(props.comment.created_at);
    date = date.toLocaleDateString() +
        ' ' + date.toLocaleTimeString();

    let dateStyle = {
        fontSize : '16px',
        fontStyle : 'italic',

        background : 'grey'
    };
   
    // TO DO : add date created
    return (
        <Card title={title}>
            {props.comment.text}
            <p style={dateStyle}>{date}</p>
        </Card>
    )
}

export default CommentCard;

