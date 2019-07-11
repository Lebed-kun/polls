import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Row, Col } from 'antd';
 
import { postComment } from '../store/actions/actions';

const { TextArea } = Input;

const mapStateToProps = state => {
    return {
        comment_success : state.comment_success
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postComment : (comment, poll) => dispatch(postComment(comment, poll))
    }
}

class CommentForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.postComment(values, this.props.poll);
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.comment_success !== prevProps.comment_success) {
            this.props.form.resetFields();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label="Имя">
                            {getFieldDecorator('name', {
                                initialValue : ''
                            })(<Input />)}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="E-mail">
                           {getFieldDecorator('email', {
                               rules : [
                                   {
                                       type : 'email',
                                       message : 'Некорректно введенный e-mail!'
                                   }
                               ],
                               initialValue : ''
                           })(<Input />)} 
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Сообщение">
                    {getFieldDecorator('text', {
                        rules : [
                            {
                                required : true,
                                message : 'Введите текст сообщения!'
                            }
                        ],
                        initialValue : ''
                    })(<TextArea />)}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Отправить
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const CommentFormConnect = Form.create({ name : 'comment' })(CommentForm);

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormConnect);
