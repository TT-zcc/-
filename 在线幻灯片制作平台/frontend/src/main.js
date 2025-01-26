import { BACKEND_PORT } from './config.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';

// Get the login form and register form elements
const loginForm = document.forms['login-form'];
const registerForm = document.forms['register-form'];

// Define the checkLogin function
const checkLogin = () => {
  if (loginForm.elements['login-email'].value === '')
    alert("Mailbox Account Cannot Be Empty!")

  else if (loginForm.elements['login-password'].value === '')
    alert("Password Cannot Be Empty!")

  else{
    const body = {
      email: loginForm.elements['login-email'].value,
      password: loginForm.elements['login-password'].value
    }

    // Send the login request
    fetch('http://localhost:5005/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } else {
        document.getElementById('login').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);

        const token = localStorage.getItem('token')

        //Read and set save login user privilege status
        getUserDetail(data.userId,undefined,undefined)

        fetch(`http://localhost:5005/threads?start=0`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } 
          
          else {

            // Hide the login form and show the dashboard on successful login
            document.getElementById('login').style.display = 'none';
            document.getElementById('dashboard').style.display = 'flex';
            
            const startIndex = document.querySelectorAll('.one-thread-container').length;
            const model = 'dashboardScreenThread';
            const userId = parseInt(localStorage.getItem('userId'))

            // Get all threads for the dashboard
            getAllThread(startIndex,model,localStorage.getItem('token'));

            // Add event listener to 'Go to User Profile' text,It gives users access to the profile screen
            document.getElementById('go-to-user-profile').addEventListener('click', () => {
              document.getElementById('dashboard').style.display = 'none';
              document.getElementById('user-screen').style.display = 'flex';
              goToUserScreen(userId, userId, localStorage.getItem('token'));
            });        
          }
        });      
      }
    })
  } 
}

// Ability to navigate from the login page to the registration page
const goToRegisterPage = () => {
  document.getElementById('login').style.display = 'none';
  document.getElementById('register').style.display = 'flex';
}

const checkRegister = () => {
  if (registerForm.elements['register-email'].value === '')
    alert("Mailbox Account Cannot Be Empty!")

  else if (registerForm.elements['register-password'].value === '')
    alert("Password Cannot Be Empty!")

  else if (registerForm.elements['register-name'].value === '')
    alert("Name Cannot Be Empty!")

  else{
    // Check if the entered passwords match
    if (registerForm.elements['register-password'].value != registerForm.elements['confirm-password'].value) {
      alert("Your passwords do not match. Please re-enter the password.");
    }

    else{
      const body = {
        email: registerForm.elements['register-email'].value,
        name: registerForm.elements['register-name'].value,
        password: registerForm.elements['register-password'].value
      }
      fetch('http://localhost:5005/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } 
        
        else {

          // Hide the register form and display the dashboard on successful registration
          document.getElementById('register').style.display = 'none';
          document.getElementById('dashboard').style.display = 'flex';

          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);

          const startIndex = document.querySelectorAll('.one-thread-container').length;
          const model = 'dashboardScreenThread';

          // Get all threads for the dashboard
          getAllThread(startIndex,model,localStorage.getItem('token'));
          getUserDetail(data.userId,undefined,undefined)

          document.getElementById('go-to-user-profile').addEventListener('click', () => {
            document.getElementById('dashboard').style.display = 'none';
            document.getElementById('user-screen').style.display = 'flex';
            goToUserScreen(data.userId, data.userId, localStorage.getItem('token'));
          });     
        }
      })
    }
  }
}

// Function to log out the user
const logOut = () => {

  // Remove userId ,token and admin status from localStorage
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  localStorage.removeItem('admin');

  document.getElementById('login').style.display = 'flex';
  document.getElementById('dashboard').style.display = 'none';
  loginForm.elements['login-email'].value = '';
  loginForm.elements['login-password'].value = '';
  registerForm.elements['register-email'].value = '',
  registerForm.elements['register-name'].value = '',
  registerForm.elements['register-password'].value = '';
  registerForm.elements['confirm-password'].value = '';

  // Remove all thread containers from the dashboard
  const threadContainers = document.querySelectorAll('.one-thread-container');
  threadContainers.forEach(container => {
    container.remove();
  });
  document.getElementsByClassName('all-thread-container')[0].height = '490px';
}

// Function to navigate to the create thread page
const goToCreatePage = () => {
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('create-thread-screen').style.display = 'flex';
}

// Function to create a new thread
const createThread = () => {
  const body = {
    title:  document.getElementById('title-input').value,
    isPublic:  document.getElementsByClassName('public-check-box')[0].checked,
    content:  document.getElementsByClassName('body-content')[0].value
  }

  fetch('http://localhost:5005/thread', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } 
    
    else {

      // Get and display the details of created threads and threads present on the dashboard
      getThreadDetail(data.id, 0, 'create', localStorage.getItem('token'),undefined);
      localStorage.setItem('threadId', data.id);
      document.getElementById('create-thread-screen').style.display = 'none';
    }
  })
}

