import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { Form, Button, Input } from 'antd';

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')
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
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input type="email" value={Email} onChange={onEmailHandler} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password value={Password} onChange={onPasswordHandler} />
                </Form.Item>
                <br />
                <Form.Item {...tailLayout}>
                    <Button type="primary" onClick={onSubmitHandler}>
                        Sign in
                    </Button>
                </Form.Item>
            </Form>


        </div >

    )
}

export default withRouter(LoginPage)
