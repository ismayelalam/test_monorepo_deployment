package handlers

import (
	"database/sql"
	"fmt"
	"math/rand"
	"strconv"
	"todo/internal/services"
	"todo/internal/utils"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type Handlers struct {
	db       *sql.DB
	validate *validator.Validate
	services *services.Queries
}

type createData struct {
	Content string `json:"content" validate:"required,min=1,max=256"`
}
type updateData struct {
	Done *bool `json:"done" validate:"required" example:"true"`
}

func RegisterHandlers(db *sql.DB) *Handlers {
	return &Handlers{
		db:       db,
		validate: utils.Validator(),
		services: services.New(db),
	}
}

func (h *Handlers) RandomNumber(c *fiber.Ctx) error {
	num := rand.Intn(900000) + 100000
	return c.JSON(fiber.Map{
		"random_number": strconv.Itoa(num),
		"ip":            c.IP(),
		"xff":           string(c.Get(fiber.HeaderXForwardedFor)),
		"xreal":         string(c.Get("X-Real-IP")),
	})
}

func (h *Handlers) CreateTodo(c *fiber.Ctx) error {
	req := new(createData)

	// Parse and validate request
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if err := h.validate.Struct(req); err != nil {
		return err
	}

	err := h.services.CreateTodo(c.Context(), req.Content)
	if err != nil {
		return err
	}

	return c.SendStatus(fiber.StatusCreated)
}

func (h *Handlers) GetTodo(c *fiber.Ctx) error {
	allTodo, err := h.services.GetAllTodo(c.Context())
	if err != nil {
		return err
	}
	return c.JSON(allTodo)
}

func (h *Handlers) UpdateTodo(c *fiber.Ctx) error {
	todoId := c.Params("id")
	if todoId == "" {
		return fiber.ErrBadRequest
	}
	todoUUID, err := uuid.Parse(todoId)
	if err != nil {
		return fiber.ErrBadRequest
	}
	req := new(updateData)

	// Parse and validate request
	if err := c.BodyParser(req); err != nil {
		return err
	}
	if err := h.validate.Struct(req); err != nil {
		return err
	}

	err = h.services.UpdateTodo(c.Context(), services.UpdateTodoParams{
		ID:        todoUUID,
		Completed: *req.Done,
	})
	if err != nil {
		return err
	}
	return c.SendStatus(fiber.StatusOK)
}

func (h *Handlers) DeleteTodo(c *fiber.Ctx) error {
	todoId := c.Params("id")
	if todoId == "" {
		return fiber.ErrBadRequest
	}
	fmt.Println(todoId)
	todoUUID, err := uuid.Parse(todoId)
	if err != nil {
		return fiber.ErrBadRequest
	}
	fmt.Println(todoUUID)

	err = h.services.DeleteTodo(c.Context(), todoUUID)
	if err != nil {
		fmt.Println(err)
		return err
	}
	return c.SendStatus(fiber.StatusOK)
}