// Function to fetch all threads from the server
const getAllThread = (startIndex,model,token,threadNumber,nameUserId) => {
  fetch(`http://localhost:5005/threads?start=${startIndex}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      alert(data.error);
    } else {
      
      // Hide individual main container if threadNumber is 0
      if (threadNumber === 0)
        document.getElementById('individual-main-container').style.display = 'none';
      else
        // Pass the array of accepted thread IDs into the function
        solveThreadData(startIndex,data,model,token,threadNumber,nameUserId);
    }
  });
};

//Performs different generation depending on the incoming generation mode
const solveThreadData = (startIndex,data,model,token,threadNumber,nameUserId) => {
  const promises = [];

  //ThreadNumber is generally used for deleting threads and creating threads, maintaining the number of threads
  if (threadNumber !== undefined){

    //When the thread number is greater than 0, it means that there are still threads in the threads that have not been spawned.
    if(threadNumber - data.length > 0){

      // Iterate through the fetched data and push promises to fetch thread details
      for (let i = 0; i < data.length; i++) {
        promises.push(getThreadDetail(data[i], startIndex, model, token,i));

        //Points to the newest thread after deletion
        if (startIndex === 0 && model === 'deleteThread' && i===0)
          localStorage.setItem('threadId', data[0]);
      }
      

      threadNumber -= data.length;

      //If the length of the array is equal to 5 it means that there are more threads in the thread list of the back-end thread, and you can continue iterating to generate them.
      if (data.length === 5)
        getAllThread(startIndex + 5,model,token,threadNumber)
    }

    //For this loop, all thread contents will be generated
    else{
      for (let i = 0; i < threadNumber; i++) {
        promises.push(getThreadDetail(data[i], startIndex, model, token,i));
      }

      threadNumber -= data.length;
    }
  }

  else {

    for (let i = 0; i < data.length; i++) {        
      promises.push(getThreadDetail(data[i], startIndex, model, token,i,nameUserId));
    }
  }

  Promise.all(promises)
    .then(threadDetails => {
      threadDetails.forEach(threadDetail => {
        if (threadDetail) {
          createOneThread(threadDetail, model,nameUserId);
        } 
    });
  })

  //Generate all threads created by this user, if it's a user or admin watch show all threads, otherwise show only public threads
  if (model === 'userScreen' && data.length === 5){
    getAllThread(startIndex + 5,model,token,undefined,nameUserId)
  }
}

// Function to fetch thread details
const getThreadDetail = (threadId,startIndex,model,token,i,nameUserId) => {
  return fetch(`http://localhost:5005/thread?id=${threadId}`, {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${token}`
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.error) {
      alert(data.error);
    } 
    else {
      //Delete thread and then update the page to the latest thread
      if (startIndex === 0 && i === 0 && model === 'deleteThread'){
        updateThreadContent(data);
        createEditContent(data);
        refreshComment(data.id)
        localStorage.setItem('threadId', data.id);
      }

      if (model !== 'create')
        if (model === 'userScreen'){

          //Ensure that only threads for this user are displayed
          if (data.creatorId === nameUserId)
            return data;
        }

        else
          return data;

      else{

        //When the user creates a thread, go to the individual thread page
        goToIndividualThreadScreen(data,model);
      }
    }
  });
}

