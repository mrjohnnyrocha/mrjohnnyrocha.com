resource "aws_security_group" "rds_sg" {
  name        = "llm-framework-rds-security-group"
  description = "Allow inbound access to RDS"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Adjust as per your security requirements
  }

  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Adjust as per your security requirements
  }
}