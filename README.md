# team40
## TrashTag
### Phase 1 (Late 1 Day)
### Phase 2 (Late 1 Day)
### Building The Site
### `npm install` or `npm install --force`
Installs all requires packages that the project uses. Dependencies specifications in package.json

### `npm run build`

Builds the app for production to the `build` folder.<br />

### `npm start`

Runs the app in the development mode at [http://localhost:3000](http://localhost:3000) 

### Current Features

* A brief overview of our project's idea presented in our neatly arranged homepage, where pictures of trashtag users would be presented as highlights.
* Functional registration and login system(local).
* Hooked up Google Map functionality where users can place markers on the map.
* Request page where user(or guest) can supposedly request a specific place to be cleaned up, a sidebar to the left of the map shows the severity of pollution in an area.
* A map of current cleanup requests and the severity of the sites.
* A gallery of cleaned up places.
* A profile page for each user, and a page to look at other profiles by using /user/username
* A way to create requests
* A way to complete requests
* A way to see recent cleanups
* Finding the location of cleanup sites by name
* A way to edit your profile

### User Instructions
* Currently, it is not requires to require an account to make requests on the request page.
* The login credentials for debugging/testing the website is `user:user` or `admin:admin`
  * A successful registration should redirect you back to the login page where credentials should be saved for logging in.
  * A successful login should redirect you back to the homepage.
  * However, unsuccessful login/registration(user already exists or incorrect credentials) would do nothing and stays on the page you were on.
* Once logged in you can view your profile (picture, username, title, description), along with the cleanups you have done
  * You also gain the power to submit a cleanup request by placing a marker on the map and giving the name of the site you want cleaned up.
* Create a request by clicking on the map in create a request, fill in the fields, and upload a picture
    * This should refresh the page
* Complete a request by clicking on the request markers on any map, and uploading a finished photo of it
    * This should refresh the page
* Recent cleanups are on the home page
* To view all the cleanups that have been done go to the cleanups page
* On any map, clicking on the locations on the side will pan the map over to that location
* You can view your profile on the profile page
    * You will see your profile picture, username, quote, cleanups, and a counter of requests and cleanups
    * There will also be an edit button to take you to the edit profile page
    * Fill in your new quote, about me and new profile picture, or keep them as they are
    * Press finish editting to be redirected back to your profile, with it updated