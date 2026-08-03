variable "aws_region" {
  type        = string
  description = "AWS deployment region"
  default     = "us-east-1"
}

variable "student_name" {
  type        = string
  description = "Name prefix used in resource naming"
}

variable "project_name" {
  type        = string
  description = "Project name"
  default     = "cogpractice"
}

variable "lambda_role_arn" {
  type        = string
  description = "ARN of the shared Lambda execution role"
}

variable "deploy_backend" {
  type        = bool
  description = "Deploy Lambda + API Gateway backend resources"
  default     = true
}

variable "created_date" {
  type        = string
  description = "Tag date in dd-mmm-yyyy format"
}

variable "mongodb_uri" {
  type        = string
  description = "MongoDB Atlas URI"
  sensitive   = true
}

variable "jwt_access_secret" {
  type        = string
  description = "JWT access token signing secret"
  sensitive   = true
}

variable "jwt_refresh_secret" {
  type        = string
  description = "JWT refresh token signing secret"
  sensitive   = true
}

variable "jwt_access_expires_in" {
  type        = string
  description = "Access token expiry"
  default     = "15m"
}

variable "jwt_refresh_expires_in" {
  type        = string
  description = "Refresh token expiry"
  default     = "7d"
}
