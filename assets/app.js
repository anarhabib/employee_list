if (localStorage.getItem("employees") === null) {
  localStorage.setItem("employees", JSON.stringify([]));
}

let btnAdd = document.querySelector("#add-employee");
let employeeId = 1;
let btnDel = document.querySelector("#delete-employee");

// For delete all employees
btnDel.addEventListener("click", function () {
  localStorage.setItem("employees", JSON.stringify([]));

  ShowList();
});

//Showing filter and list
let employeeList = JSON.parse(localStorage.getItem("employees"));
if (employeeList.length === 0) {
  document.querySelector("#employee-data-all").classList.add("hidden");
  document.querySelector("#filter-data").classList.add("hidden");
} else {
  document.querySelector("#employee-data-all").classList.remove("hidden");
  document.querySelector("#filter-data").classList.remove("hidden");
}

//For adding employee
btnAdd.addEventListener("click", function () {
  let employeeList = JSON.parse(localStorage.getItem("employees"));
  let name = document.querySelector("#name").value;
  let surname = document.querySelector("#surname").value;
  let salary = document.querySelector("#salary").value;

  if (employeeList.length !== 0) {
    employeeId = employeeList[employeeList.length - 1].id + 1;
  }

  
    let employeeObj = {
      id: employeeId,
      name: name,
      surname: surname,
      salary: salary,
    };
  
if(name === '' || surname === '' || salary === ''){
  alert('Please fill all empty blanks...!')
}
else{
  employeeList.push(employeeObj);

}
  localStorage.setItem("employees", JSON.stringify(employeeList));


});

//For showing employee list
function ShowList() {
  let employeeList = JSON.parse(localStorage.getItem("employees"));

  if (employeeList.length === 0) {
    return;
  }

  let ShownList = "";

  document.querySelector(".employee-data").innerHTML = '';


  employeeList.forEach((employeeData) => {
    ShownList = `
        
       <tr class="emp-list align-items-center">
        <td>${employeeData.id}</td>
        <td><input onchange='updateName(${employeeData.id}, value)' disabled class="text-center ms-4 mt-2" type="text" value="${employeeData.name}"></td>
        <td><input onchange='updateSurname(${employeeData.id}, value)' disabled class="text-center ms-4 mt-2" type="text" value="${employeeData.surname}"></td>
        <td><input onchange='updateSalary(${employeeData.id}, value)' disabled class="text-center ms-4 mt-2" type="number" value="${employeeData.salary}"></td>
        <td><button onclick="empEdit(event.target)" class="btn btn-warning edit-data" style="margin-right:5px"><i class="fa-solid fa-user-pen"></i></button></td>
        <td><button onclick="empDel(${employeeData.id})" class="btn btn-danger delete-data"><i class="fa-solid fa-trash-can"></i></button></td>
    </tr>
    
        `;

    document.querySelector(".employee-data").innerHTML += ShownList;
  });

}

ShowList();


function empDel(empID) {
  let employeeList = JSON.parse(localStorage.getItem("employees"));

  let newList = employeeList.filter((i) => i.id !== empID);
  localStorage.setItem("employees", JSON.stringify(newList));
  
  ShowList();
}

function empEdit(e){


e.parentElement.parentElement.querySelectorAll('input').forEach((inp) =>{
  if(inp.hasAttribute('disabled')){
    inp.removeAttribute('disabled')
  }
  else{
    inp.setAttribute('disabled','')
  }
    
})

}

function updateName(empID, newValue){
  let employeeList = JSON.parse(localStorage.getItem("employees"));

  employeeList.forEach(employee => {
    if(employee.id === empID){
      employee.name = newValue;
    }

  })

  localStorage.setItem('employees',JSON.stringify(employeeList))
  ShowList();
}

function updateSurname(empID, newValue){
  let employeeList = JSON.parse(localStorage.getItem("employees"));

  employeeList.forEach(employee => {
    if(employee.id === empID){
      employee.surname = newValue;
    }

  })

  localStorage.setItem('employees',JSON.stringify(employeeList))
  ShowList();
}

function updateSalary(empID, newValue){
  let employeeList = JSON.parse(localStorage.getItem("employees"));

  employeeList.forEach(employee => {
    if(employee.id === empID){
      employee.salary = newValue;
    }

  })

  localStorage.setItem('employees',JSON.stringify(employeeList))
  ShowList();
}



// For filtering by salary
  let filterBtn = document.querySelector('#filter-salary')

  filterBtn.addEventListener('click', function(){
  
  let minValue = document.querySelector('#min-salary').value
  let maxValue = document.querySelector('#max-salary').value
  let employeeList = JSON.parse(localStorage.getItem("employees"));
 
  document.querySelector(".employee-data").innerHTML = '';

  // console.log(minValue);
  employeeList.forEach(employee => {
    let shownSalaryList = ''
    if(Number(employee.salary) >= minValue && Number(employee.salary) <= maxValue){
      

      shownSalaryList = `
        
      <tr class="emp-list align-items-center">
       <td>${employee.id}</td>
       <td><input onchange='updateName(${employee.id}, value)' disabled class="text-center ms-4 mt-2" type="text" value="${employee.name}"></td>
       <td><input onchange='updateSurname(${employee.id}, value)' disabled class="text-center ms-4 mt-2" type="text" value="${employee.surname}"></td>
       <td><input onchange='updateSalary(${employee.id}, value)' disabled class="text-center ms-4 mt-2" type="number" value="${employee.salary}"></td>
       <td><button onclick="empEdit(event.target)" class="btn btn-warning edit-data" style="margin-right:5px"><i class="fa-solid fa-user-pen"></i></button></td>
       <td><button onclick="empDel(${employee.id})" class="btn btn-danger delete-data"><i class="fa-solid fa-trash-can"></i></button></td>
   </tr>
   
       `
       document.querySelector(".employee-data").innerHTML += shownSalaryList;

      }
    })
  })


  let searchBtn = document.querySelector('#btn-search')

  searchBtn.addEventListener('click', function(){
     let searchName = document.querySelector('#search-name').value.toUpperCase();
     let employeeList = JSON.parse(localStorage.getItem("employees"));
     let shownSearchList = ''
    document.querySelector(".employee-data").innerHTML = '';


     employeeList.forEach(employee =>{
      if(employee.name.toUpperCase().includes(searchName)   || employee.surname.toUpperCase().includes(searchName)){
        shownSearchList = `
        
        <tr class="emp-list align-items-center">
         <td>${employee.id}</td>
         <td><input onchange='updateName(${employee.id}, value)' disabled class="text-center ms-4 mt-2" type="text" value="${employee.name}"></td>
         <td><input onchange='updateSurname(${employee.id}, value)' disabled class="text-center ms-4 mt-2" type="text" value="${employee.surname}"></td>
         <td><input onchange='updateSalary(${employee.id}, value)' disabled class="text-center ms-4 mt-2" type="number" value="${employee.salary}"></td>
         <td><button onclick="empEdit(event.target)" class="btn btn-warning edit-data" style="margin-right:5px"><i class="fa-solid fa-user-pen"></i></button></td>
         <td><button onclick="empDel(${employee.id})" class="btn btn-danger delete-data"><i class="fa-solid fa-trash-can"></i></button></td>
     </tr>
     
         `
       document.querySelector(".employee-data").innerHTML += shownSearchList;

      }
     })

  })
       
    
   


 



