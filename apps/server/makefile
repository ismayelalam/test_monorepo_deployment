run: 
	go run -race ./cmd/api/main.go

migrations/new:
	@echo 'Creating migration files for ${name}'
	goose create -dir ./migrations ${name} sql 

.PHONY: migrations/up
migrations/up: 
	@echo 'Running up migrations...'
	@goose up --dir ./migrations 

.PHONY: migrations/down
migrations/down: 
	@goose down --dir ./migrations 
	
.PHONY: sqlc/generate
sqlc/generate:
	@echo "Generating SQLC..."
	@sqlc generate -f ./sqlc.json