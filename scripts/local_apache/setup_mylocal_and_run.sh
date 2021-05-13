# Build react
npm run build

# Copy apache confs
cp scripts/local_apache/apache.conf /usr/local/etc/httpd/httpd.conf

# Copy build
DIR_APACHE_WWW=/usr/local/var/www
cd $DIR_APACHE_WWW
rm -rf mylocal
mkdir mylocal

DIR_REACT_APP=/Users/nuwan.senaratna/Not.Dropbox/DEV/react/mylocal
cp -r  $DIR_REACT_APP/build/* mylocal/

# Restart apache and tail logs
httpd -k restart
ps -ef | grep httpd
tail -f /usr/local/var/log/httpd/error_log
