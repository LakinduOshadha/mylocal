apt-get update
apt-get install apache2
apt-get install libapache2-mod-wsgi-py3
a2enmod wsgi
a2enmod headers
a2enmod rewrite

apt-get install python3-pip
pip3 install pyproj==2.2
pip3 install psutil Cython flask numpy pandas geopandas Flask-Caching

pip3 install --upgrade --force-reinstall utils-nuuuwan gig-nuuuwan geo-nuuuwan

apt-get install curl
