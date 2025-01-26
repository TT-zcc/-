## 0. Change Log

* 11/03: Fixed up due date / Moved `insertAdjacentHTML from able to use to prohibited`
* 11/03: Updated milestone 3 watching thread wordings and milestone 4 description
* 15/03: URL fragments clarified + removal of unique URL requirement
* 16/03: Clarified thread list pagination in milestone 3 that was explained in lectures; Clarified for 2.6.3. that watching is in relation to watching threads and not users + added a hint to help; Removed `2.3.1` requirement about unique URL; Reinforced (which can be inferred from API some admin permissions.
* 18/03: Clarified in relation to what to do when there are comments on the thread - a very minor update
* 25/03: Clarified that there isn't a way to click on a user's name from a like

## 1. start

### 1.1. Background & Motivation

Web-based applications are becoming the most common way to build a digital capability accessible to a mass audience. While there are modern tools that help us build these rapidly, it's important to understand the fundamental JavaScript-based technology and architectures that exist, both to gain a deeper understanding for when these skills may be needed, but also to simply understand the mechanics of fundamental JS. Even when working with a high level framework like ReactJS, understanding (in-concept) the code that it is transpiled to will ensure you're a more well rounded web-based engineer.

This assignment consists of building a **frontend** website in Vanilla JS (no ReactJS or other frameworks). This frontend will interact with a RESTful API HTTP backend that is built in JavaScript (NodeJS express server) and provided to you.

A theoretical background on how to interface with this API can be found the "promises & fetch" lecture.

The web-based application you build is required to be a single page app (SPA). Single page apps give websites an "app-like feeling", and are characterised by their use of a single full load of an initial HTML page, and then using AJAX/fetch to dynamically manipulate the DOM without ever requiring a full page reload. In this way, SPAs are generated, rendered, and updated using JavaScript. Because SPAs don’t require a user to navigate away from a page to do anything, they retain a degree of user and application state. In short, this means you will only ever have `index.html` as your HTML page, and that any sense of "moving between pages" will just be modifications of the DOM. Failure to implement your site as a single page app will result in significant penalties.

### 1.2. Lectures to watch

You will _need_ to watch at least the following lectures before starting (it will help you get started):
 * Everything from assesssment 2
 * [CSS Frameworks](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/css-frameworks)

You will _need_ to watch at least the following lectures to finish the assessment completely:
 * [Local storage](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/javascript-browser-localstorage)
 * [Events & Callbacks](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/javascript-async-callbacks)
 * [Promises](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/javascript-async-promises)
 * [AJAX Introduction](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/ajax-intro)
 * [Fetch](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/ajax-fetch)
 * [UI Fundamentals](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/ui-fundamentals)
 * [Perceivability](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility-perceivability)
 * [Operability](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility-operability)
 * [Understandability](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility-understandability)
 * [Robustness](https://cgi.cse.unsw.edu.au/~cs6080/24T1/content/lectures/accessibility-robustness)

## 2. The Task (Frontend)

Your task is to build a frontend for a UNSW rip-off version of the popular forum [EdStem](https://edstem.com/). You will of course be familiar with this application - it is the forum we use for this course!

UNSW's rip-off of Qanda is called "Qanda". However, you don't have to build the entire application. You only have to build the frontend. The backend is already built for you as an express server built in NodeJS (see section 3.2).

Instead of providing visuals of what the frontend (your task) should look like, we instead are providing you with a number of clear and short requirements about expected features and behaviours.

The requirements describe a series of **screens**. Screens can be popups/modals, or entire pages. The use of that language is so that you can choose how you want it to be displayed. A screen is essentially a certain state of your web-based application.

### 2.1. Milestone 1 - Registration & Login (10%)

Milestone 1 focuses on the basic user interface to register and log in to the site.

#### 2.1.1. Login
 * When the user isn't logged in, the site shall present a login form that contains:
   * an email field (text)
   * a password field (password)
   * submit button to login
 * When the submit button is pressed, the form data should be sent to `POST /auth/login` to verify the credentials. If there is an error during login an appropriate error should appear on the screen.

#### 2.1.2. Registration
 * When the user isn't logged in, the login form shall provide a link/button that opens the register form. The register form will contain:
   * an email field (text)
   * a name field (text)
   * a password field (password)
   * a confirm password field (password) - not passed to the backend, but an error should be shown on submit if it doesn't match the other password
   * submit button to register
 * When the submit button is pressed, if the two passwords don't match the user should receive an error popup. If they do match, the form data should be sent to `POST /auth/register` to verify the credentials. If there is an error during registration an appropriate error should appear on the screen.

#### 2.1.3. Error Popup
 * Whenever the frontend or backend produces an error, there shall be an error popup on the screen with a message (either a message derived from the backend error response, or one meaningfully created on the frontend).
 * This popup can be closed/removed/deleted by pressing an "x" or "close" button.

#### 2.1.4. Dashboard
 * Once a user has registered or logged in, they should arrive on the dashboard
 * For now, the dashboard will be a blank screen that contains only a "logout" button visible at all times.
 * When this logout button is pressed, it removes the token from the state of the website (e.g. local storage) and then sends the user back to the login screen

### 2.2. Milestone 2 - Making Threads (15%)

Milestone 2 focuses on how to make a thread and then view that thread (along with others).

#### 2.2.1. Making a thread

> **What is a fold?**
> Above the fold content is the part of a web page shown before scrolling. Any content you'd need to scroll down to see, would be considered 'below the fold'. The 'fold' is where the browser window ends, but the content continues underneath ([source](https://www.optimizely.com/optimization-glossary/above-the-fold)).

* Somewhere above the fold, on every page, there should be a button that says "Create" that takes you to a new screen.
  * This new screen should occupy the entire page excluding any header or footers
  * On this screen contains an input field for title, content, and whether or not the thread is private
  * This screen should also contain some form of submit button
* The submit button creates a new thread via `POST /thread`, and once the request returns successfully, returns a user to an new screen that shows that thread (2.2.3)

#### 2.2.2. Getting a list of threads

* When you are on the dashboard, a list of threads should appear (with `GET /threads`) on the left hand side of the page
  * The width of this list should be no more than `400px`.
* It contains a list of threads where each thread is captured in a box no taller than `100px`.
  * Each box should contain the thread title, the post date, the author, and the number of likes.
* Because the API of `GET /threads` returns elements 5 at a time (discussed in lectures), you will need to automatically load the full list one at a time. Section `2.6.1` covers how you can get some extra marks for doing this with an infinite scroll, but for `2.2.2` to get the marks all you need to do is have a `more` button that each time it's clicked, it loads another 5, until no more items are left, then the button disappears.

#### 2.2.3. Individual thread screen

* When a particular thread is clicked on in the side bar, or after a thread is created, you are taken to an "individual thread screen".
* This individual thread screen should include the list of threads on the left (`2.2.2`) but the main page body content should contain information on threads that includes:
  * Title
  * Body content
  * Number of likes
* This page will later on include things like edit, delete, like, watch, comments etc, but you can skip this for `2.2.3`.

### 2.3. Milestone 3 - Thread Interactions (10%)

Milestone 3 focuses on how to interact with threads once they've been made

#### 2.3.1. Editing a thread

* On an individual thread screen, the user should see a "edit" button somewhere above the fold that allows them to edit the thread (e.g. by new page or modal).
* On this screen contains an input field for title, content,  whether or not the thread is private, and whether or not a thread is locked. These fields are pre-populated based on the current thread data.
* This screen should also contain some form of save button
* When the save button is pressed, `PUT /thread` is called which updates the details, and when that request returns, the user is taken back to the individual thread page.
* The edit button only appears if the user is an admin or a creator of that thread.

#### 2.3.2. Deleting a thread

* On an individual thread screen, the user should see a "delete" button somewhere above the fold that allows them to delete the thread via `DELETE /thread`.
* The delete button only appears if the user is an admin or a creator of that thread.
* Once the thread delete request is returned, the screen should redirect to the latest individual thread post from the thread list.

#### 2.3.3. Liking a thread

* On an individual thread screen, the user should see a "like" action (button, icon) somewhere above the fold that allows them to like or unlike a thread via `PUT /thread/like`.
* If the thread is currently liked by this user, the button should imply visually that clicking it will unlike the thread. If the thread is currently not liked by this user, the button should visually imply clicking it will cause it to be liked.
* Any liking or unliking should reflect a change in the UI immediately.
* Locked threads cannot be liked.

#### 2.3.4. Watching a thread

* On an individual thread screen, the user should see a "watch" action (button, icon) somewhere above the fold that allows them to watch or unwatch a thread via `PUT /thread/watch`.
* If the thread is currently watched by this user, the button should imply visually that clicking it will unwatch the thread. If the thread is currently not watched by this user, the button should visually imply clicking it will cause it to be watched.
* Any watching or unwatching should reflect a change in the UI immediately.

### 2.4. Milestone 4 - Comments (15%)

Milestone 4 focuses on commenting features once the threads have been made.

#### 2.4.1. Showing comments

* When an individual thread screen loads, it should load all of the relevant comments from `GET /comments` that apply to that particular thread.
* These comments should be displayed as list on the page, where each comment shows:
  * The comment text
  * A profile picture for that user that commented
  * The time since commented in the format either
    * "Just now" if posted less than a minute ago, or
    * "[time] [denomination](s) ago" if posted more than a minute ago, e.g. "1 minute(s) ago" "7 hours ago". You move from 1-59 minutes, then 1-23 hours, then 1-6 days, then 1-N weeks where N can be a number of unlimited size.
    * The number of people who have liked the comment.
* Some comments have a parent that is another comment. These comments need to be nested under their parent comment. For each layer of nesting, there needs to be some kind of visual indentation.
* Comments must be sorted in reverse chronological order (most recent comments at the top of the page). Nested comments should be sorted within their nested area.

#### 2.4.2. Making a comment

* If there is no comments on the thread, an input/textarea box should appear below the thread information.
  * Underneath this box, a "Comment" button should exist
  * When the comment button is pressed, the text inside the text comment should be posted as a new comment for the thread at `POST /comment`.
  * If there are comments on the thread, an input/textarea box should appear but at the bottom of the comments instead.
* Each comment should have a "reply" text/button somewhere in the space that contains the comment info.
  * When this reply text/button is pressed, a modal should appear that contains an input/textarea box and "comment" button.
  * When the comment button is pressed, the text inside the text comment should be posted as a new comment for the thread at `POST /comment` and the modal should disappear.
* Locked threads cannot have a new comment added to them.

#### 2.4.3. Editing a comment

* Each comment should have an "edit" text/button somewhere in the space that contains the comment info.
* When this edit text/button is pressed, a modal should appear that contains an input/textarea box and "comment" button.
* The input/textarea box should contain the current comment text.
* When the comment button is pressed, the text inside the text comment should be posted as the updated comment for the thread at `PUT /comment` and the modal should disappear.
* To be able to edit a comment, the user has to be either the creator of the comment or an admin of the forum.

#### 2.4.4. Liking a comment

* Each comment should have a "like" text/button somewhere in the space that contains the comment info.
* If the comment is already liked, the text/button should say "unlike".
* When the "like" text/button is pressed, the comment moves into a liked state via `PUT /comment/like`. After this change, the liked counter should change.
* When the "unlike" text/button is pressed, the comment moves into a not-liked state via `PUT /comment/like`. After this change, the liked counter should change.

### 2.5. Milestone 5 - Handling Users (10%)

Milestone 5 focuses predominately on user profiles and admins manage other admin permissions.

#### 2.5.1. Viewing a profile

* Let a user click on a user's name from a thread or comment, and be taken to a profile screen for that user.
* The profile screen should contain any information the backend provides for that particular user ID via (`GET /user`) (excludes the user ID).
* The profile should also display all threads made by that person. The threads shown should show the title, content, number of likes and comments.

#### 2.5.2. Viewing your own profile
* Users can view their own profile as if they would any other user's profile
* A link to the users profile (via text or small icon) should be visible somewhere common on most screens (at the very least on the feed screen) when logged in.

#### 2.5.3. Updating your profile
* Users can update their own personal profile via (`PUT /user`). This allows them to update their:
  * Email address
  * Password
  * Name
  * Image (has to be uploaded as a file from your system)

#### 2.5.4. Updating someone as admin

* If the user viewing another user's profile screen is an admin, they should be able to see a dropdown that includes options "User" and "Admin".
* The option selected in the dropdown by default on the page should reflect the user's current admin status.
* Underneath the drop down, an "Update" button should exist, that when clicked, updates the user to that permission level.

### 2.6. Milestone 6 - Challenge Components (`advanced`) (5%)

#### 2.6.1. Infinite Scroll 
* Instead of pagination, users an infinitely scroll through a thread. For infinite scroll to be properly implemented you need to progressively load threads as you scroll. 

#### 2.6.2. Live Update
* If a user likes a thread or comments on a thread, the thread's likes and comments should update without requiring a page reload/refresh. This should be done with some kind of polling.

*Polling is very inefficient for browsers, but can often be used as it simplifies the technical needs on the server.*

#### 2.6.3. Push Notifications
* Users can receive push notifications when a new comment is posted on a thread they watch. 
* To know whether a new comment has been posted to a thread, you must "poll" the server (i.e. intermittent requests, maybe every second, that check the state). 
* You can implement this either via browser's built in notification APIs or through your own custom built notifications/popups. The notifications are not required to exist outside of the webpage.

_No course assistance in lectures will be provided for this component, you should do your own research as to how to implement this. There are extensive resources online._

### 2.7. Milestone 7 - Very Challenge Components (`advanced *= 2`) (5%)

#### 2.7.1. Static feed offline access
* Users can access the most recent feed they've loaded even without an internet connection.
* Cache information from the latest feed in local storage in case of outages.
* When the user tries to interact with the website at all in offline mode (e.g. comment, like) they should receive errors

_No course assistance will be provided for this component, you should do your own research as to how to implement this._

#### 2.7.2 Fragment based URL routing
Users can access different pages using URL fragments:
```
* `/#thread={threadId}` to access the individual thread screen of that particular `threadId`
* `/#profile` to view the authorised user's own profile
* `/#profile={userId}` to view the profile of the user with the particular `userId`
```

_No course assistance in lectures or on the forum will be provided for this component, you should do your own research as to how to implement this._

### 2.8. Bonus Marks (5%)

An extra 5% of the assignment can be attained via bonus marks, meaning a maximum mark of 105/100. Any bonus marks that extend your ass2 mark above 100% will bleed into other assignment marks, but cannot contribute outside of the 75% of the course that is allocated for assignment marks

Your bonus feature(s) can be anything. You just have to think of something that could make your web app stand out in some minor or major way. Simple examples would include just making sure that your user interface and user experience stands out amongst other students, maybe through some user testing.

You could also add extra features, such as some additional frontend form validations - the possibilities are limitless.

If you do implement a bonus feature, describe the feature and its details in `bonus.md` in the root directory of this repository.

## 3. Getting started

### 3.1. The Frontend

Stub code has been provided to help you get started in:
 * `frontend/index.html`
 * `frontend/styles/global.css`
 * `frontend/src/helpers.js`
 * `frontend/src/main.js`

You can modify or delete this stub code if you choose. It's simply here to potentially provide some help.

To work with your frontend code locally with the web server, you may have to run another web server to serve the frontend's static files.

To do this, run the following command once on your machine:

`$ npm install --global http-server`

Then whenever you want to start your server, run the following in your project's root folder:

`$ npx http-server frontend -c 1 -p [port]`

Where `[port]` is the port you want to run the server on (e.g. `8080`). Any number is fine.

This will start up a second HTTP server where if you navigate to `http://localhost:8000` (or whatever URL/port it provides) it will run your `index.html` without any CORs issues.

### 3.2. The Backend

You are prohibited from modifying the backend. No work needs to be done on the backend. It's provided to you simply to power your frontend.

The backend server can be cloned by running `git clone git@nw-syd-gitlab.cseunsw.tech:COMP6080/24T1/ass3-backend.git`. After you clone this repo, you must run `npm install` in the project once.

To run the backend server, simply run `npm start` in the backend project. This will start the backend.

To view the API interface for the backend you can navigate to the base URL of the backend (e.g. `http://localhost:5005`). This will list all of the HTTP routes that you can interact with.

We have provided you with a very basic starting database containing two users and one public channel with messages. You can look in `backend/database.json` to see the contents.

Your backend is persistent in terms of data storage. That means the data will remain even after your express server process stops running. If you want to reset the data in the backend to the original starting state, you can run `npm run reset` in the backend directory. If you want to make a copy of the backend data (e.g. for a backup) then simply copy `database.json`. If you want to start with an empty database, you can run `npm run clear` in the backend directory.

Once the backend has started, you can view the API documentation by navigating to `http://localhost:[port]` in a web browser.

The port that the backend runs on (and that the frontend can use) is specified in `frontend/src/config.js`. You can change the port in this file. This file exists so that your frontend knows what port to use when talking to the backend.

Please note: If you manually update database.json you will need to restart your server.

Please note: You CANNOT modify the backend source code for bonus marks.

### 3.3. Taking the first steps

This is how we recommend you start the assignment:
 1. Read the entire spec, including a thorough read of section 2 so you know what is ahead of you!
 2. Try to load up the `index.html` on your browser with a simple "Hello world" text just to sanity check you know what page you're trying to load.
 3. Plan out your UI by thinking about all of the key screens and what information they rely on
 4. Try to load up the backend and verify you've got it working by making a simple API call to `/feed` (which should return you an empty list)
 5. Good luck!

### 3.4. Making a fetch request

Here is some helpful starter code to make a POST request (for non-authenticated routes). Note: there are many other ways (and some cleaner than this) to do this, so don't assume this is perfect code. It will just help you get started.

```Javascript
const apiCall = (path, body) => {
    fetch('http://localhost:5005/' + path, {
	  method: 'POST',
	  headers: {
        'Content-type': 'application/json',
      },
	  body: JSON.stringify(body)
	})
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          resolve(data);
        }
      });
};
```

Here is some helpful starter code to make a GET request (for authenticated routes). Note: there are many other ways (and some cleaner than this) to do this, so don't assume this is perfect code. It will just help you get started.

```Javascript
const apiCall = (path, token, queryString) => {
    fetch('http://localhost:5005/' + path + '?' + queryString, {
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
          resolve(data);
        }
      });
};
```

## 4. Constraints & Assumptions

### 4.1. Javascript

 * You must implement this assignment in ES6-compliant Vanilla JavaScript. You cannot use ReactJS, JQuery, or other abstract frameworks. You can not, for example, use a popular Javascript framework such as <a href="https://angular.io/">Angular</a> or <a href="https://reactjs.org/">React</a>.
 * You may **NOT** directly use external JavaScript. Do not use NPM except to install any other development libraries without prior approval from course authority.

### 4.2. CSS and other libraries

 * You may use small amounts (&lt; 10 lines) of general purpose code (not specific to the assignment) obtained from a site such as Stack Overflow or other publically available resources. You should clearly attribute the source of this code in a comment with it. You can not otherwise use code written by another person.
 * You may include external CSS libraries in this assignment (with the `<link />` tag). You must attribute these sources (i.e. provide the URL/author in source code comments). For example, you are permitted to use the popular <a href="https://getbootstrap.com/">Bootstrap</a> CSS framework. Some Bootstrap functionality relies on accompanying Javascript. You are permitted to include this Javascript. The Javascript accompanying Bootstrap requires the popular general purpose Javascrpt library <a href="https://jquery.com/">jQuery</a>. You are permitted to include <b>jQuery</b> so bootstrap can use it. However you are not permitted to use <b>jQuery</b> in the code you write for the assignment.

### 4.3. Browser Compatibility

You should ensure that your programs have been tested on one of the following two browsers:
 * Locally, Google Chrome (various operating systems)
 * On CSE machines, Chromium

### 4.4. Other Requirements

 * The specification is intentionally vague to allow you to build frontend components however you think are visually appropriate. Their size, positioning, colour, layout, is in virtually all cases completely up to you. We require some basic criteria, but it's mainly dictating elements and behaviour.
 * This is not a design assignment. You are expected to show common sense and critical thinking when it comes to basic user experience and visual layout, but you are not required to be creative to achieve full marks.
 * Your web app must be a single page app. This means that there is only one initial browser load of content on one html page, and all subsequent dynamic changes to the page are based on Javascript DOM manipulation, and not through any page refreshes. If you do not build a single page app (e.g. using links to multiple HTML pages), you will receive a 50% penalty of your mark.

### 4.5. Static HTML, innerHTML, DOM manipulation

In this assignment, you are:
 * Add static HTML/CSS to the stub website provided (i.e. you can put raw HTML/CSS as if it's a static page, even if you then later manipulate it with JavaScript).
 * Build HTML elements and add CSS properties to the DOM via JavaScript.
 * Use `innerText` properties/functions

### 4.6. Prohibited Usages

* You are not allowed to have more than 1 HTML file in your repo.
* You are strictly **not** allowed to use the `async` and `await` syntax in this assignment. You must use Javascript Promises. The use of any `async` or `await` will result in a 50% penalty of your mark.
* You are prohibited from using any string-to-DOM parser (e.g. DOMParser, or the `innerHTML` property, or `insertAdjacentHTML` or anything similar). The use of any of this will result in a 50% penalty of your mark. You can read more about this [https://www.dhairyashah.dev/posts/why-innerhtml-is-a-bad-idea-and-how-to-avoid-it/](here).


