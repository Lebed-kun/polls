import React from 'react';
import { Card, Col } from 'antd';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';

import { BASE_URL } from '../constants';

class PollCard extends React.Component {
    state = {
        answers : null,
        loading : true,
        voted : false,
        error : false
    }

    componentDidMount() {
        axios.get(`${BASE_URL}/api/answers/${this.props.poll.slug}`)
            .then(res => {
                this.setState({
                    answers : res.data
                })
            })
            .catch(err => {
                this.setState({
                    error : true
                })
            })

        axios.get(`${BASE_URL}/api/vote/${this.props.poll.slug}/`)
            .then(res => {
                let voted = false;
                if (res.length) {
                    voted = true;
                }

                this.setState({
                    voted
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    render() {
        let contents = null;
        if (this.state.loading) {
            contents = <BeatLoader color="D0AC94" />;
        } else if (this.state.error) {
            contents = <h1 style={{color: 'red'}}>Error in loading answers :(</h1>;
        } else if (this.state.voted) {
            // TO DO : chart view
            contents = null;
        } else {
            // TO DO : poll voting form
            contents = null;
        }

        return (
            <Col span="6">
                <Card title={this.props.poll.question}>
                    {contents}
                </Card>
            </Col>
        )
    }
}

export default PollCard;
