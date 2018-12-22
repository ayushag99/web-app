//Wrong Animation on login page
function itsWrong(wrong) {
  setTimeout(() => {
    wrong.className = "wrong";
    wrong.style.color = "red";
  }, 2);
  wrong.classList.remove("wrong");

  function freeup(e) {
    e.target.style.color = "#fffbf1";
    e.target.classList.remove("wrong");
    e.target.removeEventListener("focus", freeup);
  }
  wrong.addEventListener("focus", freeup);
}

//Submit button event
document.getElementById("login").addEventListener("submit", e => {
  e.preventDefault();
  email = e.target.email;
  password = e.target.password;
  localStorage.setItem("email", email.value);
  sessionStorage.setItem("password", password.value);
  document.cookie = `email=${email.value}`
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      check = xhttp.response;
      check = JSON.parse(check);

      if (!check.email && !check.password) {
        document.getElementById("logwarn").style.visibility="visible";
        itsWrong(email);
        itsWrong(password);
        
      }
      else{
        sessionStorage.setItem("token", check.token);
        
      }
    }
  };
  xhttp.open("POST", "/authenticate/login", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(`email=${email.value}&password=${password.value}`);
});

document.getElementById("register").addEventListener("submit", e => {
  e.preventDefault();
  username = e.target.username;
  email = e.target.email;
  password = e.target.password;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    //   console.log(xhttp);
      check = xhttp.response;
      check = JSON.parse(check);

      if (!check.email) {
        document.getElementById("regwarn").style.visibility="visible";

        itsWrong(email);
      }
    }
  };
  xhttp.open("POST", "/authenticate/register", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(`email=${email.value}&password=${password.value}&username=${username.value}`);
});
