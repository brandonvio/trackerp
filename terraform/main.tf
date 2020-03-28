#############################################################
# Brandon Vicedomini
# Onica DevOps Test
# Approach 2
# Completed 3/27/2020
#############################################################
provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

#############################################################
# DyanmoDB table.
#############################################################
resource "aws_dynamodb_table" "purchase-dynamodb-table" {
  name = "Purchase"

  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "pk"
  range_key      = "sk"

  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "sk"
    type = "S"
  }

  attribute {
    name = "purchaseDate"
    type = "S"
  }

  local_secondary_index {
    name               = "purchaseDateIndex"
    range_key          = "purchaseDate"
    projection_type    = "INCLUDE"
    non_key_attributes = ["pk"]
  }

  tags = {
    Name = "purchase-dynamodb-table"
  }
}

#############################################################
# IAM
#############################################################
#------------------------------------------------------------
# lambda role
#------------------------------------------------------------
resource "aws_iam_role" "purchase-lambda-role" {
  name = "purchase-lambda-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com",
          "apigateway.amazonaws.com"
        ]
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

#------------------------------------------------------------
# lambda policy
#------------------------------------------------------------
resource "aws_iam_role_policy" "purchase-lambda-policy" {
  name   = "dynamodb_lambda_policy"
  role   = aws_iam_role.purchase-lambda-role.id
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:PutItem",
        "dynamodb:Query",
        "dynamodb:DeleteItem"
      ],
      "Resource": "${aws_dynamodb_table.purchase-dynamodb-table.arn}"
    },
		{
			"Effect": "Allow",
			"Action": [
				"logs:CreateLogStream",
				"logs:PutLogEvents"
			],
			"Resource": "arn:aws:logs:${var.aws_region}:${var.aws_account_id}:*"
		},
		{
			"Effect": "Allow",
			"Action": "logs:CreateLogGroup",
			"Resource": "*"
		}
  ]
}
EOF
}

#############################################################
# Lambda functions.
#############################################################
#------------------------------------------------------------
# getPurchaseList
#------------------------------------------------------------
resource "aws_lambda_function" "get-purchase-list-function" {
  filename         = "package.zip"
  function_name    = "getPurchaseList"
  role             = aws_iam_role.purchase-lambda-role.arn
  handler          = "index.getPurchaseList"
  source_code_hash = filebase64sha256("package.zip")
  runtime          = "nodejs12.x"
  publish          = true
  depends_on       = [aws_cloudwatch_log_group.purchase-api-log-group]

  tags = {
    Name = "getPurchaseList"
  }
}

#------------------------------------------------------------
# getPurchase
#------------------------------------------------------------
resource "aws_lambda_function" "get-purchase-function" {
  filename         = "package.zip"
  function_name    = "getPurchase"
  role             = aws_iam_role.purchase-lambda-role.arn
  handler          = "index.getPurchase"
  source_code_hash = filebase64sha256("package.zip")
  runtime          = "nodejs12.x"
  publish          = true
  depends_on       = [aws_cloudwatch_log_group.purchase-api-log-group]

  tags = {
    Name = "getPurchase"
  }
}

#------------------------------------------------------------
# savePurchase
#------------------------------------------------------------
resource "aws_lambda_function" "save-purchase-function" {
  filename         = "package.zip"
  function_name    = "savePurchase"
  role             = aws_iam_role.purchase-lambda-role.arn
  handler          = "index.savePurchase"
  source_code_hash = filebase64sha256("package.zip")
  runtime          = "nodejs12.x"
  publish          = true
  depends_on       = [aws_cloudwatch_log_group.purchase-api-log-group]

  tags = {
    Name = "savePurchase"
  }
}

#------------------------------------------------------------
# deletePurchase
#------------------------------------------------------------
resource "aws_lambda_function" "delete-purchase-function" {
  filename         = "package.zip"
  function_name    = "deletePurchase"
  role             = aws_iam_role.purchase-lambda-role.arn
  handler          = "index.deletePurchase"
  source_code_hash = filebase64sha256("package.zip")
  runtime          = "nodejs12.x"
  publish          = true
  depends_on       = [aws_cloudwatch_log_group.purchase-api-log-group]

  tags = {
    Name = "deletePurchase"
  }
}

#------------------------------------------------------------
# getCategoryList
#------------------------------------------------------------
resource "aws_lambda_function" "get-category-list-function" {
  filename         = "package.zip"
  function_name    = "getCategoryList"
  role             = aws_iam_role.purchase-lambda-role.arn
  handler          = "index.getCategoryList"
  source_code_hash = filebase64sha256("package.zip")
  runtime          = "nodejs12.x"
  publish          = true
  depends_on       = [aws_cloudwatch_log_group.purchase-api-log-group]

  tags = {
    Name = "getCategoryList"
  }
}

#############################################################
# Cloudwatch.
#############################################################
resource "aws_cloudwatch_log_group" "purchase-api-log-group" {
  name              = "/aws/lambda/purchaseApi"
  retention_in_days = 30
}

