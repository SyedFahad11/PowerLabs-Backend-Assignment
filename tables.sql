-- User Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
);

-- Assignment Table
CREATE TABLE assignments (
    assignment_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP NOT NULL,
    total_score INTEGER NOT NULL,
    teacher_id INTEGER NOT NULL REFERENCES users(user_id),
);

-- Submission Table
CREATE TABLE submissions (
    submission_id SERIAL PRIMARY KEY,
    assignment_id INTEGER NOT NULL REFERENCES assignments(assignment_id),
    student_id INTEGER NOT NULL REFERENCES users(user_id),
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content TEXT,
    CONSTRAINT unique_submission UNIQUE (assignment_id, student_id)
);