//Creating a single thread
const createOneThread = (data,model,nameUserId) => {

  if (model === 'dashboardScreenThread'){

    const newThreadContainer = document.createElement('div');
    newThreadContainer.classList.add('one-thread-container');
    
    const oneThreadContentDiv = document.createElement('div');
    oneThreadContentDiv.classList.add('one-thread-content');
    
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('one-thread-title');
    titleDiv.textContent = data.title;
    
    oneThreadContentDiv.appendChild(titleDiv);
    
    const authorDateLikeBoxDiv = document.createElement('div');
    authorDateLikeBoxDiv.classList.add('author-date-like-box');
    
    const authorDiv = document.createElement('div');
    authorDiv.classList.add('one-thread-author');
    authorDiv.setAttribute('id', 'author' + data.id);
    getUserDetail(data.creatorId,"dashboard",data.id);

    const postTimeDiv = document.createElement('div');
    postTimeDiv.classList.add('one-thread-post-date');
    postTimeDiv.innerText = timeAgo(data.createdAt);
    
    const likeSymbolDiv = document.createElement('div');
    likeSymbolDiv.classList.add('one-thread-like-symbol');
    likeSymbolDiv.textContent = '\u2764';
    
    const numberDiv = document.createElement('div');
    numberDiv.classList.add('one-thread-number');
    numberDiv.textContent = numberDiv.textContent = data.likes.length;
    
    authorDateLikeBoxDiv.appendChild(authorDiv);
    authorDateLikeBoxDiv.appendChild(postTimeDiv);
    authorDateLikeBoxDiv.appendChild(likeSymbolDiv);
    authorDateLikeBoxDiv.appendChild(numberDiv);
    
    oneThreadContentDiv.appendChild(authorDateLikeBoxDiv);
    
    newThreadContainer.appendChild(oneThreadContentDiv);
    
    //Add a click event to each thread to go to the individual thread screen after the click
    newThreadContainer.addEventListener('click', () => {
      goToIndividualThreadScreen(data,undefined);

      //Set the specific thread ID of the click to make it easier to update the thread content
      localStorage.setItem('threadId', data.id);

      //Whether or not the user is following the thread will change the monitoring icon
      if(data.watchees.includes(parseInt(localStorage.getItem('userId')))){
        document.getElementsByClassName('watch-eye')[0].style.display = 'block';
        document.getElementsByClassName('watch-eye')[1].style.display = 'none';
      }

      else{
        document.getElementsByClassName('watch-eye')[0].style.display = 'none';
        document.getElementsByClassName('watch-eye')[1].style.display = 'block';
      }
    });
    document.getElementsByClassName('all-thread-container')[0].appendChild(newThreadContainer);
  }

  //Generating User Interface Threads
  else if (model === 'userScreen'){
    const userThreadContainer = document.createElement('div');
    userThreadContainer.classList.add('user-screen-thread-container');
    
    const userThreadContent = document.createElement('div');
    userThreadContent.classList.add('user-screen-thread-content');
    
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('user-screen-thread-title');
    titleDiv.innerText = data.title

    const likeCommentNumberContainer = document.createElement('div');
    likeCommentNumberContainer.classList.add('like-comment-number-contianer');
    
    const likeSymbolDiv = document.createElement('div');
    likeSymbolDiv.classList.add('user-screen-like-symbol');
    likeSymbolDiv.textContent = '\u2764';

    const commentSymbolImg = document.createElement('img');
    commentSymbolImg.src = 'comment.png';
    commentSymbolImg.classList.add('comment-img');
    commentSymbolImg.alt = 'comment icon';
    
    const userThreadLikeNumberDiv = document.createElement('div');
    userThreadLikeNumberDiv.classList.add('user-thread-like-number');
    userThreadLikeNumberDiv.textContent = data.likes.length

    const userThreadCommentNumberDiv = document.createElement('div');
    userThreadCommentNumberDiv.classList.add('user-thread-comment-number');
    userThreadCommentNumberDiv.setAttribute('id', 'comment-number' + data.id);

    //Get the thread comment count and set it
    getCommentList(data.id,model);

    const OneUserThreadContent = document.createElement('div');
    OneUserThreadContent.className = 'one-user-thread-content';
    OneUserThreadContent.innerText = data.content

    userThreadContent.appendChild(titleDiv);
    userThreadContent.appendChild(likeCommentNumberContainer);
    userThreadContent.appendChild(OneUserThreadContent);

    likeCommentNumberContainer.appendChild(likeSymbolDiv);
    likeCommentNumberContainer.appendChild(userThreadLikeNumberDiv);
    likeCommentNumberContainer.appendChild(commentSymbolImg);
    likeCommentNumberContainer.appendChild(userThreadCommentNumberDiv);
    
    userThreadContainer.appendChild(userThreadContent);
    document.getElementById('user-all-thread-container').appendChild(userThreadContainer);

    //Setting the user's personal page data
    getUserDetail(nameUserId,"userScreen",undefined);
  }

  //When the generated thread is an individual thread
  else{
    const individualThreadContainer = document.createElement('div');
    individualThreadContainer.classList.add('individual-screen-thread-container');

    const individualThreadContent = document.createElement('div');
    individualThreadContent.classList.add('individual-screen-thread-content');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('individual-screen-thread-title');
    titleDiv.innerText = data.title;

    const authorDiv = document.createElement('div');
    authorDiv.classList.add('individual-screen-thread-author');
    authorDiv.innerText = data.id;
    authorDiv.setAttribute('id', 'individual-author' + data.id);
    getUserDetail(data.creatorId,"individual",data.id);


    const postDateDiv = document.createElement('div');
    postDateDiv.classList.add('individual-screen-thread-post-date');
    postDateDiv.innerText = timeAgo(data.createdAt);

    const likeNumberContainer = document.createElement('div');
    likeNumberContainer.classList.add('individual-screen-like-number-container');

    const likeSymbolDiv = document.createElement('div');
    likeSymbolDiv.classList.add('individual-screen-thread-like-symbol');
    likeSymbolDiv.textContent = '\u2764';

    const likeNumberDiv = document.createElement('div');
    likeNumberDiv.classList.add('individual-screen-thread-number');
    likeNumberDiv.textContent = data.likes.length;

    likeNumberContainer.appendChild(likeSymbolDiv);
    likeNumberContainer.appendChild(likeNumberDiv);

    individualThreadContent.appendChild(titleDiv);
    individualThreadContent.appendChild(authorDiv);
    individualThreadContent.appendChild(postDateDiv);
    individualThreadContent.appendChild(likeNumberContainer);

    individualThreadContainer.appendChild(individualThreadContent);

    individualThreadContainer.addEventListener('click', () => {

      //Updates are displayed by clicking threads
      updateThreadContent(data);
      //Change the default data displayed on the thread page to the content of the clicked thread
      createEditContent(data);
      //Change the silent data displayed in the comments section to the content of the clicked thread
      refreshComment(data.id)

      //Removes the user's name container on the thread content, preventing click events from being added multiple times
      document.getElementById('name-container').removeChild(document.querySelector('.name-text'));

      const nameText = document.createElement('div');
      nameText.className = 'name-text';
      document.getElementById('name-container').appendChild(nameText);

      //Change the user name displayed by thread and add a click event
      document.getElementsByClassName('name-text')[0].innerText = document.getElementById('individual-author' + data.id).innerText   
      document.getElementsByClassName('name-text')[0].addEventListener('click', () => {
        goToUserScreen(parseInt(localStorage.getItem('userId')),data.creatorId,localStorage.getItem('token'))
      })

      localStorage.setItem('threadId', data.id);

      //Close the Edit thread page after editing the thread
      document.getElementById('individual-thread-screen').style.display = 'flex';
      document.getElementById('edit-screen').style.display = 'none';

      //Change the status of the like icon and the monitor icon depending on whether the user likes and monitors the thread
      if (data.likes.includes(parseInt(localStorage.getItem('userId')))){
        document.getElementsByClassName('heart')[0].style.color = 'red';
        document.getElementsByClassName('heart')[0].style.webkitTextStroke = 'unset';
      }
      else{
        document.getElementsByClassName('heart')[0].style.color = 'transparent';
        document.getElementsByClassName('heart')[0].style.webkitTextStroke = '1px black';
      }

      if(data.watchees.includes(parseInt(localStorage.getItem('userId')))){
        document.getElementsByClassName('watch-eye')[0].style.display = 'block';
        document.getElementsByClassName('watch-eye')[1].style.display = 'none';
      }

      else{
        document.getElementsByClassName('watch-eye')[0].style.display = 'none';
        document.getElementsByClassName('watch-eye')[1].style.display = 'block';
      }
      
      //Hide edit and delete buttons when the user is not the thread creator or administrator, otherwise show buttons
      if (`${localStorage.getItem('userId')}` != `${data.creatorId}` && `${localStorage.getItem('admin')}` === 'false') {
        document.getElementsByClassName('comment-edit-delete-button')[0].style.display = 'none';
        document.getElementsByClassName('comment-edit-delete-button')[1].style.display = 'none';
      }
    
      else{
        document.getElementsByClassName('comment-edit-delete-button')[0].style.display = 'flex';
        document.getElementsByClassName('comment-edit-delete-button')[1].style.display = 'flex';
      }
    
    });

    document.getElementById('individual-all-thread-container').appendChild(individualThreadContainer);
  }
}

//Updates the content displayed in the main content section of the current thread
const updateThreadContent = (data) => {
  document.getElementsByClassName('individual-like-number')[0].innerText = data.likes.length;
  document.getElementById('main-content-text').innerText = data.content;
  document.getElementById('main-title').innerText = data.title;
  getUserDetail(data.creatorId,"image",localStorage.getItem('token'));

  if (data.likes.includes(parseInt(localStorage.getItem('userId')))){
    document.getElementsByClassName('heart')[0].style.color = 'red';
    document.getElementsByClassName('heart')[0].style.webkitTextStroke = 'unset';
  }
  else{
    document.getElementsByClassName('heart')[0].style.color = 'transparent';
    document.getElementsByClassName('heart')[0].style.webkitTextStroke = '1px black';
  }

  if(data.watchees.includes(parseInt(localStorage.getItem('userId')))){
    document.getElementsByClassName('watch-eye')[0].style.display = 'block';
    document.getElementsByClassName('watch-eye')[1].style.display = 'none';
  }

  else{
    document.getElementsByClassName('watch-eye')[0].style.display = 'none';
    document.getElementsByClassName('watch-eye')[1].style.display = 'block';
  }
  if (data.lock === true)
    localStorage.setItem('lock', true);
  else
    localStorage.setItem('lock', false);
}

