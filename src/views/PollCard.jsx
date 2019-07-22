import React from 'react';
import { Card, Col } from 'antd';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';
import { connect } from 'react-redux';

import { BASE_URL } from '../constants';

import VoteForm from '../forms/VoteForm';
import AnswersChart from './AnswersChart';

import './PollCard.css';

const mapStateToProps = state => {
    return {
        vote_success : state.vote_success,
        vote_fail : state.vote_fail
    }
}

class PollCard extends React.Component {
    state = {
        answers : null,
        loading : true,
        voted : false,
        error : false
    }

    setAnswers = () => {
        let promise = axios.get(`${BASE_URL}/api/answers/${this.props.poll.slug}/`)
            .then(res => {
                this.setState({
                    answers : res.data,
                    loading : false
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    error : true
                })
            });
        
        return promise;
    }

    componentDidMount() {
        this.setAnswers();

        axios.get(`${BASE_URL}/api/vote/${this.props.poll.slug}/`)
            .then(res => {
                let voted = false;
                if (res.data.length) {
                    voted = true;
                }

                this.setState({
                    voted
                });
            })
    }

    componentDidUpdate(prevProps) {
        let condition = this.props.vote_success !== prevProps.vote_success;
        condition = condition && this.props.vote_success === this.props.poll.slug;
        
        if (condition) {
            this.setAnswers()
                .then(() => {
                    this.setState({voted : true});
                })
        }
    }
    
    render() {  
        let contents = null;

        if (this.state.loading) {
            contents = <BeatLoader color="D0AC94" />;
        } else if (this.state.error) {
            contents = <h1 style={{color: 'red'}}>Error in loading answers :(</h1>;
        } else if (this.state.voted) {
            let date = new Date(this.props.poll.created_at).toLocaleString();
            
            contents = (
                <div>
                    <AnswersChart 
                        poll={this.props.poll}    
                        answers={this.state.answers}
                        type={this.props.type} 
                    />
                    <br />
                    <p style={{fontStyle : 'italic'}}>{date}</p>
                </div>
            );
        } else {
            let date = new Date(this.props.poll.created_at).toLocaleString();

            contents = (
                <div>
                    <VoteForm 
                        poll={this.props.poll}
                        answers={this.state.answers} 
                    />
                    <br />
                    <p style={{fontStyle : 'italic'}}>{date}</p>
                </div>
            );
        }

        let linkToPoll = null;
        if (!this.state.loading && !this.state.error) {
            linkToPoll = (
                <a href={`/poll/${this.props.poll.slug}`}>
                    {this.props.poll.question}
                </a>
            )
        }

        return (
            <Col span={this.props.span || 24} className="PollCard">
                <Card title={linkToPoll} style={{height : '100%'}}>
                    {contents}
                </Card>
            </Col>
        )
    }
}

export default connect(mapStateToProps)(PollCard);
