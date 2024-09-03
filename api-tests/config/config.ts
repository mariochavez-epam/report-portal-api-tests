module.exports = {
    "local": {
        "BASE_URL": "http://localhost:8080",
        "API_USER": process.env.API_USER,
        "API_PASSWORD": process.env.API_PASSWORD,
        "UI_USER": process.env.UI_USER,
        "UI_PASSWORD": process.env.UI_PASSWORD,
        "PROJECT_NAME": "default_personal"
    },
    "prod": {
        "BASE_URL": "https://rp.epam.com",
        "API_USER": process.env.API_USER,
        "API_PASSWORD": process.env.API_PASSWORD,
        "UI_USER": process.env.UI_USER,
        "UI_PASSWORD": process.env.UI_PASSWORD,
        "PROJECT_NAME": "mario_chavez_personal"
    }
}
