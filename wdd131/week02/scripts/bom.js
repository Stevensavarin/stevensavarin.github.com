const input = document.querySelector('#favchap');
const button = document.querySelector('button');
/* You need to fill in the blank to reference the
HTML element that is an unordered list element */ 
const list = document.querySelector('#list')

/* const li = document.createElement('li');
const deleteButton = document.createElement('button')

li.textContent = input.value;
deleteButton.textContent = '❌';
li.append(deleteButton);
list.append(li); */

button.addEventListener('click', function() {
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = input.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';

        li.appendChild(deleteButton);
        list.appendChild(li);
        
        deleteButton.addEventListener('click', function() {
            list.removeChild(li);
            input.focus();
        });

        input.value('');
    }
    input.focus();
});