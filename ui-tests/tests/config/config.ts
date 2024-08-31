module.exports = {
    "local": {
        "BASE_URL": "localhost:8080",
        "API_USER": process.env.API_USER,
        "API_PASSWORD": process.env.API_PASSWORD,
        "UI_USER": process.env.UI_USER,
        "UI_PASSWORD": process.env.UI_PASSWORD,
    },
    "prod": {
        "BASE_URL": "https://rp.epam.com",
        "API_USER": process.env.API_USER,
        "API_PASSWORD": process.env.API_PASSWORD,
        "UI_USER": process.env.UI_USER,
        "UI_PASSWORD": process.env.UI_PASSWORD,
    }
}
