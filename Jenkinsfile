node {
    stage('get code from github'){
        git(
           url: 'https://github.com/brandonvio/trackerp',
           credentialsId: 'aa1cfaef-9e77-4449-9208-43d6f6a8de44',
           branch: "master"
        )
    }

    stage("API"){

        stage('build'){
            echo "Let's begin."
            sh "aws s3 ls"
            sh "terraform --version"

            dir('api'){
                sh "zip -r package.zip *"
                sh "cp package.zip ../terraform/api"
            }
        }

        stage("deploy"){

            dir ('terraform/api'){
                sh "pwd"
                sh "ls"
                sh "terraform init"
                sh "terraform plan"
            }
        }
    }
}