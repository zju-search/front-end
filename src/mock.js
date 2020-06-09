const Mock = require('mockjs');
const Random = Mock.Random;

const VisionData = function () {
    let questions = [];
    let answers = [];
    let questionTypes = [];
    for(let i=0;i<10;i++)
    {
        let question = {
            title: Random.title(),
            type: Random.natural(5, 5),
            choices: choices
        };
        questions.push(question);
        let answer = {
            title: Random.title(),
            type: Random.natural(5, 5),
            choices: choices
        };
        answers.push(answer);
        let questionType = {
            type: Random.natural(5, 5),
        }
        questionTypes.push(questionType);
    }
    let Data = {
        title: Random.title(),
        createTime: Random.createTime(),
        deadTime: Random.deadTime(),
        number: Random.number(),
        fillNumber: Random.fillNumber(),
        type: Random.natural(5, 5),
        questions: questions,
        answers: answers,
        questionTypes: questionTypes
    }
    return Data;
}

const LoginData = function () {
    let Data = {
        email: Random.email(),
        token: "123133123",
        name: Random.name(),
        state: true
    }
    return Data;
};

const QuestionData = function () {
    let questions = [];
    for (let i = 0; i < 10; i++) {
        let choices = [];
        for (let j = 0; j < 4; j++) {
            let choice = Random.csentence();
            choices.push(choice);
        }
        let question = {
            title: Random.title(),
            type: Random.natural(5,5),
            choices: choices
        };
        questions.push(question);
    }
    let Data = {
        id: Random.natural(0, 800),
        title: Random.ctitle(),
        content: Random.csentence(),
        createTime: Random.date(),
        deadTime: Random.date(),
        email: Random.email(),
        questions: questions
    }
    return Data;
};

const RegisterData = function () {
    return Random.boolean();
};

Mock.mock('/api/login', 'post', LoginData);
Mock.mock('/api/register', 'post', RegisterData);
Mock.mock('/api/getQuestion', 'post', QuestionData);
Mock.mock('/api/vision', 'post', VisionData);
