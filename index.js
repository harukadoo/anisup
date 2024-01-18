const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UsersModel = require('./models/Users');

const app = express();
const port = 3001
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/anisup');

app.post('/sign-in', (request, response) => {
    const { email, password } = request.body;
    UsersModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    response.json({ status: 'Success', _id: user._id });
                } else {
                    response.json('incorrect password');
                }
            } else {
                response.json('no user existed');
            }
        })
})

app.post('/sign-up-check', (request, response) => {
    const { email } = request.body;
    UsersModel.findOne({ email: email })
        .then(user => {
            if (user) {
                response.json({ exists: true });
            } else {
                response.json({ exists: false });
            }
        })
        .catch(error => {
            console.error("Error checking user existence:", error);
            response.status(500).json({ exists: false });
        });
});

app.post('/', (request, response) => {
    console.log(request.body)
    UsersModel.create(request.body)
        .then(users => {
            console.log(users)
            return response.json(users)
        })
        .catch(error => {
            console.log('error')
            return response.json(error)
        })
})

app.listen(process.env.PORT || port, () => {
    console.log(`Listening on port ${port}`)
})



// const port = 5000;

// //обробка помилок cors
// app.use((request, response, next) => {
//     response.header('Access-Control-Allow-Origin', '*');
//     response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next()
// });

//запрос на сервер api myanimelist
// app.get('/search', async (req, res) => {
//     try {
//         const { q } = req.query;
//         const apiKey = 'd2c5c7821a48fd6f0535b60e0a1fe02b';

//         const response = await axios.get(`https://api.myanimelist.net/v2/anime?q=${q}&limit=1`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`
//             }
//         });

//         res.json(response.data);

//     } catch (error) {
//         console.error('Помилка при запиті к API:', error);
//         res.status(500).json({ error: 'Помилка при запиті к API' });
//     }
// });

// app.get('/search', async (req, res) => {
//     try {
//         const { q } = req.query;

//         const response = await axios.get(`https://api.jikan.moe/v4/search/anime?q=${q}`);

//         res.json(response.data);
//     } catch (error) {
//         console.error('Ошибка при запросе к API:', error);
//         res.status(500).json({ error: 'Ошибка при запросе к API' });
//     }
// });

// app.listen(port, () => {
//     console.log(`Сервер запустився на порту ${port}`);
// });