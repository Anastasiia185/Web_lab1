console.log("START - Лабораторна робота №11");

const users = [
 { 
 name: "Олексій", 
 age: 20, 
 city: "Харків", 
 colors: ["червоний", "чорний"], 
 isStudent: true, 
 grades: [85, 90, 92, 88] 
 },
 { 
 name: "Марія", 
 age: 19, 
 city: "Київ", 
 colors: ["зелений", "жовтий"], 
 isStudent: true, 
 grades: [60, 75, 68, 72] 
 },
 { 
 name: "Іван", 
 age: 22, 
 city: "Львів", 
 colors: ["синій", "білий"], 
 isStudent: false, 
 grades: [40, 55, 50, 48] 
 }
];

const getAverage = (gradesArr) => {
 if (gradesArr.length === 0) 
 return 0;
 let sum = 0;
 for (const grade of gradesArr) {
 sum += grade;
 }
 
 return sum / gradesArr.length;
};

const getStatus = (average) => {
 if (average >= 90) 
 return "Відмінно";
 if (average >= 75) 
 return "Добре";
 if (average >= 60) 
 return "Задовільно";
 return "Незадовільно (Потрібна перездача)";
};

console.log("=== ЗВІТ ПО СТУДЕНТАХ ===");
for (const user of users) {

 const avgGrade = getAverage(user.grades);
 const status = getStatus(avgGrade);
 
 const favColors = user.colors.join(", ");
 
 const studentInfo = user.isStudent ? "Діючий студент" : "Випускник/Гість";

 console.log(`Ім'я: ${user.name} (${user.city})`);
 console.log(`Статус: ${studentInfo}`);
 console.log(`Улюблені кольори: ${favColors}`);
 console.log(`Середній бал: ${avgGrade.toFixed(1)} - ${status}`);
 console.log("-----------------------------");
}

// ЗАВДАННЯ 3 
const books = [
    { title: "Майстер і Маргарита", author: "Михайло Булгаков", year: 1967, isRead: true },
    { title: "Кобзар", author: "Тарас Шевченко", year: 1840, isRead: true },
    { title: "Тіні забутих предків", author: "Михайло Коцюбинський", year: 1911, isRead: false },
    { title: "Сто років самотності", author: "Габрієль Гарсія Маркес", year: 1967, isRead: false },
    { title: "1984", author: "Джордж Орвелл", year: 1949, isRead: true }
];

console.log("\n========== ЗАВДАННЯ 3: ТРЕКЕР ПРОЧИТАНИХ КНИГ ==========");

for (let i = 0; i < books.length; i++) {
    const book = books[i];
    if (book.isRead) {
        console.log("[ПРОЧИТАНО] \"" + book.title + "\" — " + book.author + " (" + book.year + ")");
    } else {
        console.log("[ДО ПРОЧИТАННЯ] \"" + book.title + "\" — " + book.author + " (" + book.year + ")");
    }
}

const readCount = books.filter(book => book.isRead).length;
console.log("СТАТИСТИКА: прочитано " + readCount + " з " + books.length + " книг");

// ЗАВДАННЯ 6 
console.log("\n========== ЗАВДАННЯ 6: ГЕНЕРАТОР ПАРОЛIВ ==========");

function generatePassword(options) {
    const { length = 8, includeNumbers = true, includeSymbols = false, includeUppercase = true } = options;
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()";
    
    let chars = lower;
    if (includeUppercase) chars += upper;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}

console.log("СТАНДАРТНИЙ (12): " + generatePassword({ length: 12, includeNumbers: true, includeSymbols: true, includeUppercase: true }));
console.log("ЛИШЕ ЛIТЕРИ (10): " + generatePassword({ length: 10, includeNumbers: false, includeSymbols: false, includeUppercase: true }));
console.log("МАЛI ЛIТЕРИ (8): " + generatePassword({ length: 8, includeNumbers: false, includeSymbols: false, includeUppercase: false }));

//  ЗАВДАННЯ 12 
console.log("\n========== ЗАВДАННЯ 12: ШИФР ЦЕЗАРЯ ==========");

function caesarCipher(str, shift, decrypt = false) {
    let actualShift = decrypt ? -shift : shift;
    actualShift = ((actualShift % 26) + 26) % 26;
    let result = "";
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char >= 'A' && char <= 'Z') {
            let newCode = ((char.charCodeAt(0) - 65 + actualShift) % 26) + 65;
            result += String.fromCharCode(newCode);
        } else if (char >= 'a' && char <= 'z') {
            let newCode = ((char.charCodeAt(0) - 97 + actualShift) % 26) + 97;
            result += String.fromCharCode(newCode);
        } else {
            result += char;
        }
    }
    return result;
}

const original = "Secret message!";
const encrypted = caesarCipher(original, 7);
const decrypted = caesarCipher(encrypted, 7, true);

console.log("Оригінал: " + original);
console.log("Зашифровано (зсув 7): " + encrypted);
console.log("Розшифровано: " + decrypted);

console.log("\n✅ ВИКОНАННЯ ЗАВЕРШЕНО");