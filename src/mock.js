const Mock = require('mockjs');
const Random = Mock.Random;
// const LoginData = function () {
//     let Data = {
//         "data": {
//             title: Random.ctitle(),
//             content: Random.cparagraph(),
//             createdTime: Random.date()
//         }
//     }
//     return Data;
// }

const LoginData = function () {
    let Data = {
            email: Random.email(),
            token: "123133123",
            name: Random.name(),
            state:true
    }
    return Data;
};

Mock.mock('/api/login', 'post', LoginData);
