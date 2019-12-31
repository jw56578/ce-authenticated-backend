const inputList = document.querySelectorAll(`input`);
const errField = document.getElementById('err');
const form = document.getElementById('form');
const button = document.getElementById('subButton')

let userObj = {};
let err = []

button.addEventListener("click", e => {
  e.preventDefault();
  
  for(let i = 0; i < inputList.length; i++) {
    // Iterate through inputs
    let inputListField = inputList[i];
    
    // Clear errors from previous clicks
    clearErrors(inputListField);

    // Report Errors or Make an object and Submit Form
    if(inputListField.value === '') {
      err = ['error']
      errField.innerText ="Both Fields Are Required"
    } else {
      makeUserObj(inputListField);
      err = []
    }
  }
  if (err.length > 0) {
    e.preventDefault();
  } else {
  handleSubmit();
  }
});


  const emptyFieldError = (inputListField) => {
    if(inputListField.value === '') {
      errField.innerText = "Both fields are required";
    }
  }

  const makeUserObj = (inputListField) => {
  userObj[inputListField.id] = inputListField.value;
  }

  const clearErrors = (inputListField) => {
    if(inputListField.value !== '') {
      errField.innerText = ""
    }
  };

  const handleSubmit = () => {
    console.log(userObj)
    axios({
      method: "post",
      url: "http://localhost:4001/auth/login",
      data: userObj
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
