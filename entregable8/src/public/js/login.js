let navBar = document.getElementById("navBar");
console.log(navBar);
console.log(navBar.className);
navBar.className = navBar.className + " ocultarElemento";


const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  console.log(e);
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  const response = await fetch("/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (response.status === 200) {
    window.location.replace("/");
  }
});