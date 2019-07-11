import React from 'react';
import { Card } from 'antd';

function CommentCard(props) {
    let title = props.comment.email ? (
        <a href={`mailto:${props.comment.email}`}>
            {props.comment.name}
        </a>
    ) : props.comment.name;
   
    // TO DO : add date created
    return (
        <Card title={title}>
            {props.comment.text}
        </Card>
    )
}

export default CommentCard;

