-- +goose Up
-- +goose StatementBegin
CREATE
OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN
    NEW .updated_at = CURRENT_TIMESTAMP;

RETURN NEW;

END;

$$ LANGUAGE plpgsql;

CREATE TRIGGER update_todos_updated_at BEFORE
UPDATE
    ON todos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- +goose StatementEnd
-- +goose Down
-- +goose StatementBegin
DROP TRIGGER IF EXISTS update_todos_updated_at ON todos;

DROP FUNCTION IF EXISTS update_updated_at_column();

-- +goose StatementEnd