const express = require ("express")
const fs = require ("fs")
const bodyParser = require("body-parser")

const app = express()

const PORT = 3000

app.use(bodyParser.json())

const DataFile = "./data.json"

const readData = () => {
    const data = fs.readFilesync(DataFile)
    return JSON.parse(data)
}

const writeData = (data) => {
    fs.writeFileSync(DataFile, JSON.stringify(data, null, 2))
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})