#############################################################
# Brandon Vicedomini
# Purchase Tracker IAC
#############################################################
provider "aws" {
  region = var.aws_region
}

#############################################################
# S3 bucket.
#############################################################
resource "aws_s3_bucket" "terraform-backend-trackerp-bucket" {
  bucket = "terraform-backend-trackerp"
  acl    = "private"

  versioning {
    enabled = true
  }

  tags = {
    Name = "terraform/backend/trackerp"
  }
}

#############################################################
# DynamoDB table.
#############################################################
resource "aws_dynamodb_table" "terraform-backend-trackerp-table" {
  name           = "TrackerpTerraform"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name = "TrackerpTerraform"
  }
}
