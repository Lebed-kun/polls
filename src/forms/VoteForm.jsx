import React from 'react';
import { Form, Radio, Checkbox, Button } from 'antd';
import { connect } from 'react-redux';

import { vote } from '../store/actions/actions';

const mapStateToProps = state => {
    return {
        vote_success : state.vote_success,
        vote_fail : state.vote_fail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        vote : choices => dispatch(vote(choices))
    }
}

function VoteForm(props) {
    let options = props.answers.map(el => {
        return {
            label : el.answer,
            value : el.id
        }
    });

    let group = <Radio.Group name={`answers_${props.poll.question}`} options={options} />;
    if (props.poll.allow_multiple) {
        group = <Checkbox.Group name={`answers_${props.poll.question}`} options={options} />
    }

    return (
        <Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(VoteForm);