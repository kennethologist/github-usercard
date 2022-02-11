import axios from 'axios'

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/


function getGitHubUser(username){
  axios.get(`https://api.github.com/users/${username}`)
  .then (resp =>{
    console.log(resp.data);
    
    document.querySelector(".cards").appendChild(createUserCard(resp.data));
    const follwersArea = document.createElement("h1");
    follwersArea.textContent = "Followers";
    follwersArea.style = "font-weight: bold; font-size: 3rem";
    document.querySelector(".cards").appendChild(follwersArea);
    return resp.data.followers_url;
  }).then(followersUrl => {
    axios.get(followersUrl)
    .then(resp => {
      //console.log(resp.data);
      const users = resp.data.map(user => {
          return user.url;
      });

      return users
    }).then(followedUsers => {

      followedUsers.forEach(url => {
        if (url) {
          axios.get(url)
          .then(resp => {
            
            document.querySelector(".cards").appendChild(createUserCard(resp.data));
          });
        }
      });
      })
      
  })
  .catch(err => {
    console.log(err);
  });
}

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ["kennethologist"];

followersArray.forEach(user => {
  getGitHubUser(user);
})
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function createUserCard(githubUser)
{
  const card = document.createElement("div");
  const img = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const username = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const profileLink = document.createElement("a");
  const followersCount = document.createElement("p");
  const followingCount = document.createElement("p");
  const bio = document.createElement("p");

  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  username.classList.add("username");

  img.src = githubUser.avatar_url;
  name.textContent = `${githubUser.name}`;
  username.textContent = `${githubUser.login}`;
  location.textContent = `Location: ${githubUser.location}`;
  profile.textContent = "Profile:";
  followersCount.textContent = `Followers: ${githubUser.followers}`;
  followingCount.textContent = `Following: ${githubUser.following}`;
  bio.textContent = `Bio: ${githubUser.bio}`

  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(name);
  cardInfo.appendChild(location);

  profile.appendChild(profileLink);
  cardInfo.appendChild(profile);
  
  cardInfo.appendChild(followersCount);
  cardInfo.appendChild(followingCount);
  cardInfo.appendChild(bio);

  return card;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
    crharding
*/
