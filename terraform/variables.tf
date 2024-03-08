variable "region" {
  type    = string
  default = "us-east-1"
}

variable "AWS_ACCESS_KEY_ID" {
  description = "AWS Access Key ID"
  type        = string
}

variable "AWS_SECRET_ACCESS_KEY" {
  description = "AWS Secret Access Key"
  type        = string
}

variable "db_username" {
  type    = string
  default = "llmfw"
}

variable "db_password" {
  type    = string
  default = "oZRaJeOudiRTZfY1o"
}

variable "db_name" {
  type    = string
  default = "postgres"
}

locals {
  app_env = {
    DB_NAME                      = var.db_name
    DB_USER                      = var.db_username
    DB_PORT                      = aws_db_instance.default.port
    DB_SSL_MODE                  = "true"
    DB_PASSWORD                  = var.db_password
  }
}