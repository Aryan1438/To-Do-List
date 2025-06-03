let task = document.getElementById('inputedTask');
let taskContainer = document.getElementById('listContainer');
let checkBox = document.querySelectorAll('.checkBox');
let pendingTask = document.querySelectorAll('task');
let addBtn = document.getElementById('addBtn');
const edit = document.getElementsByClassName('edit');
const del = document.getElementsByClassName('delete');
let btnValue = addBtn.value;
let taskArray = [];
let edit_id = null;

let prevTask = localStorage.getItem('tasks');

if(prevTask){
    taskArray = JSON.parse(prevTask);
}

displayTask();

const addTask = () => {
    if(edit_id!= null && task.value!=''){
        //edit
        taskArray.splice(edit_id,1,{'task' : task.value});
        edit_id = null;
    }else if(task.value!=''){
        taskArray.push({'task' : task.value});
    }else{
        alert('You Should Input The Task First.')
    }

        task.value = '';
        saveTask(taskArray);
        addBtn.value = btnValue;
}

const saveTask = (taskArray) => {
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    displayTask();
}

function displayTask() {
    let taskList = '';  
        if(taskArray.length > 0){
            taskArray.forEach((tasks, i) => {
                taskList += `<li class="d-flex" id='${i}'>
                <div class="float-left">
                    <input type="checkbox" class='checkBox' name="checkBox" id='${i}' onclick='lineThrough(${i})')'>

                    ${checkBox.checked?
                        `<p class='mb-0 task ms-1 me-1'><s>${tasks.task}</s></p>`
                    :
                        `<p class='mb-0 task ms-1 me-1'>${tasks.task}</p>`
                    }

                </div>
                <div class="float-right">
                    <span onclick='editTask(${i})'><button class=' btn btn-primary edit material-symbols-outlined ms-1 me-1'>edit_note</button></span>
                    <span onclick='deleteTask(${i})'><button class=' btn btn-danger delete material-symbols-outlined ms-1 me-1'>delete</button></span>
                </div>
            </li>`;
            taskContainer.innerHTML = taskList;
        });
        }else{
            taskContainer.innerHTML = taskList;
        }
}


const lineThrough = () =>{
    let paragraph = document.getElementsByClassName('task');
    let checkbox = document.getElementsByClassName('checkBox');
    

    for(let i =0; i<checkbox.length; i++){
        if(checkbox[i].checked){
            paragraph[i].style.textDecorationLine = "line-through";
            edit[i].disabled = true;
            del[i].disabled = true;
        }else{
            paragraph[i].style.textDecorationLine = "none";
            edit[i].disabled = false;
            del[i].disabled = false;
        }
    }
}

const editTask = (i) => {
    // alert(i)
    edit_id = i;
    task.value = taskArray[i].task;
    addBtn.value = 'Submit Changes'
}

const deleteTask = (i) => {
        taskArray.splice(i,1);
        saveTask(taskArray);
}
