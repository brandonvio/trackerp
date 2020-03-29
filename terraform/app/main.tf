#############################################################
# Brandon Vicedomini
# Purchase Tracker IAC
#############################################################
provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

locals {
  bucket_name = "origin.${var.site_name}"
}

#############################################################
# S3 static website
#############################################################
data "template_file" "s3_public_policy" {
  template = "${file("policies/s3-public.json")}"
  vars = {
    bucket_name = local.bucket_name
  }
}

resource "aws_s3_bucket" "site_bucket" {
  bucket = local.bucket_name
  acl    = "public-read"
  policy = data.template_file.s3_public_policy.rendered
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
  tags = {
    name : local.bucket_name
  }
}

output "s3_website_endpoint" {
  value = "${aws_s3_bucket.site_bucket.website_endpoint}"
}
