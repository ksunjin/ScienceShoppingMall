import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Typography, Button, Card, Col, Row, Drawer } from 'antd';
import { BulbOutlined, MenuOutlined } from '@ant-design/icons';
import DrawerMenu from '../../../utils/DrawerMenu';
import ImageSlider from '../../../utils/ImageSlider';
import SearchFeature from './Sections/SearchFeature';

const { Title } = Typography;

function LandingPage(props) {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [SearchWord, setSearchWord] = useState("")
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };


    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.more) {
                        setProducts([...Products, ...response.data.productInfo])
                        console.log(...response.data.productInfo)
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.PostSize)
                }
                else {
                    alert("상품 로딩 실패")
                }
            })
    }

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body)

    }, [])

    const updateSearchWord = (newSearchWord) => {

        let body = {
            skip: 0,
            limit: Limit,
            searchWord: newSearchWord
        }

        setSkip(0)
        setSearchWord(newSearchWord)
        getProducts(body)
    }

    const renderCards = Products.map((product, index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <Card cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>}
                >
                    <Card.Meta
                        title={product.name}
                        description={`$${product.price}`}
                    />
                </Card>
            </Col>
        )

    })

    const moreHandler = () => {

        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            more: true
        }

        getProducts(body)
        setSkip(skip)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ width: '100px', margin: '3rem auto', justifyContent: 'center', display: 'flex' }}>
                <a href="/">Logo</a>
            </div>
            <div style={{ textAlign: 'center', margin: '3rem auto' }}>
                <Title level={2}>전체 상품 <BulbOutlined /></Title>
            </div>

            <DrawerMenu />

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <SearchFeature
                    refreshFunction={updateSearchWord}
                />
            </div>

            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>


            <br />
            <br />

            {
                PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={moreHandler}>
                        더보기
                </Button>
                </div>
            }


        </div >
    )
}


export default withRouter(LandingPage)
