docker kill local_mylocal
docker rm /local_mylocal
open -a firefox http://localhost:80/index.html
docker run -p 80:80 -d --name local_mylocal nuuuwan/mylocal
docker ps
