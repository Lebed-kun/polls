import React from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { Row, Col } from 'antd';

import Page from './Page';
import PollCard from '../views/PollCard';
 
import { BASE_URL } from '../constants';

class IndexPage extends React.Component {
    state = {
        polls : null,
        next : '',
        loading : true,
        error : false
    }

    componentDidMount() {
        let search = this.props.location.search;

        axios.get(`${BASE_URL}/api/${search}`)
            .then(res => {
                this.setState({
                    polls : res.data.results,
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
            contents = <h1 style={{color : 'red'}}>Error in loading polls :(</h1>;
        } else {
            let search = this.props.location.search;
            let searchHeading = search ? (
                <Col>
                    <h1>Search results for: {search.replace('?search=', '')}</h1>
                </Col>
            ) : null;
            
            contents = (
                <Row gutter={24}>
                    {searchHeading}
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