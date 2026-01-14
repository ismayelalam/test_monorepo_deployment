package routes

import (
	"database/sql"
	"todo/internal/handlers"

	"github.com/gofiber/fiber/v2"
)

type Routes struct {
	db       *sql.DB
	route    fiber.Router
	handlers *handlers.Handlers
}

func RegisterRoutes(route fiber.Router, db *sql.DB) *Routes {
	handlers := handlers.RegisterHandlers(db)
	return &Routes{
		db:       db,
		route:    route,
		handlers: handlers,
	}
}

func (r *Routes) SetupRoutes() {
	todo := r.route.Group("/todo")

	todo.Post("/", r.handlers.CreateTodo)
	todo.Get("/", r.handlers.GetTodo)
	todo.Patch("/", r.handlers.UpdateTodo)
	todo.Delete("/", r.handlers.DeleteTodo)
}
