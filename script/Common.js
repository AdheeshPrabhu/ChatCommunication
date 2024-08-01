$(document).ready(function () {
  $(".logoutBtn").on("click", function () {
    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";
  });
});

function isLoggedIn() {
  const isLoggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    window.location.href = "Welcome.html";
  }
}
