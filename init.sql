-- Check if the 'users' table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'users') THEN
        -- Create the 'users' table
        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL
        );
    END IF;
END $$;

-- Check if the 'assignments' table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'assignments') THEN
        -- Create the 'assignments' table
        CREATE TABLE assignments (
            assignment_id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            due_date TIMESTAMP NOT NULL,
            total_score INTEGER NOT NULL,
            teacher_id INTEGER NOT NULL REFERENCES users(user_id)
        );
    END IF;
END $$;

-- Check if the 'submissions' table exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'submissions') THEN
        -- Create the 'submissions' table
        CREATE TABLE submissions (
            submission_id SERIAL PRIMARY KEY,
            assignment_id INTEGER NOT NULL REFERENCES assignments(assignment_id) ON DELETE CASCADE,
            student_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
            submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            content TEXT,
            CONSTRAINT unique_submission UNIQUE (assignment_id, student_id)
        );
    END IF;
END $$;
-- -- User Table
-- CREATE TABLE users (
--     user_id SERIAL PRIMARY KEY,
--     username VARCHAR(100) NOT NULL,
--     password VARCHAR(100) NOT NULL
-- );

-- -- Assignment Table
-- CREATE TABLE assignments (
--     assignment_id SERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     description TEXT,
--     due_date TIMESTAMP NOT NULL,
--     total_score INTEGER NOT NULL,
--     teacher_id INTEGER NOT NULL REFERENCES users(user_id)
-- );

-- -- Submission Table
-- CREATE TABLE submissions (
--     submission_id SERIAL PRIMARY KEY,
--     assignment_id INTEGER NOT NULL REFERENCES assignments(assignment_id) ON DELETE CASCADE,
--     student_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
--     submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     content TEXT,
--     CONSTRAINT unique_submission UNIQUE (assignment_id, student_id)
-- );

-- /*
-- drop table assignments cascade;
-- drop table submissions cascade;
-- drop table users cascade;
-- */
