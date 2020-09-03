import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../../utils/FileUpload';
import Axios from 'axios';


const { Title } = Typography;
const { TextArea } = Input;

const Choices = [
    { key: 1, value: "option1" },
    { key: 2, value: "option2" },
    { key: 3, value: "option3" },
    { key: 4, value: "option4" },
    { key: 5, value: "option5" },
    { key: 6, value: "option6" }
]

function UploadProductPage(props) {

    const [Name, setName] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Choice, setChoice] = useState(1)
    const [Images, setImages] = useState([])

    const nameChangeHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const choiceChangeHandler = (event) => {
        setChoice(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Name || !Description || !Price || !Choice || !Images.length === 0) {
            return alert("모든 값을 채워주어야 합니다")
        }

        const body = {
            writer: props.user.userData._id,
            name: Name,
            description: Description,
            price: Price,
            images: Images,
            choice: Choice
        }

        Axios.post('/api/product', body)
            .then(response => {
                if (response.data.success) {
                    alert('상품 업로드 성공.')
                    props.history.push('/')
                } else {
                    alert('상품 업로드 실패.')
                }
            })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>상품 업로드</Title>
            </div>

            <Form onSubmit={submitHandler}>
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>이름</label>
                <Input onChange={nameChangeHandler} value={Name} />
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>가격($)</label>
                <Input onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={choiceChangeHandler} value={Choice}>
                    {Choices.map(item => (
                        <option key={item.key} value={item.value}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />

                <Button type="submit" onClick={submitHandler}>
                    확인
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
