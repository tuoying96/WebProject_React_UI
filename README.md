# GroupProject_FateFour_UI

#### Project Name: 
**NEU Find My Roommate**
**Heroku Link:** of our application: https://findmyroommate.herokuapp.com/  

#### Project Goal:
Our goal is to help students in NEU to match roommates with each other. You can show your personal information on our application site and list your requirements for your potential roommates. Once you find some interesting people, you can start chatting with him/her.  

#### Development Repositories:
UI server link: <https://github.com/tuoying96/WebProject_React_UI>   
API server link: <https://github.com/tuoying96/WebProject_React_API> 


## Iter 3
In this iteration, we completed all the functionalities of our Application. And deployed it to Heorku.
Related Links:  
UI Heroku Link: https://findmyroommate.herokuapp.com   
API Heroku Link: https://webproject-api.herokuapp.com   
### Iteration 3 Deliverables:
- <b>Login/Register</b>:  
A user must use the @northeastern.edu email address to register an account in the website
 ![register-page](/readme_images/register_iter3.jpg)  
- <b>Personal Dashboard</b>:  
  1. User can edit their personal info in the Dashboard, including location, ZIP code, house style, rent and introduction
  ![personal-info](/readme_images/personal-info.jpg) 
  1. Further we developed an interactive interface to allow users to change their profile pic or head icon.
  ![home-page](/readme_images/personal-select.jpg)  

- <b>Message</b>:   
  1. In the Home page, user can choose a person and start chatting with him/her.
  ![home-page](/readme_images/message1.png) 
  2. In the Home page, user can go to the Message page to check who has sent messages
  ![home-page](/readme_images/message2.png) 
  3. Here is the Message page, user can choose a specific person in the message list and got to chat room
  ![message-page](/readme_images/message3.png) 
  4. In the chat room, user can send messages
  ![chat-page](/readme_images/message4.png) 
  
- <b>Home</b>:   
This pages should users' information and filter them based on your preference.
  1. All changes made in personal dashboard will be reflected on the home page. 
  2. Added three filters based on key words, gender, and rent range:
  ![home-page](/readme_images/home_iter3.jpg) 
  3. Click on other user's post and start chatting with other folks!


#### Members Contribution
##### Zhenke Xi: 
- On top on iter 2, Zhenke added info modification features in personal page, added the gender filter in home page.
- Fixed the bug for not loading environment variable successfully in React app.
- Added email address on registration page and added the associated field in the database schema.
- Fixed existing small bugs (missing field in the schema and unsuccessful immediate info display, etc.)

##### Ying Tuo: 
- Add SearchBar features in `/user-list`
- Solved the issu of HTTPS request blocked in `io.socket` of actions.js in redux DevTools.
- Developed CRUD module with Mongoose and MongoDB Atlas, and connected to MongoDB Atlas using Mongoose and Node.
- Deployed UI to Heroku using `http-proxy-middleware`, collaborating to solve the `proxy` issues in UI. 

##### Jiahui He: 
- Built a connection between the front and back end of socketio. Defined a new collection about message information in mongodb.
- Designed the api and router of obtaining message list information related to current user.
- Created `Chat` component and defined redux action of sending message request in front end as well as receiving message module in the back end. Ensured the `/char/&char_id` page to be successfully displayed.
- Improved `Message` component, displayed the grouped message list sorted by the time of receiving the message.
- Displayed the number of unread messages in the `Message` and `Chat` component.
- Helped fix the issue of socketio in the process of deploying app to Heroku.

##### Kuanwei Huang:
- Implemented 2 ways of filtering rent in home page 
- Created the popup window in personal page and let the user choose new icon
- Fixed the warning of preventDefault when draging the range component in home page


