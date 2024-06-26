const mongoDB = require('./db');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors(
    {
        origin: ["https://go-food-mern-app-frontend.vercel.app"],
        methods: ["POST","GET"],
        credentials: true
    }
    ));

mongoDB((err, data, CatData) => {
    global.foodData = data;
    global.foodCategory = CatData;
});

app.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
