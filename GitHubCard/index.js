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
let urlFollow  = 'https://api.github.com/users/'
const followersUrl = 'https://api.github.com/users/lesleyfon/followers'

axios.get(url)
  .then(res=>{
    axios.get(followersUrl)
      .then(followersResponse=>{
        // console.log(followersResponse.data);
        followersResponse.data.forEach(dataRes=>{
            axios.get(urlFollow + dataRes.login).then(eachFollowResponse=>{
                getAlldata(eachFollowResponse.data)
            })
        })
      }).catch(Err=>{
        console.error('There was an error with the axios get call')
        console.error("Error: ", Err )
      })
      gitHubResponse(res.data)
  })
  .catch(err=>{
    console.error('There was an error with the axios get call')
    console.error("Error: ", err )
  });
  
//step 3

function githubUserCreator(args){
    // user container
    const githubUser = document.createElement('div');
    githubUser.classList.add('card')
    //image div
    const githubUserAvatar = document.createElement('img');
    githubUserAvatar.src = args.avatar;
    githubUser.appendChild(githubUserAvatar)
    // user info
    const githubUserInfoDiv = document.createElement('div');
    githubUserInfoDiv.classList.add('card-info')
      // Name
      const githubName = document.createElement('h3');
      githubName.classList.add('name');
      githubName.textContent ="Name:" + args.name
      githubUserInfoDiv.appendChild(githubName)
      //User Name
      const githubUserName = document.createElement('p');
      githubUserName.textContent = 'User name: '+ args.name
      githubUserInfoDiv.appendChild(githubUserName)
      // Location
      const githubUserLocation = document.createElement('p');
      githubUserLocation.textContent = 'Location: ' + args.location
      githubUserInfoDiv.appendChild(githubUserLocation)
      // <p>Profile:
      {/* <a href={address to users github page}>{address to users github page}</a> */}
      //Profile
      const githubUrL = document.createElement('p');
      let atag = document.createElement('a');
      atag.href =  args.githubUrl;
      atag.textContent = args.githubUrl;
      githubUrL.textContent =  'Profile: '
      githubUrL.appendChild(atag)
      githubUserInfoDiv.appendChild(githubUrL)
      //bio
      const bio = document.createElement('p');
      bio.textContent = args.bio
      githubUserInfoDiv.appendChild(bio);
      //followers
      const followers = document.createElement('h6');
      followers.textContent = 'Followers: ' + args.followers
      githubUserInfoDiv.appendChild(followers)
      // folowing
      const following = document.createElement('h6');
      following.textContent = 'Following: ' + args.following
      githubUserInfoDiv.appendChild(following);
      githubUser.appendChild(githubUserInfoDiv);
      // appendig it to the page
      const card = document.querySelector('.cards');
      card.appendChild(githubUser)
      
      return githubUser
    }  
  function gitHubResponse(data){
    const resArr = {
            name: data.name || data.login,
            avatar: data.avatar_url,
            createdAt: data.created_at || '',
            location: data.location || '',
            followers: data.followers,
            following: data.following || '',
            githubUrl: data.html_url,
            repo: data.repos_url,
            totalRepoCount: data.public_repos
        }
        githubUserCreator(resArr)
  }

  function getAlldata(arr) {
      githubUserCreator({
        name: arr.name || arr.login,
        avatar: arr.avatar_url,
        createdAt: arr.created_at || '',
        location: arr.location || '',
        followers: arr.followers,
        following: arr.following || '',
        githubUrl: arr.html_url,
        repo: arr.repos_url,
      })
    
  }