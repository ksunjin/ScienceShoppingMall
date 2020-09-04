import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItems } from '../../../_actions/user_action';
import UserCartCard from './Sections/UserCartCard';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Typography, Empty } from 'antd'


const { Title } = Typography;

function CartDetail(props) {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)

    useEffect(() => {

        let cartItems = []

        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })

                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then(response => { calculateTotal(response.payload) })
            }
        }


    }, [props.user.userData])


    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        })

        setTotal(total)
        setShowTotal(true)

    }

    const removeFromCart = (productId) => {
        dispatch(removeCartItems(productId))
            .then(response => {
                if (response.payload.productInfo.length <= 0) {
                    setShowTotal(false)
                }
            })
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>

            <Title level={2} style={{ textAlign: 'center' }}>장바구니<ShoppingCartOutlined /></Title>

            <UserCartCard products={props.user.cartDetail} removeItem={removeFromCart} />

            {ShowTotal ?
                <div style={{ marginTop: '3rem' }}>
                    <Title level={2} type="secondary">Total: ${Total}</Title>
                </div>
                :
                <>
                    <br />
                    <Empty description={false} />
                    <Title level={3} style={{ textAlign: 'center' }}>No Item</Title>
                </>
            }
        </div>
    )
}

export default CartDetail
