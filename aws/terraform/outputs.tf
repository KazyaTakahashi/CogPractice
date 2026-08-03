output "api_url" {
  value       = var.deploy_backend ? aws_apigatewayv2_stage.default[0].invoke_url : null
  description = "API Gateway base URL"
}

output "frontend_url" {
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
  description = "CloudFront URL for frontend"
}

output "s3_bucket" {
  value       = aws_s3_bucket.frontend.bucket
  description = "Frontend artifact bucket"
}

output "lambda_function_name" {
  value       = var.deploy_backend ? aws_lambda_function.backend[0].function_name : null
  description = "Lambda function name"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.frontend.id
  description = "CloudFront distribution id"
}
