DIR_REACT_APP=/Users/nuwan.senaratna/Not.Dropbox/DEV/react/mylocal
# Build react
# npm run build

# Copy apache confs
cp scripts/local_apache/apache.conf /usr/local/etc/httpd/httpd.conf

# Copy build
DIR_APACHE_WWW=/usr/local/var/www
rm -rf $DIR_APACHE_WWW/mylocal
ln -s $DIR_REACT_APP/build $DIR_APACHE_WWW/mylocal
ls -la $DIR_APACHE_WWW

# Restart apache and tail logs
httpd -k restart
ps -ef | grep httpd

open -a firefox  http://0.0.0.0:8080/mylocal/admin/LK-1127015
tail -f /usr/local/var/log/httpd/error_log
