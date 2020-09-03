import React, { useState } from 'react'
import { Input } from 'antd'

const { Search } = Input;

function SearchFeature(props) {

    const [SearchWord, setSearchWord] = useState("")

    const searchHandler = (event) => {
        setSearchWord(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
            <Search
                placeholder="input search text"
                onChange={searchHandler}
                style={{ width: 200, margin: '2rem auto' }}
                value={SearchWord}
            />
            <br />
        </div>
    )
}

export default SearchFeature
