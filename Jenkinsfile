pipeline {
    agent any

    environment {
        PATH = "/opt/homebrew/bin:$PATH"
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

        stage('Docker Check') {
            steps {
                echo '===== Checking Docker version ====='
                sh 'docker --version'

                echo '===== Checking Docker engine access ====='
                sh 'docker info'
            }
        }
    }
}