import React from 'react';
import { Form, Radio, Checkbox, Button } from 'antd';
import { connect } from 'react-redux';

import { vote } from '../store/actions/actions';

import { localize } from '../utils';

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

        let style = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            marginLeft : '8px'
        }

        let group = (
            <Radio.Group name={`answers_${this.props.poll.question}`} onChange={this.handleChange}>
                {options.map((el, id) => (
                    <Radio value={el.value} 
                        style={style}
                        key={`${this.props.poll.question}_${id}`}
                    >
                        {el.label}
                    </Radio>
                ))}
            </Radio.Group>
        );
        if (this.props.poll.allow_multiple) {
            group = (
                <Checkbox.Group name={`answers_${this.props.poll.question}`} onChange={this.handleChange}>
                    {options.map((el, id) => (
                        <Checkbox value={el.value}
                            style={style}
                            key={`${this.props.poll.question}_${id}`}  
                        >
                            {el.label}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            )
            this.multiple = true;
        }


        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {group}
                </Form.Item>
    
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {localize({'ru' : 'Голосовать!', 'en' : 'Vote!'})}
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

export default connect(null, mapDispatchToProps)(VoteForm);