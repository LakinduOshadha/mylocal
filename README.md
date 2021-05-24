# mylocal

MyLocal is a portal for sharing various local information about Sri Lanka.

It is implemented as a React App, and depends on two python-based servers (geo_server and gig_server).


## Running mylocal on a local Apache Web Server

The React App and the two python services can all be run on an Apache Webserver. [https://github.com/nuuuwan/mylocal/tree/main/scripts/local_apache](scripts/local_apache) have helper scripts for setting up Apache locally.

* First, run [https://github.com/nuuuwan/mylocal/blob/main/scripts/local_apache/init.sh](scripts/local_apache/init.sh) install various dependencies
* Second, run [https://github.com/nuuuwan/mylocal/blob/main/scripts/local_apache/setup_servers.sh](scripts/local_apache/setup_servers.sh) to checkout the python servers
* Finally, run [https://github.com/nuuuwan/mylocal/blob/main/scripts/local_apache/setup_mylocal_and_run.sh](scripts/local_apache/setup_mylocal_and_run.sh) to build, copy the React App, copy configs to Apache and start Apache.

## Running mylocal on a Apache Web Server on a remote AWS EC2 machine

[https://github.com/nuuuwan/mylocal/tree/main/scripts/aws_apache](scripts/aws_apache) have helper scripts for setting up Apache on a remote AWS EC2 machine.

The following environment variables need to be setup with AWS parameters:

    echo "AWS_EC2_IP_ADDRESS=$AWS_EC2_IP_ADDRESS"
    echo "AWS_EC2_USER=$AWS_EC2_USER"
    echo "AWS_EC2_PEM_FILE=$AWS_EC2_PEM_FILE"

[https://github.com/nuuuwan/mylocal/blob/main/.env.production](.env.production) must also be updated with the AWS_EC2_IP_ADDRESS.

The steps are similar to the local setup.
