
//? Form //

const firstName = document.getElementById("firstName"),
  lastName = document.getElementById("lastName"),
  email = document.getElementById("email"),
  age = document.getElementById("age"),
  passwordInput = document.getElementById("password"),
  passwordRepeatInput = document.getElementById("password_repeat"),
  inputs = document.querySelectorAll('input:not([type="submit"])'),
  submit = document.querySelector('input[type="submit"]');

function CustomValidation() {
  this.invalidities = [];
  this.validityChecks = [];
}

CustomValidation.prototype = {
  addInvalidity: function (message) {
    this.invalidities.push(message);
  },
  getInvalidities: function () {
    return this.invalidities.join(". \n");
  },
  checkValidity: function (input) {
    for (let i = 0; i < this.validityChecks.length; i++) {
      let isInvalid = this.validityChecks[i].isInvalid(input);
      if (isInvalid) {
        this.addInvalidity(this.validityChecks[i].invalidityMessage);
      }

      let requirementElement = this.validityChecks[i].element;
      if (requirementElement) {
        if (isInvalid) {
          requirementElement.classList.add("invalid");
          requirementElement.classList.remove("valid");
        } else {
          requirementElement.classList.remove("invalid");
          requirementElement.classList.add("valid");
        }
      }
    }
  },
};

let firstNameValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length < 3;
    },
    invalidityMessage: "This input needs to be at least 3 characters",
    element: document.querySelector(
      'label[for="firstName"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      let illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
      return illegalCharacters ? true : false;
    },
    invalidityMessage: "Only letters and numbers are allowed",
    element: document.querySelector(
      'label[for="firstName"] .input-requirements li:nth-child(2)'
    ),
  },
];
let lastNameValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length < 3;
    },
    invalidityMessage: "This input needs to be at least 3 characters",
    element: document.querySelector(
      'label[for="lastName"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      let illegalCharacters = input.value.match(/[^a-zA-Z0-9]/g);
      return illegalCharacters ? true : false;
    },
    invalidityMessage: "Only letters and numbers are allowed",
    element: document.querySelector(
      'label[for="lastName"] .input-requirements li:nth-child(2)'
    ),
  },
];

let emailValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length < 7;
    },
    invalidityMessage: "This input needs to be at least 7 characters",
    element: document.querySelector(
      'label[for="email"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      let illegalCharacters = input.value.match(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
      );
      return illegalCharacters ? false : true;
    },
    invalidityMessage: "email must ends with @....",
    element: document.querySelector(
      'label[for="email"] .input-requirements li:nth-child(2)'
    ),
  },
];

let ageValidityChecks = [
  {
    isInvalid: function (input) {
      return input.value.length < 2;
    },
    invalidityMessage: "This input needs to be at least 2 characters",
    element: document.querySelector(
      'label[for="age"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      let illegalCharacters = input.value.match(/^([1-7][0-9]|80)$/);
      return illegalCharacters ? false : true;
    },
    invalidityMessage: "age must be between less than 80",
    element: document.querySelector(
      'label[for="age"] .input-requirements li:nth-child(2)'
    ),
  },
];

let passwordValidityChecks = [
  {
    isInvalid: function (input) {
      return (input.value.length < 8) | (input.value.length > 100);
    },
    invalidityMessage: "This input needs to be between 8 and 100 characters",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(1)'
    ),
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[0-9]/g);
    },
    invalidityMessage: "At least 1 number is required",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(2)'
    ),
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[a-z]/g);
    },
    invalidityMessage: "At least 1 lowercase letter is required",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(3)'
    ),
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[A-Z]/g);
    },
    invalidityMessage: "At least 1 uppercase letter is required",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(4)'
    ),
  },
  {
    isInvalid: function (input) {
      return !input.value.match(/[\!\@\#\$\%\^\&\*]/g);
    },
    invalidityMessage: "You need one of the required special characters",
    element: document.querySelector(
      'label[for="password"] .input-requirements li:nth-child(5)'
    ),
  },
];

let passwordRepeatValidityChecks = [
  {
    isInvalid: function () {
      return passwordRepeatInput.value != passwordInput.value;
    },
    invalidityMessage: "This password needs to match the first one",
  },
];

function checkInput(input) {
  input.CustomValidation.invalidities = [];
  input.CustomValidation.checkValidity(input);

  if (input.CustomValidation.invalidities.length == 0 && input.value != "") {
    input.setCustomValidity("");
  } else {
    let message = input.CustomValidation.getInvalidities();
    input.setCustomValidity(message);
  }
}

firstName.CustomValidation = new CustomValidation();
firstName.CustomValidation.validityChecks = firstNameValidityChecks;

lastName.CustomValidation = new CustomValidation();
lastName.CustomValidation.validityChecks = lastNameValidityChecks;

email.CustomValidation = new CustomValidation();
email.CustomValidation.validityChecks = emailValidityChecks;

age.CustomValidation = new CustomValidation();
age.CustomValidation.validityChecks = ageValidityChecks;

passwordInput.CustomValidation = new CustomValidation();
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

passwordRepeatInput.CustomValidation = new CustomValidation();
passwordRepeatInput.CustomValidation.validityChecks =
  passwordRepeatValidityChecks;





/* Check Again */

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keyup", function () {
    checkInput(this);
  });
}
