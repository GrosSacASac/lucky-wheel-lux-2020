export { helpText, badGuyId, scenarios };


const helpText = ``;

const badGuyId = `10`;

const oranges = {
    tips: [
        `There isn't a fruit without sugar`,
        `Every orange is a fruit`,
    ],
    answer: 2,
    proposals: [
        `There is no sugared plant that is not a fruit`,
        `All fruits containing sugar are oranges`,
        `Every orange contains sugar`,
        `No other response`,
        
    ],
};

const FindTheLyer = {
    tips: [
        `Tom: Jasmine eats more chocolate than David `,
        `Jasmine: Tom eats half of the chocloate amount that David eats`,
        `Laura: Tom eats more chocalate than Jasmine`,
        `David: Laura eats less chocolate than Tom and Jasmine is the biggest chocolate eater`,
    ],
    answer: 3,
    proposals: [
        `Tom is lying`,
        `Jasmine is lying`,
        `David is lying`,
        `Laura is lying`,
    ],
};


const scenarios = [
    oranges,
    FindTheLyer,
];
