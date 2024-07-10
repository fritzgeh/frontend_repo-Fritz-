import React, {useEffect, useState} from react
const e = require("express")
import {getData, postData} from "./api"

const App = () => {
    const [data, setData] = useState([])
    const [input, setInput] = useState("null")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData()
                setData(response.data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [])
}

const handleSubmit = async (e) => {
    e.preventDefault()
    const newData = {produts, priceList}
    try {
        const results = await postData(newData)
        setData([...data, results.data])
    }catch (error) {
        console.error("Error posting data:", error)
    }
}

return (
    <div>
        <h1>Product List</h1>
        {data? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}

        <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter new product" />
            <button type="submit">Add Product</button>
        </form>
    </div>
    )

export default App