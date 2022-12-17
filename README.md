# Discord Clone Playoff

Welcome to my capstone project (still in development) that used discord as a main template. My hope is that my website will be a simplified discord cousin with a chat roulette funcitonality and free activities to enjoy with new friends you make online!

## Table Content

- Technologies Used
  - Postgres
  - SQLite
  - Sequelize
  - JavaScript
  - Redux
  - React
  - CSS
  - AWS

## Steps on getting started

1.  Pull the project to clone
2.  npm install dependencies
    1. To migrate and seed your database run the following
       - dotenv npx sequelize db:migrate
       - dotenv npx sequelize db:seed:all
3.  Run npm start in your backend folder to start the server
4.  Run npm start in your frontend folder to start your React App
5.  The application will start at http://localhost:3000/

## Screenshots of Usage

### Signup page

![image](https://befire.s3.us-west-1.amazonaws.com/Screen+Shot+2022-12-11+at+6.08.56+PM.png)

- Welcome to befire, you can sign up here to create your account. A random stock photo will be used for your profile if you do not choose to upload one.

### Login page

![image](https://befire.s3.us-west-1.amazonaws.com/Screen+Shot+2022-12-11+at+6.08.43+PM.png)

- Existing Users may login here.

### Landing page after login

![image](https://befire.s3.us-west-1.amazonaws.com/Screen+Shot+2022-12-11+at+6.23.14+PM.png)

- After Login you wll be presented with a plain site with your main navigation on the left the Anagrams start game button dead center.

### Adding a new home

![image](https://befire.s3.us-west-1.amazonaws.com/Screen+Shot+2022-12-11+at+6.27.54+PM.png)

- Select the plus button in the navigation to prompt an add home modal. Select an image and enter in the name of your new home!

### Navigation Bar with Homes

![image](https://befire.s3.us-west-1.amazonaws.com/Screen+Shot+2022-12-11+at+6.33.50+PM.png)

- Now that you have several homes, you can create rooms where you can interact with others!

### Creating a Room

![image](https://befire.s3.us-west-1.amazonaws.com/Screen+Shot+2022-12-11+at+6.35.46+PM.png)

- Enter in your room name, and describe what it's for! (Displaying the description is still in development)

### Messaging in a Room

![image](https://befire.s3.us-west-1.amazonaws.com/Screen+Shot+2022-12-11+at+6.38.45+PM.png)

- Now with your many rooms, select one toenter in. Once entered, it will show a light highlighting over the name. You can now message within each room!