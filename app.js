const ul = document.querySelector('ul');
const tpl = document.querySelector('#tpl');
const btn = document.querySelector('.btn-group');
const filterAllButton = document.getElementById('all');
const filterDoneButton = document.getElementById('done');
const filterTodoButton = document.getElementById('todo');
const filterButtons = document.querySelectorAll('.btn-group button');

filterAllButton.addEventListener('click', () => {
    changeFilterButtonColor(filterAllButton);
    filterTasks('all');
});

filterDoneButton.addEventListener('click', () => {
    changeFilterButtonColor(filterDoneButton);
    filterTasks('done');
});

filterTodoButton.addEventListener('click', () => {
    changeFilterButtonColor(filterTodoButton);
    filterTasks('todo');
});

function changeFilterButtonColor(mode) {
    filterButtons.forEach((button) => {
        button.style.backgroundColor = '#fff';
        button.style.color = '#4193f8';
    });
    mode.style.backgroundColor = '#4193f8';
    mode.style.color = '#fff';
}

function filterTasks(filter) {
    const listItems = document.querySelectorAll('li');
    
    listItems.forEach((listItem) => {
        const isDone = listItem.classList.contains('checked');
        const isTodo = listItem.classList.contains('unchecked');

        if (filter === 'all') {
            listItem.style.display = 'flex';
        } else if (filter === 'done' && isDone) {
            listItem.style.display = 'flex';
        } else if (filter === 'todo' && isTodo) {
            listItem.style.display = 'flex';
        } else {
            listItem.style.display = 'none';
        }
    });
}

function addNewLi(input) {
    const liNode = tpl.content.cloneNode(true);
    liNode.querySelector('div').innerHTML = input;
    ul.appendChild(liNode);

    if (ul.children.length === 1) {
        ul.children[0].style.borderTop = '1px solid #ccc';
    }

    setTimeout(() => {
        ul.children[ul.children.length - 1].classList.add('fade-in');
    }, 10);
}

ul.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'boot-icon') {
        e.target.parentNode.classList.add('fade-out');
        if (ul.children.length === 2) {
            ul.children[1].style.borderTop = '1px solid #ccc';
        }
        setTimeout(() => {e.target.parentNode.remove()}, 100);
    }
});

ul.addEventListener('change', (e) => {
    if (e.target && e.target.id === 'check-icon') {
        if (e.target.parentNode.classList.contains('checked'))
        {
            e.target.parentNode.classList.remove('checked');
            e.target.parentNode.classList.add('unchecked');
        }
        else
        {
            e.target.parentNode.classList.remove('unchecked');
            e.target.parentNode.classList.add('checked');
        }
    }
});

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = new FormData(e.currentTarget).get('tpl-todo');
    addNewLi(input);
});

