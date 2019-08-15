/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

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

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
// step1 
const url  = 'https://api.github.com/users/lesleyfon'
const followersUrl = 'https://api.github.com/users/lesleyfon/followers'

axios.get(url)
  .then(res=>{
    axios.get(followersUrl)
      .then(followersResponse=>{
       getAlldata(followersResponse.data, res.data)
      }).catch(Err=>{
        console.error('There was an error with the axios get call')
        console.error("Error: ", Err )
      })
   
  })
  .catch(err=>{
    console.error('There was an error with the axios get call')
    console.error("Error: ", err )
  });
  
//step 3

function githubUserCreator(args){
  // user container
  console.log(args)
  const githubUser = document.createElement('div');
  githubUser.classList.add('user')
  //image div
  const githubUserAvatarDiv = document.createElement('div');
  githubUserAvatarDiv.classList.add("avatarDiv");
  const githubUserAvatar = document.createElement('img');
    githubUserAvatar.src = args.avatar;
    githubUserAvatarDiv.appendChild(githubUserAvatar)
    // user info 
    const githubUserInfoDiv = document.createElement('div');
    githubUserInfoDiv.classList.add('info')
    const githubUserName = document.createElement('h2');
    githubUserName.textContent = args.name
    githubUserInfoDiv.appendChild(githubUserName)
    const githubUserLocation = document.createElement('h3');
    githubUserLocation.textContent = args.location
    githubUserInfoDiv.appendChild(githubUserLocation)
    const createdAt = document.createElement('h4');
    createdAt.textContent = args.createdAt
    githubUserInfoDiv.appendChild(createdAt);
    const followers = document.createElement('h6');
    followers.textContent = `${args.followers} : ${args.following}`
    githubUserInfoDiv.appendChild(followers)
    const githubUrL = document.createElement('h5');
    githubUrL.textContent = args.githubUrL
    githubUserInfoDiv.appendChild(githubUrL)
    const repo = document.createElement('h6');
    repo.textContent = args.repo;
    githubUserInfoDiv.appendChild(repo)
    const totalRepoCount = document.createElement('p');
    totalRepoCount.textContent = args.totalRepoCount
    githubUserInfoDiv.appendChild(totalRepoCount)
    githubUser.appendChild(githubUserAvatarDiv)
    githubUser.appendChild(githubUserInfoDiv)
    const card = document.querySelector('.cards');
    card.appendChild(githubUser)
    return githubUser
  }
  function gitHubResponse(data){
    const resArr = [data].map(userArr=>{
        return {
          name: userArr.name,
          avatar: userArr.avatar_url,
          createdAt: userArr.created_at,
          location: userArr.location,
          followers: userArr.followers,
          following: userArr.following,
          githubUrl: userArr.url,
          repo: userArr.repos_url,
          totalRepoCount: userArr.public_repos
        }
        
    })
    githubUserCreator(resArr)
  }

  function getAlldata(arr, me) {
    arr.unshift(me)
    const resArr1 = arr.map(userArr=>{
      githubUserCreator({
        name: userArr.name || userArr.login,
        avatar: userArr.avatar_url,
        createdAt: userArr.created_at || '',
        location: userArr.location || '',
        followers: userArr.followers || '',
        following: userArr.following || '',
        githubUrl: userArr.url,
        repo: userArr.repos_url,
        totalRepoCount: userArr.public_repos || ''
      })
    }) 
    console.log(resArr1)
  }