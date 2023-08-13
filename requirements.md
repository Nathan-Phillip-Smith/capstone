# requirements for capstone

1. [x] Create a web server and configure Express.js
2. [x] Create a React/Vue app
3. [x] Establish communication between frontend and backend apps.
4. [x] Set up an authentication system using bcrypt, passport and jwt
5. [x] Set up database (MongoDB or Postgres)
6. [x] Create user model - username (unique, required), email (unique, required), hash, isAdmin, firstName, lastName, telephone, address, createDate
7. [x] Create course model - id, title, description, schedule, classroom_number, maximum_capacity, credit_hours, tuition_cost
8. [x] Create login page
9. [x] Create user registration page
10. [x] Create courses page
11. [x] Create user profile page
12. [x] Create admin page
13. [x] Create search feature for courses and users
14. [x] Create env variables
15. [ ] Configure logging (Winston/Morgan)
16. [x] Create client-side routes
17. [x] Create client-side route guard
18. [x] Create server-side routes
19. [x] Create server-side route guard
20. [x] Implement a loading icon
21. [ ] Sanitize inputs and ensure security
22. [x] Logout functionality
23. [x] Good directory and code structure
24. [x] Refactor as you go
25. [ ] Responsive design
26. [ ] Deploy application to render
27. [ ] Make messages disappear
28. [ ] Local Storage clear on header buttons

# Rubric

### User Registration Page: 10%

1. [x]Appropriate fields are included
2. [x]Data is stored and validated correctly
3. [x]Includes a link to the Login page

### Login Page: 10%

4. [x]User can log in and log out successfully
5. [x]Gracefully handles incorrect credentials
6. [x]Includes a link to the User Registration page

### User Profile Page: 10%

7. [x]Profile page is easy to use
8. [x]Data is stored and retrieved correctly
9. [x]User can update information successfully
10. [x]Correctly displays users schedule
11. [x]Correctly displays users total tuition fees.
12. [x]Correctly displays users total credit hours

### Course Pages: 10%

13. [x]Correctly displays information for all courses.
14. [x]Includes a search/filter feature
15. [x]Students can correctly register courses
16. [/]Students cannot register for courses that are full, or that they are already registered for.

### Administrator Pages: 10%

17. [x]Appropriate fields are included
18. [x]Includes a search/filter feature
19. [x]Data is stored and retrieved correctly
20. [/]Administrators can create, edit, and delete users successfully
21. [x]Administrators can create, edit, and delete courses successfully
22. [x]Administrators can register/unregister any user for any course

### Logging: 5%

23. [ ]Server correctly logs events
24. [ ]Logs are useful for finding errors in application

### Authentication System: 10%

25. [x]Authentication system is secure
26. [x]User passwords are encrypted
27. [x]client-side routes are guarded against users that are not logged in
28. [x]client-side admin routes are guarded against non-admin users
29. [x]server-side routes are guarded against users that are not logged in
30. [x]server-side admin routes are guarded against non-admin users

### Database: 10%

31. [x]Collections/Tables have correct data
32. [x]Collections/Tables have correct constraints
33. [x]Data is updated correctly
34. [ ]Inputs are correctly sanitized

### Deployment: 5%

35. [ ]Application is deployed correctly
36. [ ]Application is functional
37. [ ]Application is secure

### UX/UI Design: 10%

38. [ ]Application is visually appealing
39. [ ]Navigation is intuitive
40. [ ]Overall design is user-friendly
41. [ ]Includes responsive design
42. [ ]Includes loading icon

### Code Structure: 10%

43. [ ]Code is easy to navigate
44. [ ]Code is easy to read
45. [ ]Code is easy to understand
46. [ ]Code is correctly partitioned
