-- name: CreateTodo :exec
INSERT INTO
    todos (content)
VALUES
    ($1) RETURNING id;