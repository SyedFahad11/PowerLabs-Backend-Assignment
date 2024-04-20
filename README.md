Backend Task
Classroom Assignments!
Task:
Create a docker image for a micro-service with the below API endpoints:
● Authentication endpoint
● REST API endpoints for a Student Assignments app that manages student
assignments (details below)
Technologies:
● You are free to use any language (Java, Nodejs, Python, etc ..)
● You are free to use any RDBMS. NoSQL databases are not allowed.
● There are no restrictions on the frameworks to use / database design
schema. Choose whichever seems best suited for the task.
API Details:
1. Authentication endpoints for Login:
○ Treat the endpoint as a mock authentication service and accept any
username/password.
○ The request body can contain an arbitrary username/password pair.
○ Return a signed JSON Web Token (JWT, https://jwt.io/) which can be
used for validation of subsequent requests.
2. Assignment REST API endpoints:
○ Creates new assignment with data provided in the request body
○ Returns all assignments based on data provided in the request body
○ Updates assignment with data provided in the request body
○ Deletes the assignment
3. Create and publish the private docker image of the above micro-service on
any docker repository (Docker Hub, Amazon ECR, etc)
Important:
● Attach API documentation with a request which can be executed directly. You
can use Postam Collection, Swagger, etc for documentation.
● Attach README instructions that contain all required information
● SQL files to create required tables should be present in the project.
Bonus: Extra points for attempting this.
1. Add validation for existing API endpoints for enhanced security. For example,
the only teacher who created the assignment should be able to delete or
update the assignment. If the validation fails, the API should return an error
message.
2. Add the ability to filter and sort the student assignments like due date, total
score, etc.
3. Add the ability for students to submit the assignment
4. Add the ability for teachers to grade these assignments and view student
reports.
5. Send a notification email to students when an assignment is created.
6. Deploy the docker image on a third-party hosting service (Heroku,
DigitalOcean, AWS, etc)
7. Integrate caching layer mechanism (e.g., Redis) for reduced API latency
while fetching assignments.
Things we are interested in:
● Completeness of the APIs - authentication & survey
● Knowledge of REST APIs, SQL, and JWT & using libraries
● Your database design
● Modularity & readability of code
● Attention to detail and quality
