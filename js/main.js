const elList = document.querySelector(".js-list");
const elTemplate = document.querySelector(".user_template").content;

const elPostList = document.querySelector(".js-post-list");
const elPostTemplate = document.querySelector(".post_template").content;

const elCommentsList = document.querySelector(".js-comments-list");
const elCommentsTemplate = document.querySelector(".comments_template").content;

const elItem = document.querySelector(".item");

// --------------------------- USERS ---------------------------

const userFragment = document.createDocumentFragment();
const renderUsers = (array, node) => {
    node.innerHtml = ""
  
  array?.forEach((el) => {
    const newTemplate = elTemplate.cloneNode(true);
    newTemplate.querySelector(".item_name").textContent = el.name;
    newTemplate.querySelector(".item_id").textContent = el.id;
    newTemplate.querySelector(".item_email").href = el.email;
    newTemplate.querySelector('.item_email').href = `mailto:${el.email}`;
    newTemplate.querySelector(".item_username").textContent = el.username;
    newTemplate.querySelector(".item_street").textContent = el.address.street;
    newTemplate.querySelector(".item_city").textContent = el.address.city;
    newTemplate.querySelector(".item_suite").textContent = el.address.suite;
    newTemplate.querySelector(".item_zipcode").textContent = el.address.zipcode;
    newTemplate.querySelector(".item_website").href = el.website;
		newTemplate.querySelector('.item_website').href = `https://${el.website}`;
    newTemplate.querySelector(".item_phone").href = el.phone;
		newTemplate.querySelector('.item_phone').href = `tel:${el.phone}`;
    newTemplate.querySelector(".item_company_name").textContent =
    el.company.name;
    newTemplate.querySelector(".item_catch_phrase").textContent =
    el.company.catchPhrase;
    newTemplate.querySelector(".item_comment").textContent = el.company.bs;
    let position = el.address.geo.lat + "," + el.address.geo.lng;
    let img_url = `https://www.google.com/maps/place/${position}`;
    newTemplate.querySelector(".location").href = img_url;
    newTemplate.querySelector(".location").textContent = position;
    
    userFragment.appendChild(newTemplate);
  });

  node.appendChild(userFragment);
};

async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();

  renderUsers(data, elList);
}

getUsers();

// --------------------------- POST ---------------------------

const PostFragment = document.createDocumentFragment();
const renderPosts = (array, node) => {
  node.innerHtml = "";

  array?.forEach((elPost) => {
    const newPostTemplate = elPostTemplate.cloneNode(true);
    newPostTemplate.querySelector(".post_title").textContent = elPost.title;
    newPostTemplate.querySelector(".post_user_id").textContent = elPost.userId;
    newPostTemplate.querySelector(".post_text").textContent = elPost.body;

    PostFragment.appendChild(newPostTemplate);
  });

  node.appendChild(PostFragment);
};


// --------------------------- COMMENTS ---------------------------

const CommentsFragment = document.createDocumentFragment();
const renderComments = (array, node) => {
    node.innerHtml = ""

  array?.forEach((elComments) => {
    const newCommentsTemplate = elCommentsTemplate.cloneNode(true);
    newCommentsTemplate.querySelector(".comments_user_id").textContent =
      elComments.postId;
    newCommentsTemplate.querySelector(".comments_title").textContent =
      elComments.name;
    newCommentsTemplate.querySelector(".comments_email").href =
      elComments.email;
      newCommentsTemplate.querySelector('.comments_email').href = `mailto:${elComments.email}`;
    newCommentsTemplate.querySelector(".comments_text").textContent =
      elComments.body;

    CommentsFragment.appendChild(newCommentsTemplate);
  });

  node.appendChild(CommentsFragment);
};



// --------------------------- Click Event ---------------------------


elList.addEventListener('click', (evt) => {
	if (evt.target.matches('.item')) {
    elPostList.innerHTML = "";
		const id = evt.target.querySelector('.item_id').textContent;
    
    async function getPosts() {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
      const dataPost = await response.json(); 
      
      renderPosts(dataPost, elPostList);
      console.log(id);
    }
    getPosts();
	}
});


elPostList.addEventListener("click", (evt) => {
    if(evt.target.matches(".post")) {
    elCommentsList.innerHTML = "";
    const id = evt.target.querySelector('.post_user_id').textContent;


    async function getComments() {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
      const dataComments = await response.json();
      
      renderComments(dataComments, elCommentsList);
      console.log(id);
    }
    getComments();
  }
});

