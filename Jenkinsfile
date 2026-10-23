
pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t ranjol/securecheck:latest .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push ranjol/securecheck:latest'
            }
        }

       stage('Deploy to Kubernetes') {
    steps {
        bat 'kubectl --kubeconfig="C:\\Windows\\System32\\config\\systemprofile\\.kube\\config" set image deployment/securecheck securecheck=ranjol/securecheck:latest'
        bat 'kubectl --kubeconfig="C:\\Windows\\System32\\config\\systemprofile\\.kube\\config" rollout status deployment/securecheck'
    }
}
    }
}
