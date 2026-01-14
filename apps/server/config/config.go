package config

import (
	"flag"
	"fmt"
)

var (
	Port        int
	FrontEndURL string
)

func AppConfig() AllConfig {

	var cfg AllConfig

	flag.IntVar(&Port, "port", 8080, "API server port")
	flag.StringVar(&FrontEndURL, "frontend-url", "http://localhost:3210", "Front end URL")

	// Database config
	flag.StringVar(&cfg.DB.Host, "db-host", "localhost", "PostgreSQL host name")
	flag.StringVar(&cfg.DB.Port, "db-port", "5432", "PostgreSQL port number")
	flag.StringVar(&cfg.DB.User, "db-user", "postgres", "PostgreSQL user")
	flag.StringVar(&cfg.DB.Password, "db-password", "postgres", "PostgreSQL password")
	flag.StringVar(&cfg.DB.DBName, "db-dbname", "todo", "PostgreSQL database name")
	flag.StringVar(&cfg.DB.SSLMode, "db-sslmode", "disable", "PostgreSQL SSL mode")
	flag.StringVar(&cfg.DB.Timezone, "db-timezone", "UTC", "PostgreSQL DSN")

	flag.IntVar(&cfg.DB.MaxOpenConns, "db-max-open-conns", 25, "PostgreSQL max open connections")
	flag.IntVar(&cfg.DB.MaxIdleConns, "db-max-idle-conns", 25, "PostgreSQL max idle connections")
	flag.IntVar(&cfg.DB.MaxIdleTime, "db-max-idle-time", 15, "PostgreSQL max connection idle time in minutes")

	// Parse flags
	flag.Parse()

	cfg.PortAddress = fmt.Sprintf(":%d", Port)
	return cfg
}

type DBConfig struct {
	Host     string
	Port     string
	DBName   string
	User     string
	Password string
	SSLMode  string
	Timezone string

	MaxOpenConns int
	MaxIdleConns int
	MaxIdleTime  int
}

type AllConfig struct {
	DB          DBConfig
	PortAddress string
}
