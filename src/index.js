require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const api = require('./api');
const mongoose = require('mongoose')

const port = process.env.PORT || 4000;

router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then (
    (response) => {
        console.log('DB Conn Success')
    }
).catch (e => {
    console.log(e);
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log('heurm server is listening to port' + port);
});