## Iter 2
In this iteration, we developed CRUD module of your application, and have an API capable of executing whatever `GET` and `POST` methods are necessary for our app's core functionality. beside, we developed our application on Heroku.  
Related Links:  
UI Heroku Link: https://findmyroommate.herokuapp.com   
API Heroku Link: https://webproject-api.herokuapp.com   
### Iteration 2 Deliverables:
- For Iteration 2, we start on developing CRUD module: Users can fill out their personal information in `/info` page, which is update operation in our MongoDB database.
- Our API is capable of executing `GET` and/or `POST` methods: `/register`, `/login`, `/info` pages use `POST` method to send users data to our database; while `/personal` page `GET` data from the database.
- Heroku deployment: We have pushed our API and UI repo to Heroku without breaking code. In UI part, we used `http-proxy-middleware` to solved CROS Error. 
#### Heroku deployment:
![register](/readme_images/iter2login.png) 
#### CRUD module:
The "test1" user update and send his information to our MongoDB database.
![register](/readme_images/iter2atlas.png) 
#### Members Contribution
##### Zhenke Xi: 
- Zhenke has been working on the backend API server which performs basic CRUD functionality on MongoDB and handles http request from the UI client.
- He helped fix bugs (setup database environment variables properly, etc.) and helped deploy the backend onto Heroku. 
- Zhenke will continue refactoring the backend server, for instance, eliminating unused fields in the schema and merging overlapped data models. Thus the backend server will be more light-weight and ready for production.

##### Ying Tuo: 
- Developed `/register`, `/login`, `/info` pages, `logo` and `header-selector` components and maintained `redux` component DevTools.
- Developed `UPDATE` operation in CRUD module with Mongoose and MongoDB Atlas, and connected to MongoDB Atlas using Mongoose and Node.
- Deployed UI to Heroku using `http-proxy-middleware`, collaborating to solve the `proxy` issues in UI. 

##### Jiahui He: 
- Developed main page of the whole website includs `/home`, `/message`, `/personal` pages. Created `Main`，`Home`，`Message`，`Personal`， `Nav`，`Not-Found` `UserList`components.
- Designed the api and router of obtaining user and user list information, ensured the `/personal` and `/home` page to be successfully displayed.
- Developed logout feature and ensured the function of automatic login by getting userid from cookie.

##### Kuanwei Huang:
- Implemented the ajax request using axios to send get and post request from ui to database
- Helped fix the schema of user information from UI to make it consistent with data schema in Database
- Collaborated to fix the setupProxy.js to successfully deploy the UI part on heroku and solve the CORS issue


## Iter 1
In this iteration, we develop the basic framework of our Application.  

Following is the instruction to test our application:  
1. Download our tagged commit
2. Ternimal 1: `cd api`   -> `npm install` -> `npm start` to run our API server and connect the database
3. Ternimal 2:`cd ui`   -> `npm install` -> `npm start` to run our UI server and test this Application
4. In your browser, openthis link: http://localhost:3000 to test


### Iteration 1 Deliverables:

- We used `Create React App` to creates our frontend build pipeline.
- For UI part, We completed the **main**, **login**, **register**, **information**, **personal dashboard** pages.  
- For UI part, we built the logic between these pages. Other pages, like the **message**, **home** pages, we build the framework of them, and will complete these pages in the next deliverables.  
- Now we can perform CURD on a mongo collection hosted on Atlas, which will store all user information. This application has been deployed on Heroku. (This API server is used for **production**, not test purpose in this `UI repo`)
- For test purposes, we connect MongoDB Altas cluster with mongoose in the `api` folder in this current `UI repo`.

### Functional Demo
[![Iter 1](https://res.cloudinary.com/marcomontalbano/image/upload/v1596224635/video_to_markdown/images/youtube--qoiwFh94DRA-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/qoiwFh94DRA "Iter 1")  
  
#### 1. Register: Create a user using the register button in the register page

![register](/readme_images/register.png)  

Test if the user created in the test database in MongoDB Atlas.
   
![atlas](/readme_images/atlas.png)  
  
Test if the user created in the production database using postman.  

![postman](/readme_images/postman.png)

#### 2. Login: If the user has already created an account
It is clear that in the Cookies, there is no `userid`, so you have to login or register at first.  
  
![register](/readme_images/login.png) 

#### 3. Personal Information: Fill out the un-required information int this page
Your can choose a lovely head icon in this part.  
  
<div><img width="400" src="/readme_images/info.png"/></div>   

#### 4. Personal Dashboard: Fill out the un-required information int this page
In this part, you can view you filled with personal information. In the next deliverables, we will add CRUD operation in this part, so the user can update their information.
In this interface, you can also see that the Cookies save the userid. And if you go back to the main page: http://localhost:3000, you will be ReDirectTo **personal dashboard**, instead of **login** page.  
  
![register](/readme_images/personal.png)   
