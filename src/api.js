const axios = require ("axios")
const API_URL = "http://localhost:3000/api"

export const getData = async () => {
    try {
        const response = await axios.get(`${API_URL}/data`)
        return response.data
    }catch (error) {
        console.error("Error fetching data:", error)
        throw error
    }
}