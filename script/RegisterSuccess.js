document.addEventListener("DOMContentLoaded", function () {
  var fullName = document.getElementById("fullName");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirmPassword");

  var fullNameError = document.getElementById("fullNameError");
  var emailError = document.getElementById("emailError");
  var passwordError = document.getElementById("passwordError");
  var CurrentPasswordError = document.getElementById("CurrentPasswordError");

  // Clear error messages on input
  fullName.addEventListener("input", function () {
    if (fullName.value !== "") {
      fullNameError.textContent = "";
    }
  });
  password.addEventListener("input", function () {
    if (password.value !== "") {
      CurrentPasswordError.textContent = "";
    }
  });

  email.addEventListener("input", function () {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value)) {
      emailError.textContent = "";
    }
  });

  password.addEventListener("input", function () {
    if (password.value !== "" && password.value === confirmPassword.value) {
      passwordError.textContent = "";
    }
  });

  confirmPassword.addEventListener("input", function () {
    if (
      confirmPassword.value !== "" &&
      password.value === confirmPassword.value
    ) {
      passwordError.textContent = "";
    }
  });

  document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var fullNameValue = fullName.value;
      var emailValue = email.value;
      var passwordValue = password.value;
      var confirmPasswordValue = confirmPassword.value;

      fullNameError.textContent = "";
      emailError.textContent = "";
      passwordError.textContent = "";

      var isValid = true;

      if (fullNameValue === "") {
        fullNameError.textContent = "Full Name is required.";
        isValid = false;
      }

      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailValue === "") {
        emailError.textContent = "Email is required.";
        isValid = false;
      } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = "Invalid email format.";
        isValid = false;
      }

      if (passwordValue === "") {
        passwordError.textContent = "Confirm Password is required.";
        CurrentPasswordError.textContent = "Password is required.";
        isValid = false;
      } else if (passwordValue !== confirmPasswordValue) {
        passwordError.textContent = "Passwords do not match!";
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      var users = JSON.parse(localStorage.getItem("users")) || [];

      var emailExists = users.some(function (user) {
        return user.email === emailValue;
      });

      if (emailExists) {
        emailError.textContent = "Email is already registered.";
        return;
      }

      var newUser = {
        id: Number(new Date()),
        fullName: fullNameValue,
        email: emailValue,
        password: passwordValue,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      window.location.href = "RegisterSuccess.html";

      document.getElementById("registerForm").reset();
    });
});
