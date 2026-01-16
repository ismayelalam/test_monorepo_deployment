#!/bin/sh

goose up --dir ./migrations 

exec /main \
  -db-host="${DB_HOST}" \
  -db-port="${DB_PORT}" \
  -db-user="${DB_USER}" \
  -db-password="${DB_PASSWORD}" \
  -db-dbname="${DB_DBNAME}" \
  -db-sslmode="${DB_SSLMODE}" \
  -db-timezone="${DB_TIMEZONE}"