#############################################################
# API Gateway
#############################################################
#************************************************************
# Purchase API
#************************************************************
resource "aws_api_gateway_rest_api" "purchase-api" {
  name        = "PurchaseAPI"
  description = "PurchaseAPI"
}

#------------------------------------------------------------
# api resources
#------------------------------------------------------------
resource "aws_api_gateway_resource" "purchase-resource" {
  rest_api_id = aws_api_gateway_rest_api.purchase-api.id
  parent_id   = aws_api_gateway_rest_api.purchase-api.root_resource_id
  path_part   = "purchase"
}

resource "aws_api_gateway_resource" "purchase-purchaseid-resource" {
  rest_api_id = aws_api_gateway_rest_api.purchase-api.id
  parent_id   = aws_api_gateway_resource.purchase-resource.id
  path_part   = "{purchaseId}"
}

#------------------------------------------------------------
# purchase api cors
#------------------------------------------------------------
module "purchase_api_cors" {
  source          = "squidfunk/api-gateway-enable-cors/aws"
  version         = "0.3.1"
  api_id          = aws_api_gateway_rest_api.purchase-api.id
  api_resource_id = aws_api_gateway_resource.purchase-resource.id
  allow_origin    = "*"
  allow_headers = [
    "Access-Control-Allow-Origin",
    "Authorization",
    "Content-Type",
    "X-Amz-Date",
    "X-Amz-Security-Token",
    "X-Api-Key"
  ]
}

#************************************************************
# API Gateway to Lambda integrations
#************************************************************
#------------------------------------------------------------
# save-purchase integrations
#------------------------------------------------------------
resource "aws_api_gateway_method" "save-purchase-method" {
  rest_api_id   = aws_api_gateway_rest_api.purchase-api.id
  resource_id   = aws_api_gateway_resource.purchase-resource.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "save-purchase-method-integration" {
  rest_api_id             = aws_api_gateway_rest_api.purchase-api.id
  resource_id             = aws_api_gateway_resource.purchase-resource.id
  http_method             = aws_api_gateway_method.save-purchase-method.http_method
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.save-purchase-function.invoke_arn
  integration_http_method = "POST"
}

#------------------------------------------------------------
# get-purchase-list integrations
#------------------------------------------------------------
resource "aws_api_gateway_method" "get-purchase-list-method" {
  rest_api_id   = aws_api_gateway_rest_api.purchase-api.id
  resource_id   = aws_api_gateway_resource.purchase-resource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "get-purchase-list-method-integration" {
  rest_api_id             = aws_api_gateway_rest_api.purchase-api.id
  resource_id             = aws_api_gateway_resource.purchase-resource.id
  http_method             = aws_api_gateway_method.get-purchase-list-method.http_method
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.get-purchase-list-function.invoke_arn
  integration_http_method = "POST"
}

#------------------------------------------------------------
# get-purchase integrations
#------------------------------------------------------------
resource "aws_api_gateway_method" "get-purchase-method" {
  rest_api_id   = aws_api_gateway_rest_api.purchase-api.id
  resource_id   = aws_api_gateway_resource.purchase-purchaseid-resource.id
  http_method   = "GET"
  authorization = "NONE"

  request_parameters = {
    "method.request.path.purchaseId" = true
  }
}

resource "aws_api_gateway_integration" "get-purchase-method-integration" {
  rest_api_id             = aws_api_gateway_rest_api.purchase-api.id
  resource_id             = aws_api_gateway_resource.purchase-purchaseid-resource.id
  http_method             = aws_api_gateway_method.get-purchase-method.http_method
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.get-purchase-function.invoke_arn
  integration_http_method = "POST"
}

#------------------------------------------------------------
# delete-purchase integrations
#------------------------------------------------------------
resource "aws_api_gateway_method" "delete-purchase-method" {
  rest_api_id   = aws_api_gateway_rest_api.purchase-api.id
  resource_id   = aws_api_gateway_resource.purchase-purchaseid-resource.id
  http_method   = "DELETE"
  authorization = "NONE"

  request_parameters = {
    "method.request.path.purchaseId" = true
  }
}

resource "aws_api_gateway_integration" "delete-purchase-method-integration" {
  rest_api_id             = aws_api_gateway_rest_api.purchase-api.id
  resource_id             = aws_api_gateway_resource.purchase-purchaseid-resource.id
  http_method             = aws_api_gateway_method.delete-purchase-method.http_method
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.delete-purchase-function.invoke_arn
  integration_http_method = "POST"
}

#************************************************************
#------------------------------------------------------------
# deployments
#------------------------------------------------------------
resource "aws_api_gateway_deployment" "purchase-deployment-dev" {
  depends_on = [
    aws_api_gateway_integration.save-purchase-method-integration,
    aws_api_gateway_integration.get-purchase-list-method-integration,
    aws_api_gateway_integration.get-purchase-method-integration,
    aws_api_gateway_integration.delete-purchase-method-integration
  ]
  rest_api_id = aws_api_gateway_rest_api.purchase-api.id
  stage_name  = "dev"
}

resource "aws_api_gateway_deployment" "purchase-deployment-prod" {
  depends_on = [
    aws_api_gateway_integration.save-purchase-method-integration,
    aws_api_gateway_integration.get-purchase-list-method-integration,
    aws_api_gateway_integration.get-purchase-method-integration,
    aws_api_gateway_integration.delete-purchase-method-integration
  ]
  rest_api_id = aws_api_gateway_rest_api.purchase-api.id
  stage_name  = "prod"
}

#************************************************************
#------------------------------------------------------------
# api gateway to lambda permissions
#------------------------------------------------------------
resource "aws_lambda_permission" "save-purchase-lambda-permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.save-purchase-function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.purchase-api.execution_arn}/*/*/*"
}

resource "aws_lambda_permission" "purchase-api-lambda-permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get-purchase-list-function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.purchase-api.execution_arn}/*/*/*"
}

