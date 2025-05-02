let tasks=[];
const addTask = ()=>{
    const taskInput= document.getElementById('taskInput');
    const text =taskInput.value.trim();
    if(text){
        tasks.push({text:text,completed:false});
        taskInput.value="";
        updateTasksList();
        updateStats();
    }
};
const toggleTaskcomplete=(index)=>{
    tasks[index].completed=!tasks[index].completed;
    updateTasksList();
    updateStats();
    
};
const deleteTask=(index)=>{
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
};
const editTask=(index)=>{
    const taskInput=document.getElementById('taskInput');
    taskInput.value=tasks[index].text;
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
};
// const updateStats=()=>{
//     const completeTasks =tasks.filter((task)=> task.completed).length;
// const totalTasks=tasks.length;
// const progress =(completedTasks/totalTasks)*100;
// const progressBar=document.getElementById('progress');
// progressBar.style.width=`${progress}%`;
// document.getElementById('number').innerText=`${completedTasks}/${totalTasks}`
// };
const updateStats=()=>{
    const completeTasks = tasks.filter((task)=> task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;
    const progressBar = document.getElementById('progress');
    progressBar.style.width = `${progress}%`;
    document.getElementById('number').innerText = `${completeTasks}/${totalTasks}`;
};

const updateTasksList = ()=>{
    const taskList=document.getElementById('task-List');
    taskList.innerHTML='';

    tasks.forEach((task,index )=> {
        const listItem=document.createElement("li")

        listItem.innerHTML=`
        <div class="taskItem">
        <div class="task ${task.completed ? "completed":""}">
            <input type="checkbox" class="checkbox"${task.completed ? "checked":"" }/>
            <p>${task.text}</p>
            </div>
            <div class="icons">
<img src="./img/edit.png" onclick="editTask(${index})"/>
<img src="./img/bin.png"onclick="deleteTask(${index})"/>
            </div>
            </div>
            `;
            listItem.addEventListener('change',()=> toggleTaskcomplete(index));
            taskList.appendChild(listItem);
    });
};
document.getElementById("newTask").addEventListener("click",function(e){
    e.preventDefault()
    addTask();
} )