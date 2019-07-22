import React from 'react';
import { Form, Button, Input, Checkbox, Icon,
    Card } from 'antd';
import { withRouter } from 'react-router';

import { createPoll, cleanArray, generateArray } from '../utils';
import { MAX_ANSWERS, MIN_ANSWERS } from '../constants';

class CreatePollForm extends React.Component {    
    state = {
        nextKey : MIN_ANSWERS,
    }

    add = () => {
        const { form } = this.props;
        
        const keys = form.getFieldValue('keys');
        let nextKey = this.state.nextKey;
        const nextKeys = keys.concat(nextKey++);
        this.setState({nextKey});

        form.setFieldsValue({
            keys : nextKeys
        });
    }

    remove = key => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === MIN_ANSWERS) {
            return;
        }
        
        form.setFieldsValue({
            keys : keys.filter(k => k !== key)
        });
    } 

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.answers = cleanArray(values.answers);
                createPoll(values).then(res => {
                    this.props.history.push('/');
                }).catch(error => {
                    console.log(error);
                })
            }
        })
    }
    
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;

        getFieldDecorator('keys', { 
            initialValue : generateArray(key => key, MIN_ANSWERS)
        });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, id) => (
            <Form.Item 
                label={id === 0 ? 'Ответы: ' : ''}
                required={false}
                key={`answr_${k}`}    
            >
                {getFieldDecorator(`answers[${k}]`, {
                    rules : [
                        {
                            required : true,
                            whitespace : true,
                            message : 'Введите ответ!'
                        }
                    ]
                })(<Input style={{width : 'calc(100% - 20px - 8px)', marginRight : '8px'}} />)}
                {keys.length > 2 ? (
                    <Icon 
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                        style={{fontSize : '20px'}}
                        title="Удалить ответ"
                    />
                ) : null}
            </Form.Item>
        ))
        
        return (
            <Card style={{margin : '20px'}}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Вопрос: " key="question">
                        {getFieldDecorator('question', {
                            required : true,
                            whitespace : true,
                            message : 'Введите вопрос!'
                        })(<Input style={{width : 'calc(100% - 20px - 8px)'}} />)}
                    </Form.Item>

                    {formItems}

                    <Form.Item key="add_answer">
                        {keys.length < MAX_ANSWERS ? (
                            <Button type="default" onClick={this.add}>
                                <Icon type="plus" /> Добавить ответ
                            </Button>
                        ) : null}
                    </Form.Item>

                    <Form.Item key="allow_multiple">
                        Включить выбор несколько ответов
                        {getFieldDecorator('allow_multiple', {
                            initialValue : false
                        })(<Checkbox style={{marginLeft : '10px'}} />)}
                    </Form.Item>

                    <Form.Item key="allow_comment">
                        Включить комментарии к опросу
                        {getFieldDecorator('allow_comments', {
                            initialValue : false
                        })(<Checkbox style={{marginLeft : '10px'}} />)}
                    </Form.Item>

                    <Form.Item key="submit">
                        <Button type="primary" htmlType="submit">
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

const CreatePollFormConnect = Form.create({name : 'create_poll'})(CreatePollForm);

export default withRouter(CreatePollFormConnect);