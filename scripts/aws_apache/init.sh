# This script depends on the following ENVIRONMENT VARIABLES.
# Please make sure they are set
echo "AWS_EC2_IP_ADDRESS=$AWS_EC2_IP_ADDRESS"
echo "AWS_EC2_USER=$AWS_EC2_USER"
echo "AWS_EC2_PEM_FILE=$AWS_EC2_PEM_FILE"

# Shortcuts to run various remote operations
export EC2="ssh -i $AWS_EC2_PEM_FILE $AWS_EC2_USER@$AWS_EC2_IP_ADDRESS "
export EC2_SU="$EC2 sudo "

# ----------------------------------------------------------------

# Install various libs on AWS machine
$EC2_SU "apt-get update"
$EC2_SU "apt-get install apache2"
$EC2_SU "apt-get install libapache2-mod-wsgi-py3"
$EC2_SU "a2enmod wsgi"
$EC2_SU "a2enmod headers"
$EC2_SU "a2enmod rewrite"

$EC2_SU "apt-get install python3-pip"
$EC2_SU "pip3 install pyproj==2.2"
$EC2_SU "pip3 install psutil Cython flask numpy pandas geopandas Flask-Caching"

$EC2_SU "pip3 install --upgrade --force-reinstall utils-nuuuwan gig-nuuuwan geo-nuuuwan"

$EC2_SU "apt-get install curl"
