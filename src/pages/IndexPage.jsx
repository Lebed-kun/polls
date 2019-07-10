import React from 'react';
import axios from 'axios';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import { Row } from 'antd';

import Page from './Page';
import PollCard from '../views/PollCard';
 
import { BASE_URL } from '../constants';

class IndexPage extends React.Component {
    state = {
        polls : null,
        loading : true,
        error : false
    }

    componentDidMount() {
        axios.get(`${BASE_URL}/api/`)
            .then(res => {
                this.setState({
                    polls : res.data.results,
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
            contents = <h1 style={{color : 'red'}}>Error in loading polls :(</h1>;
        } else {
            contents = (
                <Row gutter={24}>
                    {this.state.polls.map((el, id) => (
                        <PollCard key={`poll_${id}`} poll={el} span={6} />
                    ))}
                </Row>
            )
        }
        
        return (
            <Page>
                {contents}
            </Page>
        )
    }
}

export default IndexPage;