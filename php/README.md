### Create Docker file

```
FROM php:7.2-cli
COPY ./src /usr/src/myapp
WORKDIR /usr/src/myapp
CMD [ "php", "./run.php" ]
```

Make sure you use double quotes!

### Create Docker image

`docker build -t vase-php .`

### View Docker images

`docker images`

### Create Docker container from image just made

`docker run -it --rm --name vase-php-container vase-php`

Becuase of the COPY line in the docker file the run.php file will be added to the image when created, but any edits to the file will require rebuiding the image to see the change

### Lets remove the image

`docker rmi vase-php`

### This will run a container once then remove

### Will map a volume to our local src folder

### That way we can update the php and see the change when we run as opposed to have created an image that copies the file and has to be updated when the file is updated

`docker run -it --rm --name vase-php-container -v /Users/christophermarr/Sites/sandbox/docker-vase/php/src:/user/src/myapp -w /user/src/myapp php:7.2-cli php run.php`
