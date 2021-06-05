# mylocal

MyLocal is a portal for sharing various local information about Sri Lanka.

It is implemented as a React App, and depends on two python-flask-waitress based servers (geo_server and gig_server).

# Running gig_server and geo_server

The docker image for gig_server is **nuuuwan/gig_server**. 

To pull the image, and run it, 

```bash
docker run -p 81:81 -d --name aws_gig_server nuuuwan/gig_server
```

Similarly, the docker image for geo_server is **nuuuwan/geo_server**. To pull and run,

```bash
docker run -p 82:82 -d --name aws_gig_server nuuuwan/geo_server
```

Note, mylocal expects gig_server and geo_server to run on ports 81 and 82 of a predefined host, respectively. 

# Running mylocal

The **.env** file should contain the following entry, pointing to the IP address of the predefined host that runs gig_server and geo_server.

```bash
REACT_APP_SERVER_HOST=123.123.123.123
```

Now, build and deploy the react app.









