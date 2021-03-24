//4․ Ստեղծել myMap մեթոդ Array-ի համարար , որը կաշխատի ինչպես map մեթոդը. [].map(fn) -ը կարողանանք գրել [].myMap(fn) -ի միջոցով ։

Array.prototype.myMap = function (fn) {
    const arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(fn(this[i], i, this));
    }
    return arr;
};

console.log([1, 2, 3].myMap(function (value, index, array) {
    return value * 2;
}));

console.log([1, 2, 3].map(function (value, index, array) {
    return value * 2;
}));

async function foo() {
    [1, 2, 3].forEach((value, index, array) => {
        new Promise(() => {
            return new Promise(() => 1);
        }).then()
    });
    await Promise.all([1, 2, 3].map(async function (value, index, array) {
        await new Promise(() => 1);
        return value * 2;
    }));
}

foo().catch();