//A single individual thread screen appears when a user creates a thread on the dashboard, clicks a thread, or submits a thread change
const goToIndividualThreadScreen = (data,condition) => {
  document.getElementById('individual-thread-screen').style.display = 'flex';
  document.getElementById('dashboard').style.display = 'none';

  //If the thread content is edited, counting the number of threads ensures that existing threads are not reloaded
  const startIndex = document.querySelectorAll('.individual-screen-thread-container').length;    

  const model = 'individualScreenThread';  
  
  document.getElementsByClassName('heart')[0].textContent = '\u2764';

  if (data.likes.includes(parseInt(localStorage.getItem('userId')))){
    document.getElementsByClassName('heart')[0].style.color = 'red';
    document.getElementsByClassName('heart')[0].style.webkitTextStroke = 'unset';
  }
  else{
    document.getElementsByClassName('heart')[0].style.color = 'transparent';
    document.getElementsByClassName('heart')[0].style.webkitTextStroke = '1px black';
  }

  if(data.watchees.includes(parseInt(localStorage.getItem('userId')))){
    document.getElementsByClassName('watch-eye')[0].style.display = 'block';
    document.getElementsByClassName('watch-eye')[1].style.display = 'none';
  }

  else{
    document.getElementsByClassName('watch-eye')[0].style.display = 'none';
    document.getElementsByClassName('watch-eye')[1].style.display = 'block';
  }   

  updateThreadContent(data);
  createEditContent(data);

  //When threads on the dashboard are greater than 5, set the scroll list height to the entire page
  if (document.querySelectorAll('.individual-screen-thread-container').length < document.querySelectorAll('.one-thread-container').length && document.querySelectorAll('.one-thread-container').length !== 5)
    document.getElementById('individual-all-thread-container').style.height = '100%';
  let length = document.querySelectorAll('.one-thread-container').length

  //When the case is create thread, generate one more thread
  if (condition === 'create')
    length += 1

  getAllThread(startIndex,model,localStorage.getItem('token'),length)

  if (`${parseInt(localStorage.getItem('userId'))}` !== `${data.creatorId}` && `${localStorage.getItem('admin')}` === 'false') {
    document.getElementsByClassName('comment-edit-delete-button')[0].style.display = 'none';
    document.getElementsByClassName('comment-edit-delete-button')[1].style.display = 'none';
  }

  else{
    document.getElementsByClassName('comment-edit-delete-button')[0].style.display = 'flex';
    document.getElementsByClassName('comment-edit-delete-button')[1].style.display = 'flex';
  }

  if (document.getElementsByClassName('name-text')[0])
    document.getElementsByClassName('name-text')[0].remove();

  const nameText = document.createElement('div');
  nameText.className = 'name-text';
  document.getElementById('name-container').appendChild(nameText);

  //Update the displayed user name according to different situations
  if (condition != 'create'){
    document.getElementsByClassName('name-text')[0].innerText = document.getElementById('author' + data.id).innerText;
  } 
  else {
    document.getElementsByClassName('name-text')[0].innerText = getUserDetail(data.creatorId,"create"); 
  }
  document.getElementsByClassName('name-text')[0].addEventListener('click', () => {
    goToUserScreen(parseInt(localStorage.getItem('userId')),data.creatorId,localStorage.getItem('token'))
  })

  //Update the comments for this thread
  refreshComment(data.id);

  const userId = parseInt(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

  //Prevent duplicate add click event, delete first and add again
  if (document.getElementById('individul-go-to-user-profile'))
    document.getElementById('individul-go-to-user-profile').remove();
  
  const childElement = document.createElement('div');
  childElement.id = 'individul-go-to-user-profile';
  childElement.textContent = 'Go To Your Profile';  
  document.getElementById('individual-main-container').insertAdjacentElement('afterbegin', childElement);

  document.getElementById('individul-go-to-user-profile').addEventListener('click', () => {
    document.getElementById('individual-thread-screen').style.display = 'none';
    document.getElementById('user-screen').style.display = 'flex';
    goToUserScreen(userId, userId, token);
  });

  //Get thread lock status and save
  if (data.lock === true)
    localStorage.setItem('lock', true);
  else
    localStorage.setItem('lock', false);
}

//Update or create the content displayed by the current thread
const createEditContent = (data) => {
  document.getElementById('edit-title-input').value = data.title;
  document.getElementById('edit-content-input').value = data.content;
  document.getElementsByClassName('public-check-box')[1].checked = data.isPublic;


  if (data.lock !== undefined) {
    document.getElementsByClassName('public-check-box')[2].checked = data.lock;
  } else {
    document.getElementsByClassName('public-check-box')[2].checked = false;
  }
}

const showEditContent = () => {
  document.getElementById('individual-thread-screen').style.display = 'none';
  document.getElementById('edit-screen').style.display = 'flex';
}

//Commit changes to thread content
const saveEdit = () => {
  const body = {
    id: parseInt(localStorage.getItem('threadId')),
    lock: document.getElementsByClassName('public-check-box')[2].checked,
    title: document.getElementById('edit-title-input').value,
    isPublic: document.getElementsByClassName('public-check-box')[1].checked,
    content: document.getElementById('edit-content-input').value
  }
  fetch('http://localhost:5005/thread', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);

      //Return to the individual Threads screen if an error occurs
      document.getElementById('individual-thread-screen').style.display = 'flex';
      document.getElementById('edit-screen').style.display = 'none';
      refreshThreadContainers('individualScreenThread');
      document.getElementById('main-content-text').innerText = body.content;
      document.getElementById('main-title').innerText = body.title;
    } 
    
    else {
      document.getElementById('individual-thread-screen').style.display = 'flex';
      document.getElementById('edit-screen').style.display = 'none';
      refreshThreadContainers('individualScreenThread');
      document.getElementById('main-content-text').innerText = body.content;
      document.getElementById('main-title').innerText = body.title;
    }
  })
  if (document.getElementsByClassName('public-check-box')[2].checked === true)
    localStorage.setItem('lock', true);
  else
    localStorage.setItem('lock', false);
}

