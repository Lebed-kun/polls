import React from 'react';
import { Card } from 'antd';

import { localize } from '../utils';

function CommentCard(props) {
    let name = props.comment.name || localize({'ru' : 'Анон', 'en' : 'Anon'});
    
    let title = props.comment.email ? (
        <a href={`mailto:${props.comment.email}`}>
            {name}
        </a>
    ) : name;

    let cardStyle = {
        margin : '20px 0',
        paddingBottom : '10px'
    }

    let date = new Date(props.comment.created_at);
    date = date.toLocaleString();

    let dateStyle = {
        fontSize : '16px',
        fontStyle : 'italic',
    };
   
    return (
        <Card title={title} style={cardStyle}>
            {props.comment.text}
            <br /><br /><hr style={{borderTop : '1px dashed'}} />
            <p style={dateStyle}>{date}</p>
        </Card>
    )
}

export default CommentCard;

