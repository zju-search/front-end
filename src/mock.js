const Mock = require('mockjs');
const Random = Mock.Random;

const VisionData = function () {
    // 随机不同的问题
    let questions = [];
    for (let i = 0; i < 10; i++) {
        let question = Random.title();
        questions.push(question);
    }
    //随机不同的答案
    let answers = [];
    let questionTypes = [];
    for (let i = 0; i < 10; i++) {
        let answer = [];
        let questionType = Random.natural(0, 3);
        questionTypes.push(questionType);
        for(let j = 0;j < 10;j ++){
            if (questionType == 0) {
                let choice = Random.natural(0, 3);
                answer.push(choice);
            } else if (questionType == 1) {
                let choice = Random.natural(0, 100);
                answer.push(choice);
            } else if (questionType == 2) {
                let choice = Random.cparagraph();
                answer.push(choice);
            }
        }
        answers.push(answer);
    }
    let Data = {
        title: Random.title(),
        createTime: Random.date(),
        deadTime: Random.date(),
        number: Random.natural(0,100),
        fillNumber: Random.natural(0, 100),
        type: Random.natural(0, 3),
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
            type: Random.natural(5, 5),
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
Mock.mock('/api/statisticQuestionInfo', 'post', VisionData);
