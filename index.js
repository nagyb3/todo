function todo(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = new Date(dueDate); ///?
    this.priority = priority;
}

let todoArray = [];

function getData(form) {
    let formData = new FormData(form);
    return Object.fromEntries(formData).newtodo
}

const myForm = document.querySelector('.myform');

myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // alert(getData(e.target));
    todoArray.push(getData(e.target));
    myForm.setAttribute('hidden', '');
    refreshCards();
    myForm.reset();
});

const addButton = document.querySelector('button.add');

addButton.addEventListener('click', () => {
    myForm.removeAttribute('hidden');
})

const cardsContainer = document.querySelector('.cards-container');

function refreshCards() {
    cardsContainer.textContent = '';
    for (let i = 0; i < todoArray.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        let cardTitle = document.createElement('p');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = todoArray[i];
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