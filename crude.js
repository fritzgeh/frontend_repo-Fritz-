const express = require ("express")
const app = express.app()

app.get ("./api/items", (req, res) => {
    const data = readDate()
    res.Json(data)
})

app.post("./api/items", (req, res) => {
    const data = readData()
    const newItem = req.body
    newItem.id = data.now()
    data.push(newItem)
    writeData(data)
    res.status(201).json(newItem)
})

app.put("./api/items", (req, res) => {
    const data = readDate()
    const updateItem = req.body
    const itemId = parseInt(req.params.id)
    const itemIndex = data.findIndex(item => item.id === itemId)
    if (itemIndex !== -1) {
        data[itemIndex] = {...data[itemIndex], ...updateItem}
        writeData(data)
        res.json(data[itemIndex])
    } else {
        res.status(404).json({message: "Item not found"})
    }
})

app.delete("/api/items", (req, res ) => {
    const data = readData()
    const itemId = parseInt(req.params.id)
    const newData = data.filter(item => item.id !==itemId)
    if (newData.lenth !== data.legth) {
        writeData(newData)
        res.status(204).end()
    }else {
        res.status(404).Json({message: "Item not found"})
    }
})