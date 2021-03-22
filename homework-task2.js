//2. Գրել ծրագիր որ նախորդ առաջադրանքի կողմից ստեղծված ֆայլ կանվանափոխի այդ պահի ամիս,
// օր, ժամ, րոպեով, վայրկյանով (Օրինակ 10_11_15_32_13.txt):
const fs = require('fs');
const os = require('os');

const fileName = os.userInfo().username + '.json';
const dateNow = new Date();

fs.rename(fileName, dateNow.getHours() + '_' + dateNow.getMinutes() + '.txt', (err) => {
    if (err) {
        return;
    }

    console.log('done');
});
