import React from 'react';
import axios from 'axios';
import { Button } from 'antd';
import ClipLoader from 'react-spinners/ClipLoader';
import { connect } from 'react-redux';

import { BASE_URL } from '../constants';
import CommentCard from './CommentCard';

const mapStateToProps = state => {
    return {
        comment_success : state.comment_success
    }
}

class CommentList extends React.Component {
    state = {
        comments : [],
        next : '',
        loading : true,
        error : false
    }

    loadComments = (url, callback) => {
        axios.get(url)
            .then(res => {
                callback(res);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    loading : false,
                    error : true
                })
            });
    }

    handleClick = e => {
        this.setState({
            loading : true
        });

        let url = this.state.next;

        const callback = res => {
            let currentComments = this.state.comments;
            let newComments = res.data.results;
            
            this.setState({
                comments : currentComments.concat(newComments),
                next : res.data.next,
                loading : false
            });
        }

        this.loadComments(url, callback);
    }

    componentDidMount() {
        let url = `${BASE_URL}/api/comments/${this.props.poll}/`;
        
        const callback = res => {
            this.setState({
                comments : res.data.results,
                next : res.data.next,
                loading : false
            });
        }

        this.loadComments(url, callback);
    }

    componentDidUpdate(prevProps) {
        if (this.props.comment_success !== prevProps.comment_success) {
            let url = `${BASE_URL}/api/comments/${this.props.poll}/`;
        
            const callback = res => {
                this.setState({
                    comments : res.data.results,
                    next : res.data.next,
                    loading : false
                });
            }

            this.loadComments(url, callback);
        }
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

        let loadMore = null;
        if (this.state.next) {
            loadMore = (
                <Button ghost type="primary" htmlType="button" onClick={this.handleClick}>
                    Load more
                </Button>
            );
        }
        
        return (
            <div>
                {contents}
                {loadMore}
            </div>
        )
    }
}

export default connect(mapStateToProps)(CommentList);