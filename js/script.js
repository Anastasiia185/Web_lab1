let outputDiv;

function clearOutput() {
    outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
}

function setupConsoleCapture() {
    outputDiv = document.getElementById('output');
    const originalLog = console.log;
    
    console.log = function(...args) {
        originalLog.apply(console, args);
        
        args.forEach(arg => {
            const line = document.createElement('div');
            if (arg === undefined) line.textContent = 'undefined';
            else if (arg === null) line.textContent = 'null';
            else if (typeof arg === 'object') line.textContent = JSON.stringify(arg, null, 2);
            else line.textContent = String(arg);
            outputDiv.appendChild(line);
        });
    };
}

function printTopBorder(title) {
    const width = 70;
    const titleLen = title.length;
    const padding = (width - titleLen) / 2;
    const leftPad = Math.floor(padding);
    const rightPad = width - titleLen - leftPad;
    
    console.log("+" + "-".repeat(width) + "+");
    console.log("+" + " ".repeat(leftPad) + title + " ".repeat(rightPad) + "+");
    console.log("+" + "-".repeat(width) + "+");
}

function printBottomBorder() {
    const width = 70;
    console.log("+" + "-".repeat(width) + "+");
}

function printSeparator() {
    const width = 70;
    console.log("+" + "-".repeat(width) + "+");
}

function printLine(text) {
    console.log(text);
}

//3 
const books = [
    { title: "Майстер і Маргарита", author: "Михайло Булгаков", year: 1967, isRead: true },
    { title: "Кобзар", author: "Тарас Шевченко", year: 1840, isRead: true },
    { title: "Тіні забутих предків", author: "Михайло Коцюбинський", year: 1911, isRead: false },
    { title: "Сто років самотності", author: "Габрієль Гарсія Маркес", year: 1967, isRead: false },
    { title: "1984", author: "Джордж Орвелл", year: 1949, isRead: true },
    { title: "На західному фронті без змін", author: "Еріх Марія Ремарк", year: 1929, isRead: false },
    { title: "Гаррі Поттер і філософський камінь", author: "Дж.К. Роулінг", year: 1997, isRead: true }
];

function printBooksStatus() {
    console.log("");
    printTopBorder(" ЗАВДАННЯ 3: ТРЕКЕР ПРОЧИТАНИХ КНИГ ");
    
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        let status;
        if (book.isRead) {
            status = "[ПРОЧИТАНО]";
        } else {
            status = "[ДО ПРОЧИТАННЯ]";
        }
        const text = status + " \"" + book.title + "\" — " + book.author + " (" + book.year + ")";
        printLine(text);
    }
    
    printSeparator();
    const readCount = books.filter(book => book.isRead).length;
    const unreadCount = books.length - readCount;
    printLine("СТАТИСТИКА: прочитано " + readCount + " з " + books.length + " книг");
    printLine("З них: " + readCount + " прочитано, " + unreadCount + " не прочитано");
    printBottomBorder();
    console.log("");
}

// 6
function generatePassword(options) {
    const { 
        length = 8, 
        includeNumbers = true, 
        includeSymbols = false, 
        includeUppercase = true 
    } = options;
    
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    let chars = lowerCase;
    if (includeUppercase) chars += upperCase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;
    
    if (chars.length === 0) {
        return "ПОМИЛКА: не обрано жодного типу символiв";
    }
    
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    
    return password;
}

function demonstratePasswordGenerator() {
    console.log("");
    printTopBorder(" ЗАВДАННЯ 6: ГЕНЕРАТОР ПАРОЛIВ ");
    
    const testCases = [
        { name: "СТАНДАРТНИЙ (12 символiв)", options: { length: 12, includeNumbers: true, includeSymbols: true, includeUppercase: true } },
        { name: "ЛИШЕ ЛIТЕРИ (10 символiв)", options: { length: 10, includeNumbers: false, includeSymbols: false, includeUppercase: true } },
        { name: "МАЛI ЛIТЕРИ + ЦИФРИ (8 символiв)", options: { length: 8, includeNumbers: true, includeSymbols: false, includeUppercase: false } },
        { name: "ЛИШЕ МАЛI ЛIТЕРИ (6 символiв)", options: { length: 6, includeNumbers: false, includeSymbols: false, includeUppercase: false } },
        { name: "МАКСИМАЛЬНА НАДIЙНIСТЬ (16 символiв)", options: { length: 16, includeNumbers: true, includeSymbols: true, includeUppercase: true } }
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const test = testCases[i];
        const password = generatePassword(test.options);
        const text = test.name + ": " + password + " (довжина: " + password.length + ")";
        printLine(text);
        
        if (i < testCases.length - 1) {
            printSeparator();
        }
    }
    
    printBottomBorder();
    console.log("");
}

// 12
function caesarCipher(str, shift, decrypt = false) {
    let actualShift = decrypt ? -shift : shift;
    actualShift = ((actualShift % 26) + 26) % 26;
    
    let result = "";
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if (char >= 'A' && char <= 'Z') {
            let code = char.charCodeAt(0);
            let newCode = ((code - 65 + actualShift) % 26) + 65;
            result += String.fromCharCode(newCode);
        } 
        else if (char >= 'a' && char <= 'z') {
            let code = char.charCodeAt(0);
            let newCode = ((code - 97 + actualShift) % 26) + 97;
            result += String.fromCharCode(newCode);
        }
        else {
            result += char;
        }
    }
    
    return result;
}

function encryptText() {
    const inputText = document.getElementById('inputText').value;
    const shiftValue = parseInt(document.getElementById('shiftValue').value);
    
    if (!inputText) {
        alert("Введiть текст для шифрування!");
        return;
    }
    
    if (isNaN(shiftValue)) {
        alert("Введiть коректне значення зсуву!");
        return;
    }
    
    const encrypted = caesarCipher(inputText, shiftValue, false);
    const decrypted = caesarCipher(encrypted, shiftValue, true);
    
    clearOutput();
    console.log("");
    printTopBorder(" ШИФРУВАННЯ ЦЕЗАРЯ ");
    printLine("ОРИГIНАЛЬНИЙ ТЕКСТ:");
    printLine("  \"" + inputText + "\"");
    printSeparator();
    printLine("ПАРАМЕТРИ ШИФРУВАННЯ:");
    printLine("  Зсув: " + shiftValue);
    printSeparator();
    printLine("ЗАШИФРОВАНИЙ ТЕКСТ:");
    printLine("  \"" + encrypted + "\"");
    printSeparator();
    printLine("РОЗШИФРОВАНИЙ ТЕКСТ (ПЕРЕВIРКА):");
    printLine("  \"" + decrypted + "\"");
    printSeparator();
    
    if (decrypted === inputText) {
        printLine("СТАТУС: РОЗШИФРУВАННЯ УСПIШНЕ");
    } else {
        printLine("СТАТУС: ПОМИЛКА РОЗШИФРУВАННЯ");
    }
    printBottomBorder();
    console.log("");
}

function runTestExamples() {
    clearOutput();
    console.log("");
    printTopBorder(" ТЕСТОВI ПРИКЛАДИ ШИФРУ ЦЕЗАРЯ ");
    
    const examples = [
        { text: "Hello, World!", shift: 3 },
        { text: "JavaScript is awesome!", shift: 5 },
        { text: "The quick brown fox", shift: 13 },
        { text: "Secret message", shift: 7 }
    ];
    
    for (let i = 0; i < examples.length; i++) {
        const ex = examples[i];
        const encrypted = caesarCipher(ex.text, ex.shift, false);
        const decrypted = caesarCipher(encrypted, ex.shift, true);
        
        printLine("ПРИКЛАД " + (i + 1) + " (зсув " + ex.shift + "):");
        printLine("  Оригiнал:     \"" + ex.text + "\"");
        printLine("  Зашифровано:  \"" + encrypted + "\"");
        printLine("  Розшифровано: \"" + decrypted + "\"");
        
        if (decrypted === ex.text) {
            printLine("  СТАТУС: УСПIШНО");
        }
        
        if (i < examples.length - 1) {
            printSeparator();
        }
    }
    
    printBottomBorder();
    console.log("");
}

function demonstrateCaesarCipher() {
    console.log("");
    printTopBorder(" ЗАВДАННЯ 12: ШИФР ЦЕЗАРЯ ");
    printLine("  ДЛЯ РОБОТИ З ШИФРОМ ВИКОРИСТОВУЙТЕ ПОЛЯ ВВОДУ ВИЩЕ");
    printLine("");
    printLine("  ІНСТРУКЦІЯ:");
    printLine("    1. Введiть текст у текстове поле");
    printLine("    2. Вкажiть зсув (цiле число вiд 1 до 25)");
    printLine("    3. Натиснiть кнопку \"ЗАШИФРУВАТИ\"");
    printLine("");
    printLine("  АБО НАТИСНІТЬ \"ТЕСТОВІ ПРИКЛАДИ\" ДЛЯ ДЕМОНСТРАЦІЇ");
    printBottomBorder();
    console.log("");
}

function runTask3() {
    clearOutput();
    printBooksStatus();
}

function runTask6() {
    clearOutput();
    demonstratePasswordGenerator();
}

function runTask12() {
    clearOutput();
    demonstrateCaesarCipher();
}

function runAllTasks() {   
    printBooksStatus();
    demonstratePasswordGenerator();
    demonstrateCaesarCipher();
    
    console.log("");
    printTopBorder(" ВИКОНАННЯ ЗАВЕРШЕНО ");
    console.log("");
}

window.addEventListener('DOMContentLoaded', () => {
    setupConsoleCapture();
});