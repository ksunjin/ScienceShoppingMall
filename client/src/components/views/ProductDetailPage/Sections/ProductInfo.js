import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Button, Descriptions } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_action';
import { Form, Input } from 'antd';

function ProductInfo(props) {
    const user = useSelector(state => state.user)
    const [Quantity, setQuantity] = useState(0)

    const dispatch = useDispatch();

    const onQuantityHandler = (event) => {
        setQuantity(event.currentTarget.value)
    }

    const cartHandler = () => {
        dispatch(addToCart(props.detail._id, Quantity))
    }

    if (user.userData && user.userData.role === 0) { //관리자 화면
        return (
            <div>
                <Descriptions title="Product Info" layout="vertical">
                    <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                    <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                    <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                    <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
                </Descriptions>

                <br />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button style={{ marginRight: '3rem'}} type="danger">
                        Edit
                    </Button>
                    <Button type="danger">
                        Remove
                    </Button>
                </div>
            </div> 
        )

    } else {
        return ( //일반 사용자 화면
            <div>
                <Descriptions title="Product Info" layout="vertical">
                    <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                    <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                    <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                    <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
                </Descriptions>

            <br />
        
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form>
                        <Form.Item label="수량">
                            <Form.Item name="input-number" noStyle>
                                <Input type="number" min={1} max={10} value={Quantity} defaultValue={1} onChange={onQuantityHandler} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item>
                            <Button size="large" type="danger" onClick={cartHandler}>
                                Add to Cart
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>
        )
    }
    
}

export default ProductInfo
