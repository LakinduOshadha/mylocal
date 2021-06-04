docker build -t nuuuwan/mylocal .
docker run nuuuwan/mylocal ls
docker run nuuuwan/mylocal ls /usr/share/nginx/html

open -a firefox http://localhost:6001/index.html
docker run -p 6001:80 nuuuwan/mylocal
