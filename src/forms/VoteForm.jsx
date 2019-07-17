import React from 'react';
import { Form, Radio, Checkbox, Button } from 'antd';
import { connect } from 'react-redux';

import { vote } from '../store/actions/actions';

const mapDispatchToProps = dispatch => {
    return {
        vote : (choices, poll) => dispatch(vote(choices, poll))
    }
}

class VoteForm extends React.Component {
    state = {
        choices : []
    }

    handleChange = e => {
        if (this.multiple) {
            this.setState({choices : e});
        } else {
            this.setState({choices : [e.target.value]});
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        
        let choices = this.state.choices;
        if (choices.length > 0) {
            this.props.vote(choices, this.props.poll.slug);
        }
    }

    multiple = false;
    
    render() {
        let options = this.props.answers.map(el => {
            return {
                label : el.answer,
                value : el.id
            }
        });

        let group = <Radio.Group name={`answers_${this.props.poll.question}`} options={options} onChange={this.handleChange} />;
        if (this.props.poll.allow_multiple) {
            group = <Checkbox.Group name={`answers_${this.props.poll.question}`} options={options} onChange={this.handleChange} />;
            this.multiple = true;
        }


        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {group}
                </Form.Item>
    
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Vote!
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default connect(null, mapDispatchToProps)(VoteForm);