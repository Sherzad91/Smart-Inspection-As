const contactForm = document.getElementById('contact-form');
const nameEl = document.getElementById('name');
const emailEl = document.getElementById('email');
const subjectEl = document.getElementById('subject');
const messageEl = document.getElementById('message');
let errorDiv = document.getElementById('errors');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  handleForm();
});

//======== show error function  =========//
function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = 'contact--form__field error';
  const small = formGroup.querySelector('small');
  small.innerText = message;
}

//========= show success outline =========//
function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = 'contact--form__field success';
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function handleForm(e) {
  let errors = [];
  //=========== @Validate Name Input  =======//
  if (!nameEl.value) {
    showError(nameEl, 'Name is required');
    errors.push('Name is required');
  } else if (nameEl.value && nameEl.value.length < 5) {
    showError(nameEl, 'Name must be at least 5 characters');
    errors.push('Name must be at least 5 characters');
  } else {
    showSuccess(nameEl);
  }

  //===========  @Validate Email Input =========//
  if (!emailEl.value) {
    showError(emailEl, 'Email is required');
    errors.push('Email is required');
  } else if (emailEl.value && !validateEmail(emailEl.value)) {
    showError(emailEl, 'Email is invalid');
    errors.push('Email is invalid');
  } else {
    showSuccess(emailEl);
  }

  //*********   @Validate Subject Input  ********//
  if (!subjectEl.value) {
    showError(subjectEl, 'Subject is required');
    errors.push('Subject is required');
  } else if (subjectEl.value && subjectEl.value.length < 4) {
    showError(subjectEl, 'Subject must be at least 4 characters');
    errors.push('Subject must be at least 4 characters');
  } else {
    showSuccess(subjectEl);
  }

  //========== @Validate Subject Input ============//
  if (!messageEl.value) {
    showError(messageEl, 'Message is required');
    errors.push('Message is required');
  } else if (messageEl.value && messageEl.value.length < 25) {
    showError(messageEl, 'Message must be at least 25 characters');
    errors.push('Message must be at least 25 characters');
  } else {
    showSuccess(messageEl);
  }

  if (!errors.length) {
    document.getElementById('form-message').className = 'alert alert-success show';
    document.getElementById('form-message').innerHTML = 'Thanks we will get back to you asap';

    const smalls = document.querySelectorAll('.contact--form__field');
    smalls.forEach(element => {
      element.className = 'contact--form__field';
    });

    //========= clear.value = "" inputs  ==========//
    nameEl.value = '';
    emailEl.value = '';
    subjectEl.value = '';
    messageEl.value = '';

    //========= hide suucess meesage  =========//
    setTimeout(() => {
      document.getElementById('form-message').className = 'alert alert-success hide';
    }, 2000);
  }
}
