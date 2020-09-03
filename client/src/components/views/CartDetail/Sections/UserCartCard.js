import React from 'react'
import { Typography, Button } from 'antd';
import "./UserCartCard.css"

const { Title } = Typography;

function UserCartCard(props) {

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <img style={{ width: '70px' }} alt="product"
                        src={renderCartImage(product.images)} />
                </td>
                <td>
                    {product.quantity} EA
                </td>
                <td>
                    $ {product.price}
                </td>
                <td>
                    <Button onClick={() => props.removeItem(product._id)}>
                        remove
                    </Button>
                </td>
            </tr>
        ))
    )


    return (
        <div style={{ marginTop: '3rem' }}>
            <table>
                <thead>
                    <tr>
                        <th>상품</th>
                        <th>수량</th>
                        <th>가격</th>
                        <th>삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCartCard