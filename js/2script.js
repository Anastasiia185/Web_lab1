document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

/*Основне*/
const form = document.querySelector('#todo-form');
const input = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    if (!taskList) return;
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        
        if (task.completed) {
            li.style.textDecoration = 'line-through';
            li.style.color = '#888';
        }
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Видалити';
        deleteBtn.dataset.index = index;
        
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = input.value.trim();
        
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            input.value = '';
            renderTasks();
        }
    });
}

if (taskList) {
    taskList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;

        const index = Array.from(taskList.children).indexOf(li);

        if (e.target.tagName === 'BUTTON') {
            tasks.splice(index, 1);
        } 
        else if (e.target === li || e.target.tagName === 'LI') {
            tasks[index].completed = !tasks[index].completed;
        }
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    });
}

renderTasks();

/*3*/
const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesList = document.getElementById('notes-list');
let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes() {
    if (!notesList) return;
    notesList.innerHTML = '';
    
    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.innerHTML = `
            <p>${escapeHtml(note.text)}</p>
            <button data-index="${index}">🗑 Видалити</button>
        `;
        notesList.appendChild(noteCard);
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

if (addNoteBtn) {
    addNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        
        if (noteText !== '') {
            notes.push({ text: noteText });
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            renderNotes();
        }
    });
}

if (notesList) {
    notesList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = parseInt(e.target.dataset.index);
            notes.splice(index, 1);
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes();
        }
    });
}

renderNotes();

/*6*/
const ingredientInput = document.getElementById('ingredient-input');
const searchBtn = document.getElementById('search-btn');
const recipesResult = document.getElementById('recipes-result');

async function searchRecipesByIngredient(ingredient) {
    if (!recipesResult) return;
    
    recipesResult.innerHTML = '<div class="loading">🔍 Пошук рецептів...</div>';
    
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        
        if (data.meals === null) {
            recipesResult.innerHTML = `<div class="error">Рецепти з інгредієнтом "${ingredient}" не знайдено</div>`;
            return;
        }
        
        recipesResult.innerHTML = `
            <div class="recipes-grid">
                ${data.meals.map(meal => `
                    <div class="recipe-card" data-id="${meal.idMeal}">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <h4>${meal.strMeal}</h4>
                    </div>
                `).join('')}
            </div>
        `;
        
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', async () => {
                const mealId = card.dataset.id;
                await getRecipeDetails(mealId);
            });
        });
        
    } catch (error) {
        console.error('Помилка API:', error);
        recipesResult.innerHTML = '<div class="error">Помилка завантаження даних. Перевірте з\'єднання.</div>';
    }
}

async function getRecipeDetails(mealId) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        
        if (data.meals && data.meals[0]) {
            const meal = data.meals[0];
            alert(`🍽 ${meal.strMeal}\n\nКатегорія: ${meal.strCategory || 'Невідомо'}\nРегіон: ${meal.strArea || 'Невідомо'}\n\nІнструкція:\n${meal.strInstructions?.substring(0, 200)}...`);
        }
    } catch (error) {
        console.error('Помилка отримання деталей:', error);
    }
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        const ingredient = ingredientInput.value.trim();
        if (ingredient !== '') {
            searchRecipesByIngredient(ingredient);
        } else {
            alert('Введіть назву інгредієнта!');
        }
    });
}

if (ingredientInput) {
    ingredientInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
}

/*12*/
let timerInterval = null;
let timerMinutes = 0;
let timerSeconds = 10;
let isRunning = false;

const timerMinutesSpan = document.getElementById('timer-minutes');
const timerSecondsSpan = document.getElementById('timer-seconds');
const timerStartBtn = document.getElementById('timer-start');
const timerPauseBtn = document.getElementById('timer-pause');
const timerResetBtn = document.getElementById('timer-reset');
const timerMessageDiv = document.getElementById('timer-message');

function updateTimerDisplay() {
    if (timerMinutesSpan) timerMinutesSpan.textContent = String(timerMinutes).padStart(2, '0');
    if (timerSecondsSpan) timerSecondsSpan.textContent = String(timerSeconds).padStart(2, '0');
}

function formatTime() {
    return `${String(timerMinutes).padStart(2, '0')}:${String(timerSeconds).padStart(2, '0')}`;
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isRunning = false;
}

function startTimer() {
    if (isRunning) return;
    
    if (timerMinutes === 0 && timerSeconds === 0) {
        resetTimer();
    }
    
    isRunning = true;
    timerInterval = setInterval(() => {
        if (timerSeconds === 0) {
            if (timerMinutes === 0) {
                stopTimer();
                if (timerMessageDiv) {
                    timerMessageDiv.textContent = '⏰ Час відпочити!';
                    timerMessageDiv.style.color = '#e74c3c';
                }
                alert('Час відпочити!');
                return;
            }
            timerMinutes--;
            timerSeconds = 59;
        } else {
            timerSeconds--;
        }
        
        updateTimerDisplay();
    }, 1000);
}

function resetTimer() {
    stopTimer();
    timerMinutes = 0;
    timerSeconds = 10;
    updateTimerDisplay();
    if (timerMessageDiv) timerMessageDiv.textContent = '';
}

if (timerStartBtn) {
    timerStartBtn.addEventListener('click', startTimer);
}

if (timerPauseBtn) {
    timerPauseBtn.addEventListener('click', stopTimer);
}

if (timerResetBtn) {
    timerResetBtn.addEventListener('click', resetTimer);
}

updateTimerDisplay();

document.addEventListener('visibilitychange', () => {
  if (document.hidden && timerInterval) {
    stopTimer();
  }
});
