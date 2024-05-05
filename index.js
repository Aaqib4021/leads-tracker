const inputbtn=document.querySelector("#input-btn")
const inputText=document.getElementById("input-el")
const deletebtn=document.getElementById("delete-btn")
const tabBtn=document.getElementById("save-btn")

let myLeads=[]

const ulEl=document.getElementById("unordrdlst-el");

const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage;
    render(myLeads)
}

tabBtn.addEventListener("click",function(){
   chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
   })
   
})

function render(leads){
    let listItems=""
    for(let i=0;i<leads.length;i++){
        listItems+=`
        <li> 
             <a target='_blank' href="${leads[i]}">
             ${leads[i]}
             </a>
        </li>`
    }
    ulEl.innerHTML=listItems
}


inputbtn.addEventListener("click",function(){
    myLeads.push(inputText.value)
    inputText.value=""
    //create element 
    //set the text 
    //append to the ul
    // let exli=document.createElement("li")
    // exli.textContent=myLeads[i]
    // ulEl.append(exli)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))

    render(myLeads)
    
})


deletebtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})