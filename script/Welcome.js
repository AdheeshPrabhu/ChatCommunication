var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  window.location.href = "loginSuccess.html";
}