const deleteThread = () => {
  const body = {
    id : parseInt(localStorage.getItem('threadId'))
  }
  fetch('http://localhost:5005/thread', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } 
    
    else {
      refreshThreadContainers('deleteThread');
    }
  })  
}

const refreshThreadContainers = (model) => {
  let threadNumber = document.querySelectorAll('.individual-screen-thread-container').length;

  //When there is only one thread and it is deleted, ensure that no threads are created
  if (model === "deleteThread" && threadNumber === 1){
    threadNumber = 0;
  }

  //Regenerate all threads
  const individualThreadContainers = document.querySelectorAll('.individual-screen-thread-container');
  individualThreadContainers.forEach(container => {
    container.remove();
  });
  getAllThread(0, model, localStorage.getItem('token'), threadNumber);
};

//Returns the change in the current user's favorite state for the thread
const likeChange = () => {
  const dataPromise = getThreadDetail(parseInt(localStorage.getItem('threadId')), undefined, undefined, localStorage.getItem('token'), undefined);
  dataPromise.then(data => {
    if (data.lock === true)
      alert('Thread Locked')
    else{
      let heartCondition = true;

      //If the like flag is red before clicking, set the current like status to fasle
      if(document.getElementsByClassName('heart')[0].style.color === 'red')
        heartCondition = false;
      const body = {
        id: parseInt(localStorage.getItem('threadId')),
        turnon: heartCondition
      };

      
      fetch('http://localhost:5005/thread/like', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } 
        
        else {

          //Change the current like icon status to reverse, and change the number of likes displayed
          if(document.getElementsByClassName('heart')[0].style.color === 'red'){
            document.getElementsByClassName('heart')[0].style.color = 'transparent';
            document.getElementsByClassName('heart')[0].style.webkitTextStroke = '1px black';
            document.getElementsByClassName('individual-like-number')[0].innerText = parseInt(document.getElementsByClassName('individual-like-number')[0].innerText) - 1;
          }
          else{
            document.getElementsByClassName('heart')[0].style.color = 'red';
            document.getElementsByClassName('heart')[0].style.webkitTextStroke = 'unset';
            document.getElementsByClassName('individual-like-number')[0].innerText = parseInt(document.getElementsByClassName('individual-like-number')[0].innerText) + 1;
          }

          refreshThreadContainers();
        }
      })
    }
  });
}

const watchChange = () => {
  let watchCondition = true;

  //If the current viewing flag is a monitor icon, set the monitoring status after clicking to false
  if(document.getElementsByClassName('watch-eye')[0].style.display === 'block')
    watchCondition = false;
  const body = {
    id: parseInt(localStorage.getItem('threadId')),
    turnon: watchCondition
  };

  fetch('http://localhost:5005/thread/watch', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } 
    
    else {
      if(watchCondition === true){
        document.getElementsByClassName('watch-eye')[0].style.display = 'block';
        document.getElementsByClassName('watch-eye')[1].style.display = 'none';
      }
      else{
        document.getElementsByClassName('watch-eye')[0].style.display = 'none';
        document.getElementsByClassName('watch-eye')[1].style.display = 'block';
      }
      refreshThreadContainers();
    }
  });
}

//Set unlimited scrolling on the dashboard
const scrollHandler = () => {

  const allThreadContainer = document.getElementsByClassName('all-thread-container')[0];
  //Gets the distance from the bottom of the scroll bar to the bottom of the thread list
  const distance = document.querySelectorAll('.one-thread-container').length * 100 - (allThreadContainer.scrollTop + allThreadContainer.clientHeight);

  //If the distance is 0, load five new threads
  if (distance === 0) {
    if (allThreadContainer.clientHeight === 490) {
      allThreadContainer.style.height = '92.9%';
    }
    const startIndex = document.querySelectorAll('.one-thread-container').length;
    getAllThread(startIndex, 'dashboardScreenThread', localStorage.getItem('token'));
  }
}

const individualScrollHandler = () => {

  const allThreadContainer = document.getElementById('individual-all-thread-container');
  const distance = document.querySelectorAll('.individual-screen-thread-container').length * 100 - (allThreadContainer.scrollTop + allThreadContainer.clientHeight);
  if (distance === 0) {
    if (allThreadContainer.clientHeight === 490) {
      allThreadContainer.style.height = '100%';
    }
    const startIndex = document.querySelectorAll('.individual-screen-thread-container').length;
    getAllThread(startIndex, 'individualScreenThread', localStorage.getItem('token'),undefined);
  }
}

