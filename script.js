//  Theme Script
const themeToggler = document.querySelector(".theme"),
  body = document.querySelector("body"),
  themeName = themeToggler.querySelector(".theme-name"),
  icon = themeToggler.querySelector(".theme-icon img");

document.addEventListener("DOMContentLoaded", () => {
  themeToggler.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark-theme");
      themeName.innerText = "Light";
      icon.src = "./assets/icon-sun.svg";
    } else {
      localStorage.removeItem("theme", "dark-theme");
      themeName.innerText = "Dark";
      icon.src = "./assets/icon-moon.svg";
    }
  });

  if (localStorage.getItem("theme", "dark-theme")) {
    body.classList.add("dark");
    themeName.innerText = "Light";
    icon.src = "./assets/icon-sun.svg";
  } else {
    body.classList.remove("dark");
    themeName.innerText = "Dark";
    icon.src = "./assets/icon-moon.svg";
  }

  // load the default values (octocat account)
  const url = "https://api.github.com/users/octocat";

  const ococatUser = async function () {
    let { data } = await axios(url);
    createUserCard(data);
  };

  ococatUser();
});

//  Main Script

const APIURL = "https://api.github.com/users/";
const form = document.getElementById("form");
const user = document.getElementById("search");
const main = document.getElementById("main");
const noResult = document.getElementById("no-result");

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    createUserCard(data);
  } catch (error) {
    if (error.response.status === 404) {
      noResult.style.display = "inline-block";
    }
  }
}

function createUserCard(user) {
  let d = new Date(user.created_at);

  let joinDate = d.toUTCString().slice(5, 16);

  // console.log(joinDate);
  let userName = user.name ? user.name : user.login;
  let userBio = user.bio
    ? `<p class="user-bio">${user.bio}</p>`
    : `<p class="user-bio unavailable">This profile has no bio</p>`;

  let userLocation = user.location
    ? `<p>${user.location}</p>`
    : `<p class="unavailable">Not Available</p>`;

  let userTwitter_username = user.twitter_username
    ? `<p class="link"><a href="https://twitter.com/${user.twitter_username}" target="_blank">${user.twitter_username}</a></p>`
    : `<p class="link unavailable">Not Available</p>`;

  let userWebsite = user.blog
    ? `<p class="link"><a href="${user.blog}" target="_blank">${user.blog}</a></p>`
    : `<p class="unavailable">Not Available</p>`;

  let userCompany = user.blog
    ? `<p><a class="name" href="https://${user.company.slice(
        1
      )}.com/" target="_blank">${user.company}</a></p>`
    : `<p class="unavailable">Not Available</p>`;

  const htmlCard = `
  <div class="info-box">

      <nav class="user-nav">
        <div class="user-avatar">
          <img src="${user.avatar_url}" alt="User Avatar">
        </div>
        <div class="user-info">
          <div class="user-names">
            <h1 class="name">${userName}</h1>
            <a class="username" href="https://github.com/${user.login}" target="_blank">@${user.login}</a>
          </div>
          <div class="join-date">
            <p class="joined">joined <span class="join-date">${joinDate}</span></p>
          </div>
        </div>
      </nav>

      ${userBio}

      <div class="state">
        <div class="repos">
          <h3>Repos</h3>
          <h2 class="count">${user.public_repos}</h2>
        </div>
        <div class="followers">
          <h3>Followers</h3>
          <h2 class="count">${user.followers}</h2>
        </div>
        <div class="following">
          <h3>Following</h3>
          <h2 class="count">${user.following}</h2>
        </div>
      </div>

      <div class="user-meta">

        <div class="location">
          <img src="./assets/icon-location.svg" alt="">
           ${userLocation}
        </div>
        <div class="twitter">
          <img src="./assets/icon-twitter.svg" alt="">
          
          ${userTwitter_username}
          
        </div>

        <div class="website">
          <img src="./assets/icon-website.svg" alt="">
          
          ${userWebsite}
        </div>

        <div class="company">
          <img src="./assets/icon-company.svg" alt="">
          
          ${userCompany}
             
        </div>


      </div>

    </div>
  `;

  main.innerHTML = htmlCard;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = user.value;

  if (username) {
    getUser(username);

    search.value = "";
    noResult.style.display = "none";
  }
});
