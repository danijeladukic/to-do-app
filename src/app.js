//selectors
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.list-div');
const filterOption=document.querySelector('.filter-todo');
const date = document.querySelector('.date');
let draggables = document.querySelectorAll('.todo');
const containers =document.querySelectorAll('.list-div');


//event listeners

// document.addEventListener('DOMContentLoaded', addListenersToDraggables());
document.addEventListener('DOMContentLoaded', getTodos());
document.addEventListener('DOMContentLoaded', getQuotes());
document.addEventListener('DOMContentLoaded', function(){let dateString = new Date();
                                            date.innerHTML=dateString.toDateString();});
                                            
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



function addTodo (event){
    event.preventDefault();       //prevents form from submitting
    
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");

    
    
 


    const newTodo = document.createElement("li");
    newTodo.innerText=todoInput.value;
    newTodo.classList.add('todo-item');
    
   
   
    todoDiv.appendChild(newTodo);

    todoDiv.classList.add('draggable');
    todoDiv.setAttribute('draggable', 'true');

    draggables = [...draggables, todoDiv];
    
   
    addListenersToDraggables();

    //add todo to local storage
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton=document.createElement("button");
    completedButton.innerHTML= '+';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton=document.createElement("button");
    trashButton.innerHTML= 'x';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);
    
    
    addListenersToDraggables();
    

    // clear input value
    todoInput.value='';
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitioned', function(){
            todo.remove();
        })
        //todo.remove();
    }
    if(item.classList[0]==='complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
   
    const todos = document.querySelectorAll('.todo');
  
    todos.forEach((todo) => {


        //check for undefined values and skips then and only apply the switch statement on nodes with properties 
      if (todo.classList !== undefined)
    {
          
        switch (e.target.value) 
        {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                break;

            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                 }
                else{
                    todo.style.display = "none";
                
                }
                break;

            default:
                break;

            
 }}})


}

//saving to local storage
function saveLocalTodos(todo){
    //check:do i already have things in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];                       //if in memory doesnt exist todos, we make one
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos')); //if there is one, get it by searching for a string
    }
    
    todos.push(todo);                              //add a todo at the end of an array
    localStorage.setItem('todos', JSON.stringify(todos));//when updated, save it in storage

}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];                       //if in memory doesnt exist todos, we make one
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos')); //if there is one, get it by searching for a string
    }

    todos.forEach(function(todo){
        
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
    
    

    const newTodo = document.createElement("li");
    newTodo.innerText=todo;
    newTodo.classList.add('todo-item');
    
    todoDiv.appendChild(newTodo);
    //add todo to local storage
    

    //check mark button
    const completedButton=document.createElement("button");
    completedButton.innerHTML= '+';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton=document.createElement("button");
    trashButton.innerHTML= 'x';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    todoDiv.classList.add("draggable");
    todoDiv.setAttribute('draggable', 'true'); 
    
    
    //append to list
    todoList.appendChild(todoDiv);
    todoList.addEventListener('click', deleteCheck);

    draggables = [...draggables, todoDiv];
    addListenersToDraggables();
    
}

    )

    addListenersToDraggables();
}

function removeLocalTodos(todo){

    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];                       //if in memory doesnt exist todos, we make one
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos')); //if there is one, get it by searching for a string
    }
    const todoIndex= todo.children[0].innerText;
    let indexOfTodo = todos.indexOf(todoIndex);
    todos.splice(indexOfTodo,1);//removes from that index, 1 element
    localStorage.setItem('todos', JSON.stringify(todos));
    
}

function getQuotes(){
fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    const quotesArray = data;
   
    let randomnumber = Math.floor(Math.random() * quotesArray.length);
    
    const todaysQuote = quotesArray[randomnumber].text;
    
    const todaysAuthor = quotesArray[randomnumber].author;
    document.querySelector('.quote').innerHTML = todaysQuote;
    document.querySelector('.author').innerHTML = todaysAuthor;

  });
}

function addListenersToDraggables(){
draggables.forEach(draggable => {
    
        draggable.addEventListener('dragstart',()=>{
            draggable.classList.add('dragging');
            console.log('dragstart');
            
        } );
        draggable.addEventListener('dragend',()=>{
            draggable.classList.remove('dragging');
            console.log('dragend');
        } );
    });
 }
    
 containers.forEach(container=>{
        container.addEventListener('dragover', e=>{
            e.preventDefault;
            const afterElement=getDragAfterElement(container, e.clientY);
            // console.log(afterElement);
            const draggable =document.querySelector('.dragging');
        
            if(afterElement == null){
                container.appendChild(draggable);
                }
                else{
                    container.insertBefore(draggable,afterElement);
                }
            
            });
        container.addEventListener('click', deleteCheck);
      

    });
    
 
function getDragAfterElement(container, y){

   const draggableElements =[...container.querySelectorAll('.draggable:not(.dragging)')];
    
   return draggableElements.reduce((closest, child)=>{
        const box= child.getBoundingClientRect();
        const offset = y - box.top -box.height/2;
       
        if(offset < 0 && offset > closest.offset){
            return {offset: offset, element:child };
        }
        else{
           return closest;
        }
    }, {offset:Number.NEGATIVE_INFINITY }).element;

}