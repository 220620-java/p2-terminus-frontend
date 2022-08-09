![alt text](http://terminus-front.s3-website-us-east-1.amazonaws.com/assets/images/logo.png)
## Project 2 - Terminus Store Back End

[Front End Repo](https://github.com/220620-java/p2-terminus-frontend)
[Back End Repo](https://github.com/220620-java/p2-terminus-backend)

## Flow Chart
![Flow](https://i.ibb.co/GFnq16Q/image-4.png)

## Entity Relationship Diagram
Terminus Database deployed on AWS RDS
![ERD](https://i.ibb.co/cNPFWBQ/ERD.png)

## Beanstalk CodePipline
The Terminus Store backend was developed using the Java Spring Framework and is deployed through the AWS CodPipeline where the project code is reviewed by Sonar Cloud where it is inspected for code quality and security. The project is compiled using AWS CodeBuild and deployed onto an [Amazon Elastic Beanstalk](http://p2terminusoms-env.eba-fcyktpid.us-east-1.elasticbeanstalk.com/).

## S3 CodePipeline
The front end of the project was deployed on an AWS S3 Bucket while also utilizing the AWS CodePipeline for automatic deployment.
* [Terminus Store S3](http://terminus-front.s3-website-us-east-1.amazonaws.com/)

# Team Terminus
* [Devin Abreu](https://github.com/devinabreu10)
* [Tony Wiedman](https://github.com/tonywied17)
* [Berhanu](https://github.com/berhanusg)
* [Noah Cavazos](https://github.com/Woodsgump)
