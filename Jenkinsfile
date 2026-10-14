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

        stage('SonarQube Analysis') {
            steps {
                echo '===== Running SonarQube analysis ====='
                
                withCredentials([
                    string(
                        credentialsId: 'sonarqube-token',
                        variable: 'SONAR_TOKEN'
                        )
                        ]) {
                    sh 'sonar-scanner -Dsonar.token="$SONAR_TOKEN" '
                    }
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
                sh 'docker buildx build --platform linux/amd64 --load -t devsecops-app:latest .'
                }
            }

        stage('Docker Push') {
    steps {
        echo '===== Pushing Docker image to Docker Hub ====='

        withCredentials([
            usernamePassword(
                credentialsId: 'dockerhub-credentials',
                usernameVariable: 'DOCKERHUB_USERNAME',
                passwordVariable: 'DOCKERHUB_TOKEN'
            )
        ]) {
            sh '''
                set +x

                printf '%s' "$DOCKERHUB_TOKEN" | docker login \
                    --username "$DOCKERHUB_USERNAME" \
                    --password-stdin

                docker tag devsecops-app:latest \
                    "$DOCKERHUB_USERNAME/devsecops-app:latest"

                docker push "$DOCKERHUB_USERNAME/devsecops-app:latest"

                docker logout
            '''
        }
    }
}



stage('Deploy to EC2') {
    steps {
        echo '===== Deploying application to EC2 ====='

        withCredentials([
            sshUserPrivateKey(
                credentialsId: 'ec2-ssh-key',
                keyFileVariable: 'SSH_KEY',
                usernameVariable: 'EC2_USER'
            ),
            string(
                credentialsId: 'ec2-public-ip',
                variable: 'EC2_HOST'
            )
        ]) {
            sh '''
                ssh -i "$SSH_KEY" \
                    -o StrictHostKeyChecking=accept-new \
                    -o ConnectTimeout=10 \
                    "$EC2_USER@$EC2_HOST" '
                        set -e

                        echo "===== Stopping the old systemd service ====="
                        sudo systemctl disable --now devsecops-app 2>/dev/null || true

                        echo "===== Pulling the latest Docker image ====="
                        sudo docker pull vaibhavsingla456/devsecops-app:latest

                        echo "===== Removing the previous container ====="
                        sudo docker rm -f devsecops-container 2>/dev/null || true

                        echo "===== Starting the updated container ====="
                        sudo docker run -d \
                            --name devsecops-container \
                            --restart unless-stopped \
                            -p 3000:3000 \
                            vaibhavsingla456/devsecops-app:latest

                        sleep 3

                        echo "===== Checking container status ====="
                        sudo docker ps --filter name=devsecops-container

                        echo "===== Checking application health ====="
                        curl -fsS http://localhost:3000/health
                    '
            '''
        }
    }
}
    }
}