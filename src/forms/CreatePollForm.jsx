import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Checkbox, Icon } from 'antd';

class CreatePollForm extends React.Component {    
    state = {
        nextKey : 1,
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
        if (keys.length === 1) {
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
                console.log(values);
            }
        })
    }
    
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;

        getFieldDecorator('keys', { initialValue : [0] });
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
                })(<Input />)}
                {keys.length > 1 ? (
                    <Icon 
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ))
        
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label="Вопрос: " key="question">
                    {getFieldDecorator('question', {
                        required : true,
                        whitespace : true,
                        message : 'Введите вопрос!'
                    })(<Input />)}
                </Form.Item>

                {formItems}

                <Form.Item key="add_answer">
                    <Button type="default" onClick={this.add}>
                        <Icon type="plus" /> Добавить ответ
                    </Button>
                </Form.Item>

                <Form.Item key="allow_multiple" label="Включить выбор несколько ответов">
                    {getFieldDecorator('allow_multiple', {
                        initialValue : false
                    })(<Checkbox />)}
                </Form.Item>

                <Form.Item key="allow_comment" label="Включить комментарии к опросу">
                    {getFieldDecorator('allow_comments', {
                        initialValue : false
                    })(<Checkbox />)}
                </Form.Item>

                <Form.Item key="submit">
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const CreatePollFormConnect = Form.create({name : 'create_poll'})(CreatePollForm);

export default CreatePollFormConnect;