node {
    stage('get code from github'){
        git(
           url: 'https://github.com/brandonvio/trackerp',
           credentialsId: 'aa1cfaef-9e77-4449-9208-43d6f6a8de44',
           branch: "master"
        )
    }
    stage('build'){
        echo "Get env file."
        sh "aws s3 ls"
        sh "terraform --version"
        sh "cd terraform/api"
        sh "pwd"
        sh "terraform init"
        sh "terraform plan"
        // sh "cp /var/jenkins_home/secrets/env/env-rythm-api ."
        // sh "mv env-rythm-api .env"
        // sh "ls -al"
        // echo "Get git rev-parse head."        
        // git_head = sh(returnStdout: true, script: "git rev-parse HEAD").trim()
        // echo "Build docker image."
        // sh "docker build -t matrixacr.azurecr.io/rythm-api:$env.BUILD_ID -f Dockerfile ."
        // echo "Push new docker image to container repository."
        // sh "docker push matrixacr.azurecr.io/rythm-api:$env.BUILD_ID"
        // echo "Deploy to kubernetes cluster."
        // sh "/usr/local/bin/kubectl set image deployments/rythm-api rythm-api=matrixacr.azurecr.io/rythm-api:$env.BUILD_ID --kubeconfig /var/jenkins_home/secrets/azure-k8-config"
    }
}