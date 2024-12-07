CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    completed BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks (title, completed) VALUES
('Write documentation', false),
('Set up issue board', true);