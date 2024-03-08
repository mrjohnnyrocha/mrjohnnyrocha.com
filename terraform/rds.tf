resource "aws_db_instance" "default" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "14.8"
  instance_class       = "db.t3.micro"
  identifier           = "llm-framework-db-dev"
  username             = var.db_username
  password             = var.db_password
  skip_final_snapshot  = true
  publicly_accessible = true
  multi_az = false
  vpc_security_group_ids = [
    aws_security_group.rds_sg.id
  ]
}