resource "aws_lambda_permission" "get-purchase-lambda-permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get-purchase-function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.purchase-api.execution_arn}/*/*/*"
}

resource "aws_lambda_permission" "delete-purchase-lambda-permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.delete-purchase-function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.purchase-api.execution_arn}/*/*/*"
}

#************************************************************
#------------------------------------------------------------
# output variables
#------------------------------------------------------------
output "get_purchase_list_dev_url" {
  value = "https://${aws_api_gateway_deployment.purchase-deployment-dev.rest_api_id}.execute-api.${var.aws_region}.amazonaws.com/${aws_api_gateway_deployment.purchase-deployment-dev.stage_name}"
}

output "get_purchase_list_prod_url" {
  value = "https://${aws_api_gateway_deployment.purchase-deployment-prod.rest_api_id}.execute-api.${var.aws_region}.amazonaws.com/${aws_api_gateway_deployment.purchase-deployment-prod.stage_name}"
}

#************************************************************
# Category API
#************************************************************
#------------------------------------------------------------
# api
#------------------------------------------------------------
resource "aws_api_gateway_rest_api" "category-api" {
  name        = "CategoryAPI"
  description = "CategoryAPI"
}

#------------------------------------------------------------
# get-category-list integrations
#------------------------------------------------------------
resource "aws_api_gateway_resource" "category-api-resource" {
  rest_api_id = aws_api_gateway_rest_api.category-api.id
  parent_id   = aws_api_gateway_rest_api.category-api.root_resource_id
  path_part   = "category"
}

resource "aws_api_gateway_method" "get-category-list-method" {
  rest_api_id   = aws_api_gateway_rest_api.category-api.id
  resource_id   = aws_api_gateway_resource.category-api-resource.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "get-category-list-method-integration" {
  rest_api_id             = aws_api_gateway_rest_api.category-api.id
  resource_id             = aws_api_gateway_resource.category-api-resource.id
  http_method             = aws_api_gateway_method.get-category-list-method.http_method
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.get-category-list-function.invoke_arn
  integration_http_method = "POST"
}

#------------------------------------------------------------
# category api cors
#------------------------------------------------------------
module "category_api_cors" {
  source          = "squidfunk/api-gateway-enable-cors/aws"
  version         = "0.3.1"
  api_id          = aws_api_gateway_rest_api.category-api.id
  api_resource_id = aws_api_gateway_resource.category-api-resource.id
  allow_origin    = "*"
  allow_headers = [
    "Access-Control-Allow-Origin",
    "Authorization",
    "Content-Type",
    "X-Amz-Date",
    "X-Amz-Security-Token",
    "X-Api-Key"
  ]
}

#------------------------------------------------------------
# deployments
#------------------------------------------------------------
resource "aws_api_gateway_deployment" "category-deployment-dev" {
  depends_on = [
    aws_api_gateway_method.get-category-list-method,
    aws_api_gateway_integration.get-category-list-method-integration
  ]
  rest_api_id = aws_api_gateway_rest_api.category-api.id
  stage_name  = "dev"
}

resource "aws_api_gateway_deployment" "category-deployment-prod" {
  depends_on = [
    aws_api_gateway_method.get-category-list-method,
    aws_api_gateway_integration.get-category-list-method-integration
  ]
  rest_api_id = aws_api_gateway_rest_api.category-api.id
  stage_name  = "prod"
}

#------------------------------------------------------------
# lambda permissions
#------------------------------------------------------------
resource "aws_lambda_permission" "get-category-list-lambda-permission" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get-category-list-function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.aws_region}:${var.aws_account_id}:${aws_api_gateway_rest_api.category-api.id}/*/${aws_api_gateway_method.get-category-list-method.http_method}${aws_api_gateway_resource.category-api-resource.path}"
}

#------------------------------------------------------------
# output variables
#------------------------------------------------------------
output "get_category_list_dev_url" {
  value = "https://${aws_api_gateway_deployment.category-deployment-dev.rest_api_id}.execute-api.${var.aws_region}.amazonaws.com/${aws_api_gateway_deployment.category-deployment-dev.stage_name}"
}

output "get_category_list_prod_url" {
  value = "https://${aws_api_gateway_deployment.category-deployment-prod.rest_api_id}.execute-api.${var.aws_region}.amazonaws.com/${aws_api_gateway_deployment.category-deployment-prod.stage_name}"
}
