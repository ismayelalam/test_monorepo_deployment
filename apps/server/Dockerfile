FROM --platform=$BUILDPLATFORM golang:1.25-alpine AS builder
WORKDIR /app

# Copy Go modules
COPY apps/server/go.mod apps/server/go.sum ./
RUN go mod download

# Copy source
COPY apps/server/ .

# Build static binary
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main ./cmd/api

# Final minimal image
FROM alpine:latest

COPY --from=builder /app/main /main
COPY apps/server/start.sh /start.sh

# Make script executable
RUN chmod +x /main /start.sh

EXPOSE 8080

# Run the script (not the binary directly)
CMD ["/start.sh"]