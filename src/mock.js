const Mock = require('mockjs');
const Random = Mock.Random;

const VisionData = function () {
    let number = Random.natural(0, 100);
    let createTime = null;
    let deadTime = null;
    do {
        createTime = Random.date();
        deadTime = Random.date();
    } while (deadTime < createTime);
    let Data = {
        title: Random.title(),
        createTime: createTime,
        deadTime: deadTime,
        number: number,
        fillNumber: Random.natural(0, number),
        type: Random.natural(0, 3),
    };
    return Data;
};

const LoginData = function () {
    let Data = {
        email: Random.email(),
        token: "123133123",
        name: Random.name(),
        state: true
    };
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
            type: Random.natural(1, 4),
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
    };
    return Data;
};

const RegisterData = function () {
    return Random.boolean();
};

const DetailData = function () {
    let radios = [];
    for (let i = 0; i < 5; i++) {
        let choiceA = {
            name: 'RadioA',
            index: i.toString(),
            value: Random.natural(1, 100)
        };
        let choiceB = {
            name: 'RadioB',
            index: i.toString(),
            value: Random.natural(1, 100)
        };
        let choiceC = {
            name: 'RadioC',
            index: i.toString(),
            value: Random.natural(1, 100)
        };
        let choiceD = {
            name: 'RadioD',
            index: i.toString(),
            value: Random.natural(1, 100)
        };
        let multipleA = {
            name: 'MultipleA',
            index: (i + 5).toString(),
            value: Random.natural(1, 100)
        };
        let multipleB = {
            name: 'MultipleB',
            index: (i + 5).toString(),
            value: Random.natural(1, 100)
        };
        let multipleC = {
            name: 'MultipleC',
            index: (i + 5).toString(),
            value: Random.natural(1, 100)
        };
        let multipleD = {
            name: 'MultipleD',
            index: (i + 5).toString(),
            value: Random.natural(1, 100)
        };
        radios.push(choiceA, choiceB, choiceC, choiceD);
        radios.push(multipleA, multipleB, multipleC, multipleD);
    }
    let text = [];
    for (let i = 5; i < 15; i++) {
        let t = {
            name: i.toString(),
            value: Random.natural(1, 100)
        };
        text.push(t);
    }
    let statistic = [];
    for (let i = 15; i < 25; i++) {
        let high = Random.natural(10, 100);
        let low = Random.natural(0, high);
        let medium = Random.natural(low, high);
        let q1 = Random.natural(low, medium);
        let q3 = Random.natural(medium, high);
        let s = {x: i.toString(), low: low, q1: q1, median: medium, q3: q3, high: high};
        statistic.push(s);
    }
    let Data = {
        radios: radios,
        text: text,
        statistic: statistic
    };
    return Data;
};

const VisionListData = function () {
    let questions = [];
    for (let i = 0; i < Random.natural(1, 200); i++) {
        let question = {
            id: Random.natural(0, 10000).toString(),
            title: Random.ctitle()
        };
        questions.push(question);
    }
    let Data = {
        questions: questions
    };
    return Data;
};

Mock.mock('/api/login', 'post', LoginData);
Mock.mock('/api/register', 'post', RegisterData);
Mock.mock('/api/getQuestion', 'post', QuestionData);
Mock.mock('/api/statisticQuestionInfo', 'post', VisionData);
Mock.mock('/api/statisticQuestion', 'post', DetailData);
Mock.mock('/api/visionList', 'post', VisionListData);
