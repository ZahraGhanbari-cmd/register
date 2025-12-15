const form = document.getElementById("registerForm");
const username = document.getElementById("username");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

function showError(input, message) {
  const error = input.nextElementSibling;
  input.classList.add("invalid");
  input.classList.remove("valid");
  error.textContent = message;
}

function showSuccess(input) {
  const error = input.nextElementSibling;
  input.classList.add("valid");
  input.classList.remove("invalid");
  error.textContent = "";
}

function validateUsername() {
  const value = username.value.trim();
  if (value.length < 3 || value.length > 15) {
    showError(username, "Username must be between 3 and 15 characters");
    return false;
  }
  if (!/^[a-zA-Z0-9]+$/.test(value)) {
    showError(username, "Username can only contain letters and numbers");
    return false;
  }
  showSuccess(username);
  return true;
}

function validateFullName() {
  const value = fullname.value.trim();
  if (!/^[a-zA-Z ]+$/.test(value)) {
    showError(fullname, "Full name must contain only letters and spaces");
    return false;
  }
  if (value.split(" ").length < 2) {
    showError(fullname, "Please enter your full name");
    return false;
  }
  showSuccess(fullname);
  return true;
}

function validateEmail() {
  const value = email.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) {
    showError(email, "Please enter a valid email address");
    return false;
  }
  showSuccess(email);
  return true;
}

function validatePassword() {
  const value = password.value;
  const nameParts = fullname.value.toLowerCase().split(" ");
  const emailValue = email.value.toLowerCase();

  if (value.length < 8) {
    showError(password, "Password must be at least 8 characters");
    return false;
  }

  if (!(/[0-9!@#$%^&*]/.test(value))) {
    showError(password, "Password must include a number or symbol");
    return false;
  }

  for (let part of nameParts) {
    if (part && value.toLowerCase().includes(part)) {
      showError(password, "Password cannot contain your name");
      return false;
    }
  }

  if (emailValue && value.toLowerCase().includes(emailValue.split("@")[0])) {
    showError(password, "Password cannot contain your email");
    return false;
  }

  showSuccess(password);
  return true;
}

function checkFormValidity() {
  submitBtn.disabled = !(
    validateUsername() &&
    validateFullName() &&
    validateEmail() &&
    validatePassword()
  );
}

username.addEventListener("input", checkFormValidity);
fullname.addEventListener("input", checkFormValidity);
email.addEventListener("input", checkFormValidity);
password.addEventListener("input", checkFormValidity);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  successMessage.textContent = "Registration successful! 🎉";

  console.log({
    username: username.value,
    fullName: fullname.value,
    email: email.value,
    password: "********"
  });

  form.reset();
  submitBtn.disabled = true;
  document.querySelectorAll("input").forEach(i => i.className = "");
});