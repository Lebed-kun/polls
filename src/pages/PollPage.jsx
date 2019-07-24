import React from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { Row, Col } from 'antd';
 
import { BASE_URL } from '../constants';

import Page from './Page';
import PollCard from '../views/PollCard';
import CommentForm from '../forms/CommentForm';
import CommentList from '../views/CommentList';

import { localize } from '../utils';
 
class PollPage extends React.Component {
    state = {
        poll : null,
        loading : true,
        error : false
    }
    
    componentDidMount() {
        let slug = this.props.match.params.slug;
        
        axios.get(`${BASE_URL}/api/poll/${slug}/`)
            .then(res => {
                this.setState({
                    poll : res.data,
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
        let pageName = "";

        if (this.state.loading) {
            contents = <ClipLoader color="D0AC94" />;
            pageName = localize({
                'ru' : 'Опрос загружается...',
                'en' : 'Loading poll...'
            })
        } else if (this.state.error) {
            contents = <h1 style={{color : 'red'}}>{localize({'ru' : 'Ошибка при загрузке постов', 'en' : 'Error in loading posts'})} :(</h1>;
            pageName = localize({
                'ru' : 'Ошибка',
                'en' : 'Error'
            })
        } else {
            contents = (
                <div style={{margin : '20px'}}>
                    <Row>
                        <Col>
                            <PollCard poll={this.state.poll} type="double" />
                        </Col>
                    </Row>
                    {this.state.poll.allow_comments ? (
                        <div>
                            <CommentForm poll={this.state.poll.slug} />
                            <CommentList poll={this.state.poll.slug} />
                        </div>
                    ) : null}
                </div>
            )
            pageName = this.state.poll.question;
        }
        
        return (
            <Page title={pageName}>
                {contents}
            </Page>
        )
    }
}

export default PollPage;