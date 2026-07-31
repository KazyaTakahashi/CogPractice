output "api_url" {
  value       = aws_apigatewayv2_stage.default.invoke_url
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
  value       = aws_lambda_function.backend.function_name
  description = "Lambda function name"
}

output "cloudfront_distribution_id" {
  value       = aws_cloudfront_distribution.frontend.id
  description = "CloudFront distribution id"
}
