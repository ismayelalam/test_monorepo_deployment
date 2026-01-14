package handlers

import (
	"database/sql"
	"todo/internal/services"
	"todo/internal/utils"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type Handlers struct {
	db       *sql.DB
	validate *validator.Validate
	services *services.Queries
}

func RegisterHandlers(db *sql.DB) *Handlers {
	return &Handlers{
		db:       db,
		validate: utils.Validator(),
		services: services.New(db),
	}
}

func (h *Handlers) CreateTodo(c *fiber.Ctx) error {
	return nil
}
func (h *Handlers) GetTodo(c *fiber.Ctx) error {
	return nil
}
func (h *Handlers) UpdateTodo(c *fiber.Ctx) error {
	return nil
}
func (h *Handlers) DeleteTodo(c *fiber.Ctx) error {
	return nil
}
