GitHub Repository
---
[TaskAru](https://github.com/abang115/CEN3031)

Video Presentation
---
[Demo Video](https://youtu.be/iyA5ehS2ELQ)

Detail Work Completed in Sprint 4
---
Front-End

  - Made multiple calendar types for Personal, Work, and School purposes
  - Implemented calendar sharing with another user that will only get events of a specific calendar type
  - Updated edit, adding, and removing event to function with multiple calendars
  - Created notification bar with alerts when events are near
  - Added remember me functionality so user remains signed in when page is refreshed

Back-End

  - Added a Calendar struct storing the email of the calendar creator, the group id, calendar name, and shareability (email of those the calendar is shared with)
  - CalendarPatch, CalendarDelete, CalendarPost, and CalendarGet handler functions were implmented to handle requests to connect the front-end to the back-end
  - Configured and implemented unit tests for calendar functions and updated tests for the event functions
  - Updated event struct and event functions to implement shareability
  - Updated routing according to added functions

Frontend Unit Tests
---
 - Cypress e2e tests for navigation bar
   - Successfully tests whether website changes between light and dark mode
   - Successfully tests whether it visits the home/calendar page on start up
   - Successfully tests whether it visits the sign-in page when sign-in button is clicked
   - Successfully tests whether it visits the sign-up page when sign-up button is clicked
 - Cypress e2e tests for sign-in
   - Catches when a user attempts to press the sign-in button if no fields are entered
   - Successfully tests whether it visits sign-up page when sign-up link is clicked  
   - Successfully tests whether it visits forgot-password page when forgot-password link is clicked
   - Successfully tests whether it signs-in a user if their email and password are found in the database
   - Succesfully tests whether after a user signs-in, that they can sign-out
   - Successfully tests whether a user stays signed in after checking the remember me box and refreshing the page
   - Successfully tests whether notifications can be viewed when signed in
 - Cypress e2e tests for sign-up
   - Catches when a user attempts to press the sign-up button if no fields are entered
   - Successfully tests whether it registers a user if their email is not found in the database
   - Catches when a user attempts to register, but have non-matching passwords
 - Cypress e2e tests for forgot-password
   - Successfully tests whether a user enters a valid email and sends an email to that email with the reset password link
   - Catches when a user tries to submit an email that doesn't exist in the database
   - Catches when a user tries to submit without entering a valid email
 - Cypress e2e tests for reset-password
   -  Successfully tests whether a user is able to reset their password and sign in using that new password
   -  Catches when a attempts to submit the form, but have non-matching passwords
 - Cypress e2e tests for calendar functionality
   -  Successfully test users events are intially empty
   -  Successfully adds events to the calendar and backend 
   -  Successfully tests storing and displaying events
   -  Successfully creates user 2 and shares calender to them
   -  Successfully fetches shared calendar with user 1's name
 - Cypress component tests for sign-in
   - Successfully tests whether it mounts the sign-in component 
 - Cypress component tests for sign-up
   - Successfully tests whether it mounts the sign-up component
 - Cypress component tests for forgot-password
   - Successfully tests whether it mounts the forgot-password component
 - Cypress component tests for reset-password
   - Successfully tests whether it mounts the reset-password component
 - Cypress component tests for calendar
   - Successfully tests whether it mounts the calendar component
   - Successfully tests opening the add event modal 
   - Successfully tests filling out the event from, submitting, and creating a new event
   - Successfully tests opening an existing event modal
   - Tests opening the edit event modal
   - Tests changing an exisiting event
   - Tests removing an exisitng event

Backend Unit Tests
---

  - Unit tests for RegisterPostHandler()
    - Successfully registers a user when email and password are valid
    - Catches when a user attempts to register with an email that exists in the database
  - Unit tests for SignInPostHandler()
    - Successfully signs in a user when email and password are valid
    - Catches when a user attempts to sign in with the correct email, but wrong password
    - Catches when a user attempts to sign in with the wrong email, but right password
  - Unit tests for ForgotPasswordPostHandler()
    - Successfully sends an email to the user with a reset password link when the user enters a valid email 
    - Catches if email was not found in the database or if the token generated was not unique
  - Unit tests for ResetPasswordPatchHandler()
    - Successfully encrypts and saves the newly generated password to the database
    - Catches if the password was not able to properly be encrypted
  - Unit tests for EventPostHandler()
    - Successfully creates an event in the desired calendar using a email, title, description, date, start time, end time, frequency, date start for reoccuring events, date end for reoccuring events, and background color
    - Catches if the event was not created properly
  - Unit tests for EditEventPatchHandler()
    - Successfully edits an event in the desired calendar using a email, title, description, date, start time, end time, frequency, date start for reoccuring events, date end for reoccuring events, and background color
    - Catches if the event was not updated properly
  - Unit tests for ReceiveEventGetHandler()
    - Successfully sends events to the front end
    - Catches if the incorrect event data was sent
  - Unit tests for RemoveEventDeleteHandler()
    - Successfully deletes an event in the desired calendar using a email, title, description, date, start time, end time, frequency, date start for reoccuring events, date end for reoccuring events, and background color
    - Catches if the delete function was called
    - Catches if the event was not deleted properly
  - Unit tests for CalendarPostHandler()
    - Successfully creates a calendar in the desired account
    - Catches if the calendar was not created properly
  - Unit tests for EditCalendarPatchHandler()
    - Successfully edits a calendar using current users email to change the calendar name and shareability
    - Catches if the calendar name was properly changed
    - Catches if the calendar's shareability can be removed and added
  - Unit tests for CalendarGetHandler()
    - Successfully sends calendars to the front end
    - Catches if the incorrect calendar data was sent
      - If the calendar was owned by the user
      - If the calendar was shared to the user  
  - Unit tests for RemoveCalendarDeleteHandler()
    - Successfully deletes an event using email and group ID

Updated Documentation for Backend API
---

User Authentication Routes

URL: <code>/api/register</code>
  - Integrated RegisterPostHandler() function which is a <code>POST</code> request. This function allows the backend team to create new users on TaskAru and stores their first name, last name, email address, and password in the database. The function uses an empty User struct and stores the user's information into the database after hashing the password and checking if the email exists in the database already. If no error was found, then it sets the HTTP status code to 200 (OK). If the email was already found in the database, then it sets the HTTP status code to 409 (Conflict). If the password could not be hashed, then it sets the HTTP status code to 404 (Not Found).

URL: <code>/api/signin</code>
  - Integrated SignInPostHandler() function which is a <code>POST</code> request. This function allows the user to sign in to their account utlizing the information they registered with. When the user enters their email address and password the function checks whether they match and exist in the database. If the email address or password don't match, it will notify the user that either the email address or password is incorrect. If no error was found, then it sets the HTTP status code to 200 (OK). If the email was not found in the database, then it sets the HTTP status code to 404 (Not Found). If the password entered does not match the password associated with the entered email, then it sets the HTTP status code to 401 (Unauthorized). It then generates a new JWT token with the users email as the issues and a expiration date of 24 hours. It then encodes this JWT token and sends it to the frontend.

URL: <code>/api/forgotpassword</code>
  - Integrated ForgotPasswordPostHandler() function which is a <code>POST</code> request. This function saves an email and a random token generated by the RandomString() method to the forget password table in the database and sends an email using the SendEmail() function with a token and an unique link to a form. This will allow the user to reset their password using the ResetPasswordPatchHandler() function.

URL: <code>/api/resetpassword</code>
  - Integrated ResetPasswordPatchHandler() function which is a <code>PATCH</code> request. This function saves a password and searches for the last token associated with that email in the database and if found, encrypts the new password and updates it in the database.

URL: <code>/api/event</code>
  - Integrated EventPostHandler() function which is a <code>POST</code> request. This function allows the user to create an event in their desired calendar by entering in a email, title, description, date, start time, end time, frequency, date start for reoccuring events, date end for reoccuring events, and background color. The function uses an empty Event struct and stores the event's information into the database. If no error was found, then it sets the HTTP status code to 200 (OK).

URL: <code>/api/event</code>
  - Integrated EditEventPatchHandler() function which is a <code>PATCH</code> request. The function allows the user to edit any feature of the event in their calendar which includes the email, title, description, date, start time, end time, frequency, date start for reoccuring events, date end for reoccuring events, and background color. The function uses an empty Event struct, populates it according to the json provided by the front end. Utilizing the email, groupID, and the eventID, the event is searched for in the database. If the event cannot be found, then it sets the HTTP status code to 404 (Not Found). If the event is found, the function attempts to update the event in the database. If the event cannot be updated, the it sets the HTTP status code 500 (Internal Server Error). If no error was found, then it sets the HTTP status code to 200 (OK).

URL: <code>/api/event</code>
  - Integrated ReceiveEventGetHandler() function which is a <code>GET</code> request. The function allows front end to receive events that belong to a certain calendar from the database based on the user logged in (given by the email of the current user) and the groupID (which is the calendar's unique ID). The function queries the url for the email and groupID. It then attempts to locate events matching the given email and groupID from the query. If the event cannot be found, then it sets the HTTP status code to 404 (Not Found). If the event(s) is/are found they are returned. If no error was found, then it sets the HTTP status code to 200 (OK).

URL: <code>/api/event</code>
  - Integrated RemoveEventDeleteHandler() function which is a <code>DELETE</code> request. The function allows the user to indicate that the user wants to delete an event in their desired calendar using the email of the current user, the groupID of the calendar, and the eventID. The function uses an empty Event struct, populates it according to the json provided by the front end. Utilizing the email, groupID, and the eventID, the event is searched for in the database. If the event cannot be found, then it sets the HTTP status code to 404 (Not Found). If the event is found, the function attempts to delete the event in the database. If the event cannot be deleted, the it sets the HTTP status code 500 (Internal Server Error). If no error was found, then it sets the HTTP status code to 200 (OK).

URL: <code>/api/calendar</code>
  - Integrated CalendarPostHandler() function which is a <code>POST</code> request. This function allows the user to have three calendars (personal, work, and school) by passing in the signed in users email, name of the calendar (personal, work, and school), groupID, and email of those who the user wants to share the calendar with (defaulted to null). If no error was found, then it sets the HTTP status code to 200 (OK).

URL: <code>/api/calendar</code>
  - Integrated CalendarGetHandler() function which is a <code>GET</code> request. The function allows front end to receive calendar owned by and shared to the current user from the database (given by the email of the current user in either the email or shareAbility section of the calendar struct). The function queries the url for the email. It then attempts to locate calendars matching the given email from the query in the email or shareAbility section of the calendar struct . If the calendar cannot be found, then it sets the HTTP status code to 404 (Not Found). If the calendar(s) is/are found they are returned. If no error was found, then it sets the HTTP status code to 200 (OK).

URL: <code>/api/calendar</code>
  - Integrated EditCalendarPatchHandler() function which is a <code>PATCH</code> request. The function allows the features of the calendar which includes the name and shareability of the calendar. The function uses an empty Calendar struct, populates it according to the json provided by the front end. Utilizing the email and groupID the calendar is searched for in the database. If the calendar cannot be found, then it sets the HTTP status code to 404 (Not Found). If the calendar is found, the function attempts to update the calendar in the database. If the calendar cannot be updated, the it sets the HTTP status code 500 (Internal Server Error). If no error was found, then it sets the HTTP status code to 200 (OK).

URL: <code>/api/calendar</code>
  - Integrated RemoveCalendarDeleteHandler() function which is a <code>DELETE</code> request. The function allows front end to indicate that the user wants to delete a calendar using the email of the current user and the groupID of the calendar. The function uses an empty Calendar struct, populates it according to the json provided by the front end. Utilizing the email and groupID, the calendar is searched for in the database. If the calendar cannot be found, then it sets the HTTP status code to 404 (Not Found). If the calendar is found, the function attempts to delete the calendar in the database. If the calendar cannot be deleted, the it sets the HTTP status code 500 (Internal Server Error). If no error was found, then it sets the HTTP status code to 200 (OK).