//Obtain personal data of users
const getUserDetail = (userId,model,id) => {
  fetch(`http://localhost:5005/user?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } 
    
    else {

      //When a user reviews, update the data on the review
      if (model === "comment") {
        if (data.image != null)
          document.getElementById('user-image' + id).src = data.image;
        if (localStorage.getItem('userId') != data.id && localStorage.getItem('admin') === 'false'){
          document.getElementById('edit-button' + id).style.display = 'none'
          document.getElementById('delete-button' + id).style.display = 'none'
        }
        document.getElementById('name-text' + id).innerText = data.name;
      }

      //Set the name of each thread user on the dashboard
      else if(model === "dashboard")
          document.getElementById('author' + id).innerText = data.name;
      //Sets the user name that each thread contains on the individual screen
      else if (model === "individual")
          document.getElementById('individual-author' + id).innerText = data.name;
      //Set the user's personal data
      else if (model === "userScreen"){
        document.getElementsByClassName('email-content')[0].innerText = 'Email: ' + data.email;
        document.getElementsByClassName('name-content')[0].innerText = 'Name: ' + data.name;
        document.getElementsByClassName('admin-content')[0].innerText = 'Adimin: ' + data.admin;
        //Displays if the user has set a profile picture
        if (data.image != null)
          document.getElementById('user-img').src = data.image;
        if (localStorage.getItem('admin') === 'true'){
          if (parseInt(localStorage.getItem('userId')) === userId)
            if (document.getElementsByClassName('admin-content')[0].innerText === 'Adimin: false')
              document.getElementById("update-permission-container").style.display = 'none';
            else
              document.getElementById("update-permission-container").style.display = 'flex'
          else
            document.getElementById("update-permission-container").style.display = 'flex';
        }
        
        else{
          document.getElementById("update-permission-container").style.display = 'none'
        }
      }
      //If a thread is created, the name of the creator of the newly created thread is displayed
      else if (model === "create"){
        document.getElementsByClassName('name-text')[0].innerText = data.name;
      }
      //Set the user profile picture for creating the current thread
      else if (model === "image"){
        document.getElementsByClassName('individual-user-image')[0].src = data.image;
      }
      //Set the user permission status that is selected by default in the drop-down list that administrators see
      else if (model === "select"){
        if (data.admin === false)
          document.getElementById("user-permission").selectedIndex = 0;
        else
          document.getElementById("user-permission").selectedIndex = 1;
      }
      //Read and save the current user permission status after registration or login
      else{
        localStorage.setItem('admin', data.admin);
      } 
    }
  });
};

const getCommentList = (threadId,model) => {
  fetch(`http://localhost:5005/comments?threadId=${threadId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } 
    
    else {
      if (model === 'userScreen'){
        document.getElementById('comment-number' + threadId).textContent = data.length;
      }

      else{
        //Sort comments based on when they were created
        data.sort(compareCreatedAt);

        for (let i = 0;i < data.length;i++){
          if (data[i].parentCommentId === null)
            createAllComment(data,data[i],null);
        }
      }
    }
  });
};

const createAllComment = (allData,data,fatherNodeId) => {
  const commentContainer = document.createElement('div');
  commentContainer.className = 'one-comment-container';
  
  const imageContainer = document.createElement('div');
  imageContainer.className = 'image-name-container';
  
  const userImageContainer = document.createElement('div');
  userImageContainer.className = 'user-image-container';
  const userImage = document.createElement('img');
  userImage.className = 'individual-user-image';
  userImage.alt = 'Avatar';
  userImageContainer.appendChild(userImage);
  userImage.setAttribute('id', 'user-image' + data.id);

  const nameTimeContainer = document.createElement('div');
  nameTimeContainer.className = 'name-time-container';
  const nameText = document.createElement('div');
  nameText.className = 'name-text';
  nameText.setAttribute('id', 'name-text' + data.id);
  nameText.addEventListener('click', () => {
    goToUserScreen(parseInt(localStorage.getItem('userId')),data.creatorId,localStorage.getItem('token'));
  })

  const timeText = document.createElement('div');
  timeText.className = 'time-text';
  timeText.innerText = timeAgo(data.createdAt);
  nameTimeContainer.appendChild(nameText);
  nameTimeContainer.appendChild(document.createElement('br'));
  nameTimeContainer.appendChild(timeText);
  
  imageContainer.appendChild(userImageContainer);
  imageContainer.appendChild(nameTimeContainer);
  
  const likeContentContainer = document.createElement('div');
  likeContentContainer.className = 'comment-like-content-part';
  
  const likeContainer = document.createElement('div');
  likeContainer.className = 'like-container';
  const smallHeart = document.createElement('div');
  smallHeart.className = 'small-heart';
  smallHeart.textContent = '\u2764';
  smallHeart.setAttribute('id', 'small-heart' + data.id);

  const likeNumber = document.createElement('div');
  likeNumber.className = 'comment-like-number';
  likeNumber.innerText = data.likes.length
  likeNumber.setAttribute('id', 'comment-like-number' + data.id);

  smallHeart.addEventListener('click', () => {
    commentLikeChange(data.threadId,data.id);
  });

  if (data.likes.includes(parseInt(localStorage.getItem('userId')))){
    smallHeart.style.color = 'red';
    smallHeart.style.webkitTextStroke = 'unset';
  }

  likeContainer.appendChild(smallHeart);
  likeContainer.appendChild(likeNumber);
  
  const commentContentText = document.createElement('div');
  commentContentText.className = 'comment-content-text';
  
  commentContentText.innerText = data.content;

  likeContentContainer.appendChild(likeContainer);
  likeContentContainer.appendChild(commentContentText);
  
  const rowContainer = document.createElement('div');
  rowContainer.className = 'comment-row-container';
  
  const replyButton = document.createElement('button');
  replyButton.type = 'button';
  replyButton.className = 'reply-button';
  replyButton.textContent = 'Reply';

  replyButton.addEventListener('click', () => {
    showReply(data.id);
  });

  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.className = 'comment-edit-button';
  editButton.textContent = 'Edit';
  editButton.setAttribute('id', 'edit-button' + data.id);

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'comment-edit-button';
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute('id', 'delete-button' + data.id);
 
  deleteButton.addEventListener('click', () => {
    deleteComment(data.id,data.threadId);
  });

  rowContainer.appendChild(replyButton);
  rowContainer.appendChild(editButton);
  rowContainer.appendChild(deleteButton);

  const textContainer = document.createElement('div');
  textContainer.className = 'comment-text-container';
  textContainer.setAttribute('id', 'text-container' + data.id);

  const commentTextarea = document.createElement('textarea');
  commentTextarea.className = 'comment-content';
  commentTextarea.setAttribute('id', 'comment-content' + data.id);

  const cancelCommentButtonContainer = document.createElement('div');
  cancelCommentButtonContainer.className = 'cancel-comment-button-container';
  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.className = 'cancel-button';
  cancelButton.textContent = 'Cancel';
  const commentButton = document.createElement('button');
  commentButton.type = 'button';
  commentButton.className = 'comment-button';
  commentButton.textContent = 'Comment';
  
  cancelButton.addEventListener('click', () => {
    closeReply(data.id);
  });

  commentButton.addEventListener('click', () => {
    createNewComment(data.threadId,data.id,"creteMore");
  });

  cancelCommentButtonContainer.appendChild(cancelButton);
  cancelCommentButtonContainer.appendChild(commentButton);
  
  textContainer.appendChild(commentTextarea);
  textContainer.appendChild(cancelCommentButtonContainer);
  
  const editTextContainer = document.createElement('div');
  editTextContainer.className = 'edit-comment-text-container';
  editTextContainer.setAttribute('id', 'edit-container' + data.id);

  const editCommentTextarea = document.createElement('textarea');
  editCommentTextarea.className = 'edit-comment-content';
  editCommentTextarea.setAttribute('id', 'edit-content' + data.id);
  editCommentTextarea.value = data.content;

  const editCancelCommentButtonContainer = document.createElement('div');
  editCancelCommentButtonContainer.className = 'cancel-comment-button-container';
  const editCancelButton = document.createElement('button');
  editCancelButton.type = 'button';
  editCancelButton.className = 'edit-cancel-button';
  editCancelButton.textContent = 'Cancel';
  const editCommentButton = document.createElement('button');
  editCommentButton.type = 'button';
  editCommentButton.className = 'edit-comment-button';
  editCommentButton.textContent = 'Comment';
  
  editButton.addEventListener('click', () => {
    showEdit(data.id);
  });

  editCancelButton.addEventListener('click', () => {
    closeEdit(data.id);
  });

  editCommentButton.addEventListener('click', () => {
    updateComment(data.id,data.threadId);
  });

  editCancelCommentButtonContainer.appendChild(editCancelButton);
  editCancelCommentButtonContainer.appendChild(editCommentButton);
  
  editTextContainer.appendChild(editCommentTextarea);
  editTextContainer.appendChild(editCancelCommentButtonContainer);
  
  const childNode = document.createElement('div');
  childNode.className = 'child-node';
  childNode.setAttribute('id', 'child' + data.id);

  commentContainer.appendChild(imageContainer);
  commentContainer.appendChild(likeContentContainer);
  commentContainer.appendChild(rowContainer);
  commentContainer.appendChild(document.createElement('br'));
  commentContainer.appendChild(textContainer);
  commentContainer.appendChild(editTextContainer);
  commentContainer.appendChild(childNode);
  commentContainer.setAttribute('id', 'comment' + data.id);

  getUserDetail(data.creatorId,"comment",data.id);
  if (fatherNodeId === null){
    document.getElementById('thread-content-container').insertAdjacentElement('afterend', commentContainer);
  }

  else{
    const parentContainer = document.getElementById('child' + fatherNodeId );

    if (parentContainer.childElementCount === 0) {
      parentContainer.appendChild(commentContainer);
    } 
    
    else {
      parentContainer.insertBefore(commentContainer, parentContainer.firstChild);
    }
  }
  for (let i = 0; i < allData.length; i++) {
    if (allData[i].parentCommentId === data.id){
      createAllComment(allData,allData[i],data.id)
    }
  }
}

