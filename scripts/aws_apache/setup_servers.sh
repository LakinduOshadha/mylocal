# This script depends on the following ENVIRONMENT VARIABLES.
# Please make sure they are set
echo "AWS_EC2_IP_ADDRESS=$AWS_EC2_IP_ADDRESS"
echo "AWS_EC2_USER=$AWS_EC2_USER"
echo "AWS_EC2_PEM_FILE=$AWS_EC2_PEM_FILE"

# Shortcuts to run various remote operations
EC2="ssh -i $AWS_EC2_PEM_FILE $AWS_EC2_USER@$AWS_EC2_IP_ADDRESS "
EC2_SU="$EC2 sudo "

# ----------------------------------------------------------------

AWS_HOME=/home/$AWS_EC2_USER
AWS_EC2_DIR_WWW=/var/www

$EC2 "rm -rf $AWS_HOME/*server"
$EC2 "git clone https://github.com/nuuuwan/gig_server.git $AWS_HOME/gig_server"
$EC2 "git clone https://github.com/nuuuwan/geo_server.git $AWS_HOME/geo_server"

$EC2_SU "rm -rf $AWS_EC2_DIR_WWW/html/*server"
$EC2_SU "ln -s $AWS_HOME/gig_server $AWS_EC2_DIR_WWW/html/gig_server"
$EC2_SU "ln -s $AWS_HOME/geo_server $AWS_EC2_DIR_WWW/html/geo_server"
