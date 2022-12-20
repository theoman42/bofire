# Discord Clone Playoff

Welcome to my capstone project (still in development) that used discord as a main template. My hope is that my website will be a simplified discord cousin with a chat roulette funcitonality and free activities to enjoy with new friends you make online!

## HOW TO GET STARTED

<br/>

1. Clone Locally

<br/>

```
git clone https://github.com/theoman42/airbnb2.0.git
```

<br/>

2. Create a .env file in the backend directory

<br/>

- PORT= The Port the backend will run on.
- DB_FILE= Location of the database file
- JWT_SECRET= JWT Secret Key
- JWT_EXPIRES_IN= Period JWT Key is active before expiry

<br/>

3. Open up your project in VScode or any development environment and run the following command in the frontend, backend and the root directoy in order to load all dependencies.

<br/>

```
npm install
```

<br/>

4. Load models and seed the database.

<br/>

```
dotenv npx sequelize db:migrate
```

```
dotenv npx sequelize db:seed:all
```

<br/>

5. Once all dependencies are loaded, start both the backend and front end servers with the following command:

<br/>

```
npm start
```

<br/>

## Technologies:

---

- JavaScript
- HTML
- CSS
- React
- Redux
- Node.js
- Express.js
- Sequelize
- Sqlite3
- Heroku
- AWS

<br/>


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
