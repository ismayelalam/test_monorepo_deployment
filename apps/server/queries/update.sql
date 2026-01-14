-- name: UpdateTodo :exec
UPDATE
    todos
SET
    completed = $2
WHERE
    id = $1;