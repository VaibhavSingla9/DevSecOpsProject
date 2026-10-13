pipeline {
    agent any

    environment {
    PATH = "/usr/local/bin:/opt/homebrew/bin:$PATH"
}

    stages {
        stage('Build') {
            steps {
                echo '===== Installing dependencies ====='
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                echo '===== Running automated tests ====='
                sh 'npm test'
            }
        }


        stage('Dependency Security Scan') {
            steps {
                echo '===== Scanning dependencies for vulnerabilities ====='
                sh 'npm audit'
                }
            }

        stage('Docker Check') {
            steps {
                echo '===== Checking Docker version ====='
                sh 'docker --version'

                echo '===== Checking Docker engine access ====='
                sh 'docker info'
            }
        }


        stage('Docker Build') {
            steps {
                echo '===== Building Docker image ====='
                sh 'docker build -t devsecops-app:latest .'
                }
            }
    }
}