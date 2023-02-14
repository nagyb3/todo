const newCategoryButton = document.querySelector('button.newcategory');
const newTodoButton = document.querySelector('button.add');
let allTodo = [];
let allCategory = ['Default'];
const formTodo = document.querySelector('form.myform');
const cardsContainer = document.querySelector('.cards-container');
const formCategory = document.querySelector('form.new-category');
const categoryContainer = document.querySelector('.sidebar > .container');
const formTodoDiv = document.querySelector('div.newtodo');
const formCategoryDiv = document.querySelector('.new-category-form')

class Todo {
    constructor(title, priority, category) {
        this.title = title;
        this.priority = Number(priority);
        this.category = category;
        this.completed = false;
    }

    changeCompletedStatus() {
        this.completed = this.completed === false;
    }
}

newTodoButton.addEventListener('click', () => {
    formTodoDiv.removeAttribute('hidden');
    refreshCategoriesinTodoForm();
});

newCategoryButton.addEventListener('click', () => {
    formCategoryDiv.removeAttribute('hidden');
});

const closeNewCategory = document.querySelector('button.close-new-category');

closeNewCategory.addEventListener('click', () => {
    formCategoryDiv.setAttribute('hidden', '');
});

const closeNewTodo = document.querySelector('button.close-new-todo');

closeNewTodo.addEventListener('click', (e) => {
    e.preventDefault();
    formTodoDiv.setAttribute('hidden', '');
});

formTodo.addEventListener('submit', (e) => {
    e.preventDefault();
    allTodo.push(new Todo(e.target[0].value, e.target[2].value, e.target[3].value));
    cardsContainer.appendChild(drawCardDom(allTodo[allTodo.length - 1]))
    formTodoDiv.setAttribute('hidden', '');
    formTodo.reset();
});

function drawCardDom(object) {
    let card = document.createElement('div');
    card.classList.add('card');
    let priorityCircle = document.createElement('span');
    priorityCircle.classList.add('priority-circle');
    if (object.priority === 1) {
        priorityCircle.style.backgroundColor = 'red';
    } else if (object.priority === 2) {
        priorityCircle.style.backgroundColor = 'orange';
    } else if (object.priority === 3) {
        priorityCircle.style.backgroundColor = 'green';
    }
    card.appendChild(priorityCircle);

    let cardTitle = document.createElement('p');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = object.title;
    cardTitle.addEventListener('click', () => {
        if (object.completed === false) {
            cardTitle.style.textDecoration = 'line-through';
            object.changeCompletedStatus();
        } else {
            cardTitle.style.textDecoration = 'none';
            object.changeCompletedStatus();
        }

    })
    card.appendChild(cardTitle);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        cardsContainer.removeChild(card);
    })
    card.appendChild(deleteButton);

    return card
}

const categoryList = document.querySelector('.category-list');

function drawAllCategories() {
    categoryList.textContent = '';
    for (let i = 0; i < allCategory.length; i++) {
        let nextCategory = document.createElement('li');
        let p = document.createElement('p');
        p.textContent = allCategory[i];
        nextCategory.appendChild(p);
        nextCategory.addEventListener('click', () => {
            showByOneCategory(allCategory[i]);
        });
        categoryList.appendChild(nextCategory);
    }
}

formCategory.addEventListener('submit', (e) => {
    e.preventDefault();
    allCategory.push(e.target[0].value);
    drawAllCategories();
    formCategoryDiv.setAttribute('hidden', '');
    formCategory.reset();
    refreshCategoriesinTodoForm();
});

//TODO: show todos by only one category after clicking that categories button

const selectCategory = document.querySelector('#select-category');

function refreshCategoriesinTodoForm() {
    selectCategory.textContent = '';
    for (let i = 0; i < allCategory.length; i++) {
        let nextCategory = document.createElement('option');
        nextCategory.setAttribute('value', allCategory[i]);
        nextCategory.textContent = allCategory[i];
        selectCategory.appendChild(nextCategory);
    }
}

const allCategoryMenu = document.querySelector('h2.all');

//show card by 'ALL' category
allCategoryMenu.addEventListener('click', () => {
    cardsContainer.textContent = '';
    for (let i = 0; i < allTodo.length; i++) {
        cardsContainer.appendChild(drawCardDom(allTodo[i]));
    }
})

function showByOneCategory(category) {
    cardsContainer.textContent = '';
    for (let i = 0; i < allTodo.length; i++) {
        if (allTodo[i].category === category) {
            cardsContainer.appendChild(drawCardDom(allTodo[i]));
        }
    }
}