//DEFINE VARIABLES

const mainForm= document.querySelector('#main-form');
const taskInput= document.querySelector('#task-enter');
const addBtn= document.querySelector('.add-btn');
const filter= document.querySelector('#filter');
const taskList= document.querySelector('.collection');
const clearTask= document.querySelector('.clear-tasks');

//CREATE A FUNCTION FOR ALL EVENT LISTENERS
loadEventListeners();



function loadEventListeners(){
  mainForm.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeItem);
  clearTask.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
  document.addEventListener('DOMContentLoaded', addStorage)
}

function addTask(e){
if(taskInput.value === ''){
  alert('hello');
}

//create New List element
const list=document.createElement('li');
list.className= 'collection-item';
list.appendChild(document.createTextNode(taskInput.value));

//create delete link element

const link= document.createElement('a');
link.className= 'delete-item secondary-content';
link.innerHTML= '<i class="fa fa-remove"></i>';

list.appendChild(link);

taskList.appendChild(list);

storeTaskInLocalStorage(taskInput.value);// APPEND TASKINPUT TO LOCAL STORAGE FIRST

taskInput.value='';

e.preventDefault();
}
//PERSIST TO LOCAL STORAGE
function storeTaskInLocalStorage(task){

  let tasks;

  if(localStorage.getItem('tasks')=== null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//ADD LOCALSTORAGE TO UL

function addStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    const list=document.createElement('li');
list.className= 'collection-item';
list.appendChild(document.createTextNode(task));

//create delete link element

const link= document.createElement('a');
link.className= 'delete-item secondary-content';
link.innerHTML= '<i class="fa fa-remove"></i>';

list.appendChild(link);

taskList.appendChild(list);
  })
}

  
//remove one task
function removeItem(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
    }
  }
}

//FILTER TASKS
function filterTasks(e){
 const filterItem= e.target.value.toLowerCase();
 
 document.querySelectorAll('.collection-item').forEach(function(task){
   const item= task.firstChild.textContent;
   if(item.toLowerCase().indexOf(filterItem) != -1){
     task.style.display='block';
   }else{
     task.style.display='none';
   }
 })

}



//clear all tasks
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
}

//PERSIST TO LOCAL STORAGE



