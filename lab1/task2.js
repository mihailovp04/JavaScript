//Напишите функцию, которая возвращает true , если две переданные строки являются анаграммами друг друга,
// и false в противном случае. Анаграммы регистронезависимы.
//Анаграмма - это слово или фраза, образованная путем перестановки букв другого слова или фразы,
//используя все исходные буквы ровно один раз.
function areAnagrams(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    if (str1.length !== str2.length) {
        return false;
    }

    let charCount1 = {};
    let charCount2 = {};

    for (let char of str1) {
        charCount1[char] = (charCount1[char] || 0) + 1;
    }
    for (let char of str2) {
        charCount2[char] = (charCount2[char] || 0) + 1;
    }

    for (let char in charCount1) {
        if (charCount1[char] !== charCount2[char]) {
            return false;
        }
    }

    return true;
}

let str1 = "foefet";
let str2 = "toffee";
let result = areAnagrams(str1, str2);
console.log(result);
