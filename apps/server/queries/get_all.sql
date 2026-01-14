-- name: GetAllTodo :exec
SELECT
    *
FROM
    todos
ORDER BY
    created_at DESC;