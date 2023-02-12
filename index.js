function Todo(title, priority) {
    this.title = title;
    this.priority = Number(priority);
}

let todoArray = [];

const myForm = document.querySelector('.myform');
const myFormDiv = document.querySelector('div.newtodo');

const cardsContainer = document.querySelector('.cards-container');

myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    todoArray.push(new Todo(e.target[0].value, e.target[1].value));
    myFormDiv.setAttribute('hidden', '');
    cardsContainer.appendChild(cardDOMStuff(todoArray.length - 1));
    myForm.reset();
});

const addButton = document.querySelector('button.add');

addButton.addEventListener('click', () => {
    myFormDiv.removeAttribute('hidden');
});

function refreshCards() {
    cardsContainer.textContent = '';
    for (let i = 0; i < todoArray.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        let priorityCircle = document.createElement('span');
        priorityCircle.classList.add('priority-circle');
        //priority: 1: highest, 3: lowest
        console.log(todoArray[i].priority)
        if (todoArray[i].priority === 1) {
            priorityCircle.style.backgroundColor = 'red';
        } else if (todoArray[i].priority === 2) {
            priorityCircle.style.backgroundColor = 'orange';
        } else if (todoArray[i].priority === 3) {
            priorityCircle.style.backgroundColor = 'green';
        }
        card.appendChild(priorityCircle);

        let cardTitle = document.createElement('p');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = todoArray[i].title;
        cardTitle.addEventListener('click', () => {
            // TODO: task completed functionality
        })
        card.appendChild(cardTitle);


        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-button');
        card.appendChild(deleteButton);
        //TODO: deletebutton functionality

        cardsContainer.appendChild(card);

    }
}

function cardDOMStuff(i) {
    let card = document.createElement('div');
    card.classList.add('card');
    let priorityCircle = document.createElement('span');
    priorityCircle.classList.add('priority-circle');
    //priority: 1: highest, 3: lowest
    console.log(todoArray[i].priority)
    if (todoArray[i].priority === 1) {
        priorityCircle.style.backgroundColor = 'red';
    } else if (todoArray[i].priority === 2) {
        priorityCircle.style.backgroundColor = 'orange';
    } else if (todoArray[i].priority === 3) {
        priorityCircle.style.backgroundColor = 'green';
    }
    card.appendChild(priorityCircle);

    let cardTitle = document.createElement('p');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = todoArray[i].title;
    cardTitle.addEventListener('click', () => {
        // TODO: task completed functionality
    })
    card.appendChild(cardTitle);


    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    card.appendChild(deleteButton);
    //TODO: deletebutton functionality

    return card
}

const newCategoryForm = document.querySelector('form.new-category');
const newCategoryDiv = document.querySelector('div.new-category-form');
const allCategoryDiv = document.querySelector('.sidebar > .container');
const addNewCategoryButton = document.querySelector('button.newcategory');

let categoryArray = ['All', 'Today', 'Tomorrow'];

newCategoryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    categoryArray.push(e.target[0].value);
    newCategoryDiv.setAttribute('hidden', '');
    newCategoryForm.reset();
    refreshCategories();
    newCategoryDiv.setAttribute('hidden', '');
});

function refreshCategories() {
    allCategoryDiv.textContent = '';
    for (let i = 0; i < categoryArray.length; i++) {
        let nextElement = document.createElement('h2');
        nextElement.textContent = categoryArray[i];
        allCategoryDiv.appendChild(nextElement)
    }
}

addNewCategoryButton.addEventListener('click', () => {
    newCategoryDiv.removeAttribute('hidden');
})