const showReply = (id) => {
  document.getElementById('text-container' + id).style.display = 'flex'
  document.getElementById('edit-container' + id).style.display = 'none'
}

const showEdit = (id) => {
  document.getElementById('edit-container' + id).style.display = 'flex'
  document.getElementById('text-container' + id).style.display = 'none'
}

const closeReply = (id) => {
  document.getElementById('text-container' + id).style.display = 'none'
}

const closeEdit = (id) => {
  document.getElementById('edit-container' + id).style.display = 'none'
}

const addComment = (threadId, parentId, contentText) => {
  const body = {
    id: threadId,
    content: contentText,
    threadId: threadId,
    parentCommentId: parentId
  };

  fetch('http://localhost:5005/comment', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } 
    else {
      if (parentId != null)
        document.getElementById('text-container' + parentId).style.display = 'none';
      refreshComment(threadId);
    }
  });
};

const createNewComment = (threadId, parentId, model) => {
  if (localStorage.getItem('lock') != 'true') {
    let contentText = '';
    if (parentId != null) {
      contentText = document.getElementById('comment-content' + parentId).value;
    } else {
      contentText = document.getElementById('input-comment-content').value;
    }

    if (contentText === '') {
      alert("Your comment cannot be empty");
    } 
    
    else {
      if (model !== "creteMore") {
        threadId = localStorage.getItem('threadId');
        parentId = null;
      }
      addComment(threadId, parentId, contentText);
    }
  } 
  
  else {
    alert("Thread Lock Cannot Add New Comments");
  }
};

const updateComment = (commentId,threadId) => {
  if (document.getElementById('edit-content' + commentId).value === ""){
    alert("Your comment cannot be empty");
  }
  else {
    let commentContent = document.getElementById('edit-content' + commentId).value

    const body = {
      "id": commentId,
      "content": commentContent
    }
    fetch('http://localhost:5005/comment', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } 
      
      else {
        //Refresh the comments section after the update
        refreshComment(threadId)
      }
    });
  }
}

const deleteComment = (commentId,threadId) => {
  if (localStorage.getItem('lock') != 'true'){
    const body = {
      id: commentId,
    }
    fetch('http://localhost:5005/comment', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
      } 
      
      else {
        //Refresh the comments section after deletion
        refreshComment(threadId)
      }
    });
  }
  else
    alert("Thread Locking Cannot Delete Comments")
}

const refreshComment = (threadId) => {
  const commentContainers = document.querySelectorAll('.one-comment-container');
  commentContainers.forEach(container => {
    container.remove();
  });
  document.getElementById('input-comment-content').value = "";
  getCommentList(threadId);
}

//Compare comment creation times
const compareCreatedAt = (commentA, commentB) => {
  const dateA = new Date(commentA.createdAt);
  const dateB = new Date(commentB.createdAt);

  if (dateA < dateB) {
      return -1;
  }
  if (dateA > dateB) {
      return 1;
  }
  return 0;
};

