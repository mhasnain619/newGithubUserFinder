let userName = document.getElementById('username')
let userDataShow = document.getElementById('userDataShow')
let searchContainer = document.getElementById('searchContainer')
let profileCard = document.getElementById('profileCard')
let backArrow = document.querySelector('.back-arrow');


searchContainer.style.display = 'block';
profileCard.style.display = 'none';

const fetchUserData = async (username) => {
    profileCard.style.display = 'none';
    searchContainer.style.display = 'none';
    userDataShow.innerHTML = `<span class="loader"></span>`;
    profileCard.style.display = 'block';
    try {
        const API_KEY = `https://api.github.com/users/${username}`;
        const fetchData = await fetch(API_KEY);

        if (!fetchData.ok) {
            if (fetchData.status === 404) {
                Swal.fire("User Not Found...!!");
                searchContainer.style.display = 'block';
            } else {
                Swal.fire("An error occurred. Please try again later.");
            }
            userDataShow.innerHTML = ''; // Clear spinner
            return;
        }

        const data = await fetchData.json();
        console.log(data);

        return showData(data);
    } catch (error) {
        Swal.fire("An unexpected error occurred.");
        userDataShow.innerHTML = ''; // Clear spinner
    }
};

const searchBtn = async () => {
    let username = userName.value;
    if (!username) {
        Swal.fire("Please Enter a valid username");
    } else {
        await fetchUserData(username);
        userName.value = '';
    }
};


const showData = (data) => {
    userDataShow.innerHTML = `
<div class="profile-card">
            <!-- Profile Header -->
            <div class="profile-header">
                <h2 class="name"><i class="fa-solid fa-circle"></i>${data.name || "User Name"}</h2>
                <div class="profile-div">
                    <div class="profile-photo">
                        <img src="${data.avatar_url}" alt="Profile Picture">
                    </div>
                    <div>
                        <p class="bio">
                           ${data.bio || "No bio available."}
                        </p>
                        <div class="location">
                            <i class="fas fa-map-marker-alt"></i>
                            <p>${data.location || "Not provided"}</p>
                        </div>
                        <div class="email">
                            <i class="fas fa-envelope"></i>
                            <p>${data.email || "Not available"}</p>
                        </div>
                        <div class="social-links">
                            <p>Social Links :</p>
                            <div>
                                <i class="fab fa-twitter"></i>
                                <a href="${data.html_url}">
                                <i class="fab fa-github">
                                
                                </i></a>
                                
                            </div>
                        </div>
                        <div class="blog">
                            <p>Portfolio :</p>
                            <div>
                            <a class='bloglink' href=" ${data.blog}">Portfolio</a>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Stats Section -->
            <hr class='hrRow'>
            
            <div class="stats">
            
                <div>
                    <h3>${data.public_repos || 0}</h3>
                    <p>Repositories</p>
                </div>
                <div>
                    <h3>${data.followers || 0}</h3>
                    <p>Followers</p>
                </div>
                <div>
                    <h3>${data.following || 0}</h3>
                    <p>Following</p>
                </div>
            </div>
            <hr class='hrRow'>

            <!-- Repositories Section -->
            <div class="repositories">
                <h3>Latest Repositories</h3>
                <ul>
                     ${data.repos_url ? `<li class="repo-item">${data.repos_url}</li>` : 'No repos found'}
                </ul>
            </div>
        </div>
`
}