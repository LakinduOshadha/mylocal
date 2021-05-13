echo "----------------------------------------------------------------"
echo "Init"
echo "----------------------------------------------------------------"

export REACT_APP_NAME=mylocal
export DIR_REACT=/Users/nuwan.senaratna/Not.Dropbox/DEV/react
export DIR_REACT_APP=$DIR_REACT/$REACT_APP_NAME
export DIR_APACHE_WWW=/usr/local/var/www

echo "REACT_APP_NAME=$REACT_APP_NAME"

echo "----------------------------------------------------------------"
echo "Build"
echo "----------------------------------------------------------------"

# npm run build

echo "----------------------------------------------------------------"
echo "Copy to apache"
echo "----------------------------------------------------------------"

DIR_APACHE_REACT_APP=$DIR_APACHE_WWW/$REACT_APP_NAME
mkdir -p $DIR_APACHE_REACT_APP
rm -rf $DIR_APACHE_REACT_APP/*
ls -la $DIR_APACHE_WWW

cp -r  $DIR_REACT_APP/build/* $DIR_APACHE_REACT_APP/
ls -la $DIR_APACHE_REACT_APP

echo "----------------------------------------------------------------"
echo "Restart  apache"
echo "----------------------------------------------------------------"

httpd -k restart
ps -ef | grep httpd
tail -f /usr/local/var/log/httpd/error_log