const commentLikeChange = (threadId,commentId) => {
  let heartCondition = true;

  if(document.getElementById('small-heart' + commentId).style.color === 'red')
    heartCondition = false;
  const body = {
    id: commentId,
    turnon: heartCondition
  };
  fetch('http://localhost:5005/comment/like', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } 
    
    else {
      if(document.getElementById('small-heart' + commentId).style.color === 'red'){
        document.getElementById('small-heart' + commentId).style.color = 'transparent';
        document.getElementById('small-heart' + commentId).style.webkitTextStroke = '1px black';
        document.getElementById('comment-like-number' + commentId).innerText = parseInt(document.getElementById('comment-like-number' + commentId).innerText) - 1;
      }

      else{
        document.getElementById('small-heart' + commentId).style.color = 'red';
        document.getElementById('small-heart' + commentId).style.webkitTextStroke = 'unset';
        document.getElementById('comment-like-number' + commentId).innerText = parseInt(document.getElementById('comment-like-number' + commentId).innerText) + 1;
      }
      refreshComment(threadId); 
    }
  });
}

const goToUserScreen = (userId,nameUserId,token) => {
  const model = 'userScreen'

  document.getElementById('individual-thread-screen').style.display = 'none';
  document.getElementById('user-screen').style.display = 'flex';
  getAllThread(0,model,token,undefined,nameUserId);
  getUserDetail(nameUserId,"select",undefined); 

  if (userId != nameUserId)
    document.getElementById("update-button").style.display = 'none';

  //Prevent multiple add click events
  if (document.getElementById("update-permission-button"))
    document.getElementById("update-permission-button").remove();

  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.textContent = "Update Permission";
  button.id = "update-permission-button";
  document.getElementById('update-permission-container').appendChild(button);

  document.getElementById('update-permission-button').addEventListener('click', function() {
    updatePermission(nameUserId);
  });
  if (userId === nameUserId)
    getUserDetail(userId,model); 
  else
    getUserDetail(nameUserId,model); 
}

const updateUserData = (userData) => {
  fetch('http://localhost:5005/user', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } 
    else {
      const threadContainers = document.querySelectorAll('.user-screen-thread-container');
      threadContainers.forEach(container => {
        container.remove();
      });

      // Close the update table after the update is successful
      document.getElementsByClassName("user-update-container")[0].style.display = 'none';
      goToUserScreen(parseInt(localStorage.getItem('userId')), parseInt(localStorage.getItem('userId')), localStorage.getItem('token'));
    }
  });
};

const updateUserInformation = () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (document.getElementsByClassName('update-content')[2].value === ''){
    alert("Name Cannot Be Empty")
  }
  else{
    if (file) {
      fileToDataUrl(file)
        .then(dataUrl => {
          const userData = {
            email: document.getElementsByClassName('update-content')[0].value,
            password: document.getElementsByClassName('update-content')[1].value,
            name: document.getElementsByClassName('update-content')[2].value,
            image: dataUrl 
          };
          updateUserData(userData);
        });
    } else {
      const userData = {
        email: document.getElementsByClassName('update-content')[0].value,
        password: document.getElementsByClassName('update-content')[1].value,
        name: document.getElementsByClassName('update-content')[2].value,
        image: ' ' 
      };
      updateUserData(userData);
    }
    document.getElementsByClassName('update-content')[0].value = '';
    document.getElementsByClassName('update-content')[1].value = '';
    document.getElementsByClassName('update-content')[2].value = '';
    document.getElementById('fileInput').value = '';
  }  
};

const showUpdateForm = () => {
  document.getElementsByClassName("user-update-container")[0].style.display = 'flex';
 }

const updatePermission = (id) => {
  let condition = false;

  if (document.getElementById("user-permission").value === 'admin')
    condition = true;

  const body = {
    userId: id,
    turnon: condition 
  }
  fetch('http://localhost:5005/user/admin', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      alert(data.error);
    } 
    else {
      const threadContainers = document.querySelectorAll('.user-screen-thread-container');

      threadContainers.forEach(container => {
        container.remove();
      });

      goToUserScreen(parseInt(localStorage.getItem('userId')), id, localStorage.getItem('token'));
    }
  });
 }

//Set the creation time to a fixed format
const timeAgo = (createdAt) => {
  const now = new Date();
  const commentTime = new Date(createdAt);
  const pastTime = (now - commentTime) / 1000;
  const minutes = Math.floor(pastTime / 60);
  const hours = Math.floor(pastTime / 3600);
  const days = Math.floor(pastTime / 86400);
  const weeks = Math.floor(pastTime / 604800);

  switch (true) {
    case weeks > 0:
        return `${weeks} weeks ago`;
    case days > 0:
        return `${days} days ago`;
    case hours > 0:
        return `${hours} hours ago`;
    case minutes > 0:
        return `${minutes} minutes ago`;
    default:
        return 'Just now';
  }
};

const cancelUpdate = () => {
  document.getElementsByClassName('user-update-container')[0].style.display = 'none';
}

document.getElementsByClassName("submit-button")[0].addEventListener('click', checkLogin);

document.getElementById('go-to-register-button').addEventListener('click', goToRegisterPage);

document.getElementsByClassName("submit-button")[1].addEventListener('click', checkRegister );

document.getElementById('log-out-button').addEventListener('click', logOut);

document.getElementById('create-button').addEventListener('click', goToCreatePage);

document.getElementById('create-sumbit-button').addEventListener('click', createThread);

document.getElementsByClassName('comment-edit-delete-button')[0].addEventListener('click', showEditContent);

document.getElementById('save-button').addEventListener('click', saveEdit);

document.getElementsByClassName('comment-edit-delete-button')[1].addEventListener('click', deleteThread);

document.getElementsByClassName('heart')[0].addEventListener('click', likeChange);

document.getElementsByClassName('watch-eye')[0].addEventListener('click', watchChange);

document.getElementsByClassName('watch-eye')[1].addEventListener('click', watchChange);

document.getElementsByClassName('all-thread-container')[0].addEventListener('scroll', scrollHandler);

document.getElementById('individual-all-thread-container').addEventListener('scroll', individualScrollHandler);

document.getElementById('input-comment-button').addEventListener('click', createNewComment);

document.getElementById('update-button').addEventListener('click', showUpdateForm);

document.getElementsByClassName("img-change-submit-information-button")[0].addEventListener('click', cancelUpdate);

document.getElementsByClassName("img-change-submit-information-button")[1].addEventListener('click', updateUserInformation);

