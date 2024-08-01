function handleFormSubmit(event) {
  event.preventDefault();

  var loginEmail = document.getElementById("loginEmail").value;
  var loginPassword = document.getElementById("loginPassword").value;

  var loginEmailError = document.getElementById("loginEmailError");
  var loginPasswordError = document.getElementById("loginPasswordError");

  loginEmailError.textContent = "";
  loginPasswordError.textContent = "";

  var users = JSON.parse(localStorage.getItem("users")) || [];

  var user = users.find(function (user) {
    return user.email === loginEmail && user.password === loginPassword;
  });

  if (!user) {
    loginEmailError.textContent = "Invalid email or password.";
    loginPasswordError.textContent = "Invalid email or password.";
    return false;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  window.location.href = "loginSuccess.html";
  return false;
}
