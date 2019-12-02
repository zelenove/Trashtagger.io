const axios = require("axios")

// Use the user credentials and proxy to the server
axios.defaults.proxy = {
    host: "http://localhost",
    port: "3001"
}
axios.defaults.withCredentials = true