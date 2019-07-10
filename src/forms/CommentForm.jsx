import React from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Row, Col } from 'antd';
 
import { postComment } from '../store/actions';

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
    state = {
        name : '',
        email : '',
        text : ''
    }

    handleSubmit = e => {
        e.preventDefault();

    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label="Имя">
                            <Input />
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
                               ]
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
                        ]
                    })(<TextArea />)}
                </Form.Item>
            </Form>
        );
    }
}

const CommentFormConnect = Form.create({ name : 'comment' })(CommentForm);

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormConnect);

