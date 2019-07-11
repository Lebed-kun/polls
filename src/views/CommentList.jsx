import React from 'react';
import axios from 'axios';
import { Button } from 'antd';
import ClipLoader from 'react-spinners/ClipLoader';

import { BASE_URL } from '../constants';
import CommentCard from './CommentCard';

class CommentList extends React.Component {
    state = {
        comments : [],
        next : '',
        loading : true,
        error : false
    }

    componentDidMount() {
        axios.get(`${BASE_URL}/api/comments/${this.props.poll}/`)
            .then(res => {
                this.setState({
                    comments : res.data.results,
                    next : res.data.next,
                    loading : false
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading : false,
                    error : true
                })
            })

    }
    
    render() {
        let contents = null;
        if (this.state.loading) {
            contents = <ClipLoader color="D0AC94" />;
        } else if (this.state.error) {
            contents = <h1 style={{color : 'red'}}>Error in loading comments :(</h1>;
        } else {
            contents = this.state.comments.map((el, id) => (
                <CommentCard key={`comment_${id}`} comment={el} />
            ))
        }
        
        return (
            <div>
                {contents}
                <Button />
            </div>
        )
    }
}

export default CommentList;