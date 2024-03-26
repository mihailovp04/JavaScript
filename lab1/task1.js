//Взять две строки s1 и s2, включающие только буквы от a до z.
//Вернуть новую отсортированную строку, максимально длинную, содержащую различные буквы,
//взятые только один раз - из s1 или s2.
//Конечный строка должна быть отсортирована.
function longest(s1, s2) {
    let uniqueLetters = new Set([...s1, ...s2]);
    let sortedString = [...uniqueLetters].sort().join('');
    return sortedString;
}

let s1 = 'xyaabbbccccdefww';
let s2 = 'xxxxyyyyabklmopq';
let result = longest(s1, s2);
console.log(result);
