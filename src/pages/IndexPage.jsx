import React from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { Row, Col } from 'antd';

import Page from './Page.jsx';
import PollCard from '../views/PollCard.jsx';
 
import { BASE_URL } from '../constants.js';
import { localize } from '../utils';

class IndexPage extends React.Component {
    state = {
        polls : null,
        next : '',
        loading : true,
        error : false
    }

    loadPolls = (url, pollsCallback) => {
        this.setState({loading : true});
        
        axios.get(url)
            .then(res => {
                this.setState({
                    polls : pollsCallback(res.data.results, this.state.polls),
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
            });
    }

    componentDidMount() {
        let search = this.props.location.search;

        this.loadPolls(`${BASE_URL}/api/${search}`, currentPolls => {
            return currentPolls;
        });

        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) > document.body.offsetHeight &&
                this.state.next && !this.state.loading) {
                this.loadPolls(this.state.next, (currentPolls, totalPolls) => {
                    return totalPolls.concat(currentPolls);
                });
            }
        })
    }
    
    render() {
        let contents = null;
 
        if (this.state.loading && !this.state.polls) {
            contents = <ClipLoader color="D0AC94" />;
        } else if (this.state.error) {
            contents = <h1 style={{color : 'red'}}>{localize({'ru' : 'Ошибка при загрузке постов', 'en' : 'Error in loading posts'})} :(</h1>;    
        } else {
            let search = this.props.location.search;
            let searchHeading = search ? (
                <Col>
                    <h1>{localize({'ru' : 'Результаты поиска по', 'en' : 'Search results for'})}: {search.replace('?search=', '')}</h1>
                </Col>
            ) : null;
            
            contents = (
                <Row gutter={24} type="flex" justify="start" style={{margin: '0 20px'}}>
                    {searchHeading}
                    {this.state.polls.map((el, id) => (
                        <PollCard key={`poll_${id}`} poll={el} sm={12} lg={6} />
                    ))}
                </Row>
            );
        }
        
        return (
            <Page>
                {contents}
            </Page>
        )
    }
}

export default IndexPage;