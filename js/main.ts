
let addButton = document.getElementById('addButton');
let addInput = document.getElementById('itemInput');
let todoList = document.getElementById('todoList');
let clearButton=document.getElementById('clearButton');


let listArray: { status: string; content: string;}[] = [];


let changeToComp = function(){
    let parent = this.parentElement;
        console.log('Changed to complete');
        parent.className = 'uncompleted well';
        this.innerText = 'Incomplete';
        this.removeEventListener('click',changeToComp);
        this.addEventListener('click',changeToInComp);
        changeListArray(parent.firstChild.innerText,'complete');
}
let changeToInComp = function(){
    let parent = this.parentElement;
    console.log('Changed to incomplete');
    parent.className = 'completed well';
    this.innerText = 'Complete';
    this.removeEventListener('click',changeToInComp);
    this.addEventListener('click',changeToComp);
    changeListArray(parent.firstChild.innerText,'incomplete');
}
let removeItem =function(){
    let parent = this.parentElement.parentElement;
    parent.removeChild(this.parentElement);
    let data = this.parentElement.firstChild.innerText;
    for(let i=0; i < listArray.length; i++){
        if(listArray[i].content == data){
            listArray.splice(i,1);
            refreshLocal();
            break;
        }
    }
}
let changeListArray = function(data: any,status: any){
    for(let i=0; i < listArray.length; i++){
        if(listArray[i].content == data){
            listArray[i].status = status;
            refreshLocal();
            break;
        }
    }
}
let createItemDom = function(text: string,status: string){
    let listItem = document.createElement('li');
    let itemLabel = document.createElement('label');
    let itemCompBtn = document.createElement('button');
    let itemIncompBtn = document.createElement('button');
    listItem.className = (status == 'incomplete')?'completed well':'uncompleted well';
    itemLabel.innerText = text;
    itemCompBtn.innerText = (status == 'incomplete')?'Complete':'Incomplete';
    if(status == 'incomplete'){
        itemCompBtn.addEventListener('click',changeToComp);
    }else{
        itemCompBtn.addEventListener('click',changeToInComp);
    }
    itemIncompBtn.className = 'danger';
    itemIncompBtn.innerText = 'Delete';
    itemIncompBtn.addEventListener('click',removeItem);
    listItem.appendChild(itemLabel);
    listItem.appendChild(itemCompBtn);
    listItem.appendChild(itemIncompBtn);
    return listItem;
}
let refreshLocal = ()=>{
    let todos = listArray;
    localStorage.removeItem('todoList');
    localStorage.setItem('todoList', JSON.stringify(todos));
}
let addToList = ()=>{
    let newItem :any;
    newItem=addInput;
    newItem.content = newItem.value;
    listArray.push(newItem);
    refreshLocal();
    let item = createItemDom(newItem.value,'incomplete');
    todoList.appendChild(item);
    newItem.value = '';
}
let clearList = function(){
    listArray = [];
    localStorage.removeItem('todoList');
    todoList.innerHTML = '';
}
window.onload = function (){
    let list = localStorage.getItem('todoList');
    if (list != null) {
        const todos = JSON.parse(list);
        listArray = todos;
        for(let i=0; i<listArray.length;i++){
           let  data = listArray[i].content;
            let item = createItemDom(data,listArray[i].status);
            todoList.appendChild(item);
        }
    }
};
addButton.addEventListener('click',addToList);
clearButton.addEventListener('click',clearList);
