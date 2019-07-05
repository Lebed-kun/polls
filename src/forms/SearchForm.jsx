import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { withRouter } from 'react-router';
 
import './SearchForm.css';

class SearchForm extends React.Component {
    state = {
        search : ''
    }
    
    handleChange = e => {
        this.setState({
            [e.currentTarget.name] : e.currentTarget.value
        });
    }

    handleSubmit = () => {
        this.props.history.push(`/?search=${this.state.search}`);
    }
    
    render() {
        return (
            <Form layout="inline" className="SearchForm" onSubmit={this.handleSubmit}>
                <Form.Item className="form-item">
                    <Input name="search" onChange={this.handleChange} placeholder="Search" 
                    size="large" style={{fontSize : '1.1rem'}}/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large">
                        <Icon type="search" style={{fontSize : '1.1rem'}}/>
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default withRouter(SearchForm);