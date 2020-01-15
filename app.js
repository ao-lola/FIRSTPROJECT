//DEFINE VARIABLES

const myForm= document.querySelector('#main-form');
const taskInput= document.querySelector('#task-enter');
const taskList= document.querySelector('.collection');
const myButton= document.querySelector('.clear-tasks');
const myFilter= document.querySelector('#filter');

loadEventListeners();

function loadEventListeners(){

  document.addEventListener('DOMContentLoaded', addStorage);

  myForm.addEventListener('submit' , newTask);

  taskList.addEventListener('click', deleteItem);

  myButton.addEventListener('click', clearNow);

  myFilter.addEventListener('keyup', taskFilter)
}

function newTask(e) {
  if(taskInput.value === ''){
    alert('Enter your Task');
  }

  //CREATE NEW ELEMENT
  const list= document.createElement('li');
  list.className= 'collection-item';
  list.appendChild(document.createTextNode(taskInput.value));

  const link= document.createElement('a');
  link.className='delete-item secondary-content';
  link.innerHTML= '<i class="fa fa-remove"></i>';
  list.appendChild(link);

  taskList.appendChild(list);
  
  storeTaskInLocalStorage(taskInput.value)

  taskInput.value='';
  

  e.preventDefault();
}
//
function storeTaskInLocalStorage (task) {
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks= JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}



// function storeTasksInLocalStorage (task){
//     let tasks;
//     if(localStorage.getItem('tasks') == null){
//       tasks = [];
//     }else{
//       tasks = JSON.parse(localStorage.getItem('tasks'));
//     }
//     tasks.push(task);
//     localStorage.setItem('tasks', JSON.stringify(tasks));

// }

//DELETE ITEM
function deleteItem(e) {
  if(e.target.parentElement.classList.contains('delete-item')){

  if(confirm('are you sure?')){
    e.target.parentElement.parentElement.remove();
  }
  }
  
}

//FASTER WAY TO CLEAR (while loop)
function clearNow () {
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
}
//FILTER THROUGH
function taskFilter(e) {
  const theItem= e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
      const item= task.firstChild.textContent;
      if(item.toLowerCase().indexOf(theItem) != -1){
        task.style.display='block';
      }else{
        task.style.display='none';
      }
  })
}

//ADDING LOCAL STORAGE TO UL
function addStorage(task) {
  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks= [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){ 
    const list= document.createElement('li');
  list.className= 'collection-item';
  list.appendChild(document.createTextNode(task));

  const link= document.createElement('a'); 
  link.className='delete-item secondary-content';
  link.innerHTML= '<i class="fa fa-remove"></i>';
  list.appendChild(link);

  taskList.appendChild(list);
  
  })
}

