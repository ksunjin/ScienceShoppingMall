/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../../config.js';
import { withRouter } from 'react-router-dom';
import DrawerMenu from '../../../../utils/DrawerMenu';
import { useSelector } from "react-redux";
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

function RightMenu(props) {
    const user = useSelector(state => state.user)

    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert('Log Out Failed')
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">Signin</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">Signup</a>
                </Menu.Item>
            </Menu>
        )
    } else if (user.userData && user.userData.role === 0) { //관리자 화면
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="upload">
                    <a href="/product/upload">Upload</a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        )

    } else {
        return ( //일반 사용자 화면
            <Menu mode={props.mode}>
                <Menu.Item key="cart" >
                    <Badge style={{ marginLeft: -22, marginTop: 10, verticalAlign: 'bottom', display: 'block' }}>
                        <a href="/user/cart" style={{ marginLeft: -22, marginRight: -22, color: '#667777' }}>
                            <ShoppingCartOutlined style={{ fontSize: 30, marginTop: 15 }} />
                        </a>
                    </Badge>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>

            </Menu >
        )
    }
}

export default withRouter(RightMenu);