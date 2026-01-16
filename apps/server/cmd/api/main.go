package main

import (
	"fmt"
	"math/rand"
	"strconv"
	"todo/config"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/compress"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	cfg := config.AppConfig()
	app := fiber.New(fiber.Config{})

	// db, err := database.ConnectPostgresql(cfg.DB)
	// if err != nil {
	// 	fmt.Println(err)
	// 	// panic(err)
	// }
	// defer db.Close()

	app.Use(LoggerConfig())
	app.Use(helmet.New())
	app.Use(compress.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: config.FrontEndURL,
		AllowHeaders: "Origin, Content-Type, Accept, Authorization, Credentials",
		AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
	}))

	group := app.Group("/api")

	todo := group.Group("/todo")

	todo.Get("/rand", func(c *fiber.Ctx) error {
		num := rand.Intn(900000) + 100000
		return c.JSON(strconv.Itoa(num))
	})

	// routes := routes.RegisterRoutes(group, db)
	// routes.SetupRoutes()

	startServer(app, cfg.PortAddress)
}

func startServer(app *fiber.App, address string) {
	if err := app.Listen(address); err != nil {
		fmt.Println("error starting server: %w", err)
	}
}

func LoggerConfig() fiber.Handler {
	return logger.New(logger.Config{
		Format:     "${time} | ${method} | ${status} | ${path} | ${latency} | ${error} \n",
		TimeFormat: "15:04:05.00",
	})
}
