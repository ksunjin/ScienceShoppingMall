import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호가 일치하지 않습니다')
        }

        let body = {
            email: Email,
            name: Name,
            password: Password,

        }
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('Error')
                }
            })
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center',
            alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <Form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
                <div style={{
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'center', marginBottom: '3rem'
                }}>
                    <a href="/">Logo</a>
                </div>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input value={Email} onChange={onEmailHandler} />
                </Form.Item>

                <Form.Item
                    name="Name"
                    label={
                        <span>
                            Name&nbsp;
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input type="text" value={Name} onChange={onNameHandler} />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password type="password" value={Password} onChange={onPasswordHandler} />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },

                    ]}
                >
                    <Input.Password type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                </Form.Item>

                <br />
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" onClick={onSubmitHandler}>
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default withRouter(RegisterPage)
