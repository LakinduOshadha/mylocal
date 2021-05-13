DIR_APACHE_WWW=/usr/local/var/www
cd $DIR_APACHE_WWW

rm -rf *server

git clone https://github.com/nuuuwan/gig_server.git
git clone https://github.com/nuuuwan/geo_server.git

ls -la /usr/local/var/www
