# This script depends on the following ENVIRONMENT VARIABLES.
# Please make sure they are set
echo "AWS_EC2_IP_ADDRESS=$AWS_EC2_IP_ADDRESS"
echo "AWS_EC2_USER=$AWS_EC2_USER"
echo "AWS_EC2_PEM_FILE=$AWS_EC2_PEM_FILE"

# Shortcuts to run various remote operations
EC2="ssh -i $AWS_EC2_PEM_FILE $AWS_EC2_USER@$AWS_EC2_IP_ADDRESS "
EC2_SU="$EC2 sudo "

# ----------------------------------------------------------------

# build react
# npm run build

# Copy apache conf
AWS_HOME=/home/$AWS_EC2_USER
scp -i $AWS_EC2_PEM_FILE -r scripts/aws_apache/apache.conf $AWS_EC2_USER@$AWS_EC2_IP_ADDRESS:$AWS_HOME/apache.conf
$EC2_SU "mv $AWS_HOME/apache.conf /etc/apache2/sites-enabled/000-default.conf"

# Copy build
# $EC2 "rm -rf $AWS_HOME/mylocal"
# scp -i $AWS_EC2_PEM_FILE -r build $AWS_EC2_USER@$AWS_EC2_IP_ADDRESS:$AWS_HOME/mylocal
#
# AWS_EC2_DIR_WWW=/var/www
# $EC2_SU "rm -rf $AWS_EC2_DIR_WWW/html/mylocal"
# $EC2_SU "ln -s $AWS_HOME/mylocal $AWS_EC2_DIR_WWW/html/mylocal"
# $EC2 "ls -la $AWS_EC2_DIR_WWW/html"

# Restart apache and tail logs

$EC2_SU "service apache2 restart"

open http://$AWS_EC2_IP_ADDRESS/mylocal/admin/LK-1127015
$EC2 "tail -f /var/log/apache2/error.log"
