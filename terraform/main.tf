terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

resource "aws_instance" "app" {
  ami                         = "ami-0b56a712f7557ea3d"
  instance_type               = "t4g.micro"
  subnet_id                   = "subnet-01231955fbcfcd5f4"
  vpc_security_group_ids      = ["sg-014c08a57d2899cb4"]
  associate_public_ip_address = true

  tags = {
    Name = "DevSecOps-Terraform-Instance"
  }
}