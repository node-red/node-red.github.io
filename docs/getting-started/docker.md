---
layout: docs-getting-started
title: Running under Docker
toc: toc-user-guide.html
slug: docker
redirect_from:
  - /docs/platforms/docker
---

This guide assumes you have some basic familiarity with Docker and the
[Docker Command Line](https://docs.docker.com/engine/reference/commandline/cli/). It describes some of the many ways Node-RED can be run under Docker and has support for multiple architectures (amd64, arm32v6, arm32v7, arm64v8 and s390x).

As of Node-RED 1.0 the repository on [Docker Hub](https://hub.docker.com/r/nodered/node-red/)
was renamed to `nodered/node-red`.

Previous 0.20.x versions are still available at https://hub.docker.com/r/nodered/node-red-docker.

### Quick Start

To run in Docker in its simplest form just run:

    docker run -it -p 1880:1880 --name mynodered nodered/node-red

Let's dissect that command:

    docker run              - run this container... initially building locally if necessary
    -it                     - attach a terminal session so we can see what is going on
    -p 1880:1880            - connect local port 1880 to the exposed internal port 1880
    --name mynodered        - give this machine a friendly local name
    nodered/node-red        - the image to base it on


Running that command should give a terminal window with a running instance of Node-RED.

        Welcome to Node-RED
        ===================

        30 Jun 12:57:10 - [info] Node-RED version: v1.1.0
        30 Jun 12:57:10 - [info] Node.js  version: v10.21.0
        30 Jun 12:57:10 - [info] Linux 4.9.184-linuxkit x64 LE
        30 Jun 12:57:11 - [info] Loading palette nodes
        30 Jun 12:57:16 - [info] Settings file  : /data/settings.js
        30 Jun 12:57:16 - [info] Context store  : 'default' [module=memory]
        30 Jun 12:57:16 - [info] User directory : /data
        30 Jun 12:57:16 - [warn] Projects disabled : editorTheme.projects.enabled=false
        30 Jun 12:57:16 - [info] Flows file     : /data/flows.json
        30 Jun 12:57:16 - [info] Creating new flow file
        30 Jun 12:57:17 - [warn]

        ---------------------------------------------------------------------
        Your flow credentials file is encrypted using a system-generated key.

        If the system-generated key is lost for any reason, your credentials
        file will not be recoverable, you will have to delete it and re-enter
        your credentials.

        You should set your own key using the 'credentialSecret' option in
        your settings file. Node-RED will then re-encrypt your credentials
        file using your chosen key the next time you deploy a change.
        ---------------------------------------------------------------------

        30 Jun 12:57:17 - [info] Starting flows
        30 Jun 12:57:17 - [info] Started flows
        30 Jun 12:57:17 - [info] Server now running at http://127.0.0.1:1880/

        [...]

You can then browse to `http://{host-ip}:1880` to get the familiar Node-RED desktop.

The advantage of doing this is that by giving it a name (mynodered) we can manipulate it
more easily, and by fixing the host port we know we are on familiar ground.
Of course this does mean we can only run one instance at a time... but one step at a time folks.

If we are happy with what we see, we can detach the terminal with `Ctrl-p` `Ctrl-q` - the
container will keep running in the background.

To reattach to the terminal (to see logging) run:

    docker attach mynodered

If you need to restart the container (e.g. after a reboot or restart of the Docker daemon):

    docker start mynodered

and stop it again when required:

    docker stop mynodered

### Image Variations

The Node-RED images are based on [official Node JS Alpine Linux](https://hub.docker.com/_/node/) images to keep them as small as possible.
Using Alpine Linux reduces the built image size, but removes standard dependencies that are required for native module compilation. If you want to add dependencies with native dependencies, extend the Node-RED image with the missing packages on running containers or build new images see [docker-custom](https://github.com/node-red/node-red-docker/tree/master/docker-custom).

See the [Github project README](https://github.com/node-red/node-red-docker/blob/master/README.md) for detailed Image, Tag and Manifest information.

For example: suppose you are running on a Raspberry PI 3B, which has `arm32v7` as architecture. Then just run the following command to pull the image (tagged by `1.1.0-10-arm32v7`), and run the container.
```
docker run -it -p 1880:1880 --name mynodered nodered/node-red:latest
```

The same command can be used for running on an amd64 system, since Docker discovers it is running on an amd64 host and pulls the image with the matching tag (`1.1.0-10-amd64`).

This has the advantage that you don't need to know/specify which architecture you are running on and makes docker run commands and docker compose files more flexible and exchangeable across systems.

**Note**: Currently there is a bug in Docker's architecture detection that fails for `arm32v6` - eg Raspberry Pi Zero or 1. For these devices you currently need to specify the full image tag, for example:
```
docker run -it -p 1880:1880 --name mynodered nodered/node-red:1.1.0-10-arm32v6
```

### Managing User Data

Once you have Node-RED running with Docker, we need to
ensure any added nodes or flows are not lost if the container is destroyed.
This user data can be persisted by mounting a data directory to a volume outside the container.
This can either be done using a bind mount or a named data volume.

Node-RED uses the `/data` directory inside the container to store user configuration data.

#### Using a Host Directory for Persistence (Bind Mount)

To save your Node-RED user directory inside the container to a host directory outside the container, you can use the
command below. To allow access to this host directory, the node-red user (default uid=1000) inside the container must
have the same uid as the owner of the host directory.
```
docker run -it -p 1880:1880 -v /home/pi/.node-red:/data --name mynodered nodered/node-red
```

In this example the host `/home/pi/.node-red` directory is bound to the container `/data` directory.

**Note**: Users migrating from version 0.20 to 1.0 will need to ensure that any existing `/data`
directory has the correct ownership. As of 1.0 this needs to be `1000:1000`. This can be forced by
the command `sudo chown -R 1000:1000 path/to/your/node-red/data`

See [the wiki](https://github.com/node-red/node-red-docker/wiki/Permissions-and-Persistence) for detailed information
on permissions.

#### Using Named Data Volumes

Docker also supports using named [data volumes](https://docs.docker.com/engine/tutorials/dockervolumes/)
to store persistent or shared data outside the container.

To create a new named data volume to persist our user data and run a new
container using this volume.
```
$ docker volume create --name node_red_user_data
$ docker volume ls
DRIVER              VOLUME NAME
local               node_red_user_data
$ docker run -it -p 1880:1880 -v node_red_user_data:/data --name mynodered nodered/node-red
```

If you need to backup the data from the mounted volume you can access it while the container is running.
```
$ docker cp  mynodered:/data  /your/backup/directory
```

Using Node-RED to create and deploy some sample flows, we can now destroy the
container and start a new instance without losing our user data.
```
$ docker stop mynodered
$ docker rm mynodered
$ docker run -it -p 1880:1880 -v node_red_user_data:/data --name mynodered nodered/node-red
```

### Updating

As the /data is now preserved outside of the container, updating the base container image
is now as simple as
```
$ docker pull nodered/node-red
$ docker stop mynodered
$ docker rm mynodered
$ docker run -it -p 1880:1880 -v node_red_user_data:/data --name mynodered nodered/node-red
```

### Docker Stack / Docker Compose

Below an example of a Docker Compose file which can be run by `docker stack` or `docker-compose`.
Please refer to the official Docker pages for more info about [Docker stack](https://docs.docker.com/engine/reference/commandline/stack/) and [Docker compose](https://docs.docker.com/compose/).
```
################################################################################
# Node-RED Stack or Compose
################################################################################
# docker stack deploy node-red --compose-file docker-compose-node-red.yml
# docker-compose -f docker-compose-node-red.yml -p myNoderedProject up
################################################################################
version: "3.7"

services:
  node-red:
    image: nodered/node-red:latest
    environment:
      - TZ=Europe/Amsterdam
    ports:
      - "1880:1880"
    networks:
      - node-red-net
    volumes:
      - node-red-data

volumes:
  node-red-data:

networks:
  node-red-net:
```

The above compose file:
 - creates a node-red service
 - pulls the latest node-red image
 - sets the timezone to Europe/Amsterdam
 - Maps the container port 1880 to the host port 1880
 - creates a node-red-net network and attaches the container to this network
 - persists the `/data` dir inside the container to the `node-red-data` volume in Docker


### Dockerfile which copies in local resources

It can sometimes be useful to populate a Node-RED Docker image with files from a local directory (for example, if you want a whole project to be kept in a git repo). To do this, you'll want your local directory to look like this:

```
Dockerfile
README.md
package.json     # add any extra nodes your flow needs into your own package.json.
flows.json       # the normal place Node-RED store your flows
flows_cred.json  # credentials your flows may need
settings.js      # your settings file
```

**NOTE**: This method is NOT suitable if you want to mount the /data volume externally. If you need to use an external volume for persistence then copy your settings and flows files to that volume instead.

The following Dockerfile builds on the base Node-RED Docker image, but additionally moves your own files into place into that image:

```
FROM nodered/node-red

# Copy package.json to the WORKDIR so npm builds all
# of your added nodes modules for Node-RED
COPY package.json .
RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production

# Copy _your_ Node-RED project files into place
# NOTE: This will only work if you DO NOT later mount /data as an external volume.
#       If you need to use an external volume for persistence then
#       copy your settings and flows files to that volume instead.
COPY settings.js /data/settings.js
COPY flows_cred.json /data/flows_cred.json
COPY flows.json /data/flows.json

# You should add extra nodes via your package.json file but you can also add them here:
#WORKDIR /usr/src/node-red
#RUN npm install node-red-node-smooth
```

#### Dockerfile order and build speed

While not necessary, it's a good idea to do the `COPY package... npm install...` steps early because, although the `flows.json` changes frequently as you work in Node-RED, your `package.json` will only change when you change what modules are part of your project. And since the `npm install` step that needs to happen when `package.json` changes can sometimes be time consuming, it's better to do the time-consuming, generally-unchanging steps earlier in a Dockerfile so those build images can be reused, making subsequent overall builds much faster.

#### Credentials, secrets, and environment variables

Of course you never want to hard-code credentials anywhere, so if you need to use credentials with your Node-RED project, the above Dockerfile will let you have this in your `settings.js`...

```
module.exports = {
  credentialSecret: process.env.NODE_RED_CREDENTIAL_SECRET // add exactly this
}
```

...and then when you run in Docker, you add an environment variable to your `run` command...

`docker run -e "NODE_RED_CREDENTIAL_SECRET=your_secret_goes_here"`

#### Building and running

You _build_ this Dockerfile normally:

```sh
docker build -t your-image-name:your-tag .
```

To _run_ locally for development where changes are written immediately and only the local directory that you are working from, `cd` into the project's directory and then run:

```bash
docker run --rm -e "NODE_RED_CREDENTIAL_SECRET=your_secret_goes_here" -p 1880:1880 -v `pwd`:/data --name a-container-name your-image-name
```

### Startup

Environment variables can be passed into the container configure the runtime of Node-RED.

The flows configuration file is set using an environment parameter (**FLOWS**),
which defaults to *'flows.json'*. This can be changed at runtime using the
following command-line flag.
```
docker run -it -p 1880:1880 -e FLOWS=my_flows.json nodered/node-red
```

**Note**: If you set `-e FLOWS=""` then the flow file can be set via the *flowFile*
property in the `settings.js` file.

Other useful environment variables include

 - `-e NODE_RED_ENABLE_SAFE_MODE=false` # setting to true starts Node-RED in safe (not running) mode
 - `-e NODE_RED_ENABLE_PROJECTS=false`  # setting to true starts Node-RED with the projects feature enabled

Node.js runtime arguments can be passed to the container using an environment
parameter (**NODE_OPTIONS**). For example, to fix the heap size used by
the Node.js garbage collector you would use the following command.
```
docker run -it -p 1880:1880 -e NODE_OPTIONS="--max_old_space_size=128" nodered/node-red
```

### Running headless

To run headless, (i.e. in the background), just replace the `-it` in most previous commands
with `-d`, for example:
```
docker run -d -p 1880:1880 --name mynodered nodered/node-red
```

### Container Shell

Once it is running headless you can use the following command to get access back into the container.
```
$ docker exec -it mynodered /bin/bash
bash-4.4$
```

Will give a command line inside the container - where you can then run the npm install
command you wish - for example
```
bash-4.4$ npm install node-red-dashboard
bash-4.4$ exit
$ docker stop mynodered
$ docker start mynodered
```

Refreshing the browser page should now reveal the newly added nodes in the palette.

### Multiple Instances

Running
```
docker run -d -p 1880 nodered/node-red
```
will create a locally running instance of a machine. Note: we did not specify a name.

This container will have an id number and be running on a random port... to find out which port, run `docker ps`
```
$ docker ps
CONTAINER ID  IMAGE             COMMAND                 CREATED         STATUS        PORTS                    NAMES
860258cab092  nodered/node-red  "npm start -- --user…"  10 seconds ago  Up 9 seconds  0.0.0.0:32768->1880/tcp  dazzling_euler
```

You can now point a browser to the host machine on the tcp port reported back, so in the example
above browse to `http://{host ip}:32768`

### Linking Containers

You can link containers "internally" within the docker runtime by using the --link option.

For example I have a simple MQTT broker container available as

    docker run -it --name mybroker eclipse-mosquitto

(no need to expose the port 1883 globally unless you want to... as we do magic below)

Then run nodered docker - but this time with a link parameter (name:alias)

    docker run -it -p 1880:1880 --name mynodered --link mybroker:broker nodered/node-red

the magic here being the `--link` that inserts an entry into the node-red instance
hosts file called *broker* that links to the external mybroker instance....  but we do
expose the 1880 port so we can use an external browser to do the node-red editing.

Then a simple flow like below should work - using the alias *broker* we just set up a second ago.

        [{"id":"190c0df7.e6f3f2","type":"mqtt-broker","broker":"broker","port":"1883","clientid":""},{"id":"37963300.c869cc","type":"mqtt in","name":"","topic":"test","broker":"190c0df7.e6f3f2","x":226,"y":244,"z":"f34f9922.0cb068","wires":[["802d92f9.7fd27"]]},{"id":"edad4162.1252c","type":"mqtt out","name":"","topic":"test","qos":"","retain":"","broker":"190c0df7.e6f3f2","x":453,"y":135,"z":"f34f9922.0cb068","wires":[]},{"id":"13d1cf31.ec2e31","type":"inject","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":226,"y":157,"z":"f34f9922.0cb068","wires":[["edad4162.1252c"]]},{"id":"802d92f9.7fd27","type":"debug","name":"","active":true,"console":"false","complete":"false","x":441,"y":261,"z":"f34f9922.0cb068","wires":[]}]

This way the internal broker is not exposed outside of the docker host - of course
you may add `-p 1883:1883`  etc to the broker run command if you want to see it...

### Raspberry PI - native GPIO support

| v1.0 - BREAKING: Native GPIO support for Raspberry PI has been dropped |
| --- |
The replacement for native GPIO is [node-red-node-pi-gpiod](https://github.com/node-red/node-red-nodes/tree/master/hardware/pigpiod).

Disadvantages of the native GPIO support are:
- Your Docker container needs to be deployed on the same Docker node/host on which you want to control the gpio.
- Gain access to `/dev/mem` of your Docker node/host
- privileged=true is not supported for `docker stack` command

`node-red-node-pi-gpiod` fixes all these disadvantages. With `node-red-node-pi-gpiod` it is possible to interact with gpio of multiple Raspberry Pi's from a single Node-RED container, and for multiple containers to access different gpio on the same Pi.

#### Quick Migration steps to `node-red-node-pi-gpiod`

  1. Install `node-red-node-pi-gpiod` through the Node-RED palette.
  2. Install and run `PiGPIOd daemon` on the host Pi. For detailed install instruction please refer to the `node-red-node-pi-gpiod` [README](https://github.com/node-red/node-red-nodes/tree/master/hardware/pigpiod#node-red-node-pi-gpiod).
  3. Replace all native gpio nodes with `pi gpiod` nodes.
  4. Configure `pi gpiod` nodes to connect to `PiGPIOd daemon`. Often the host machine will have an IP 172.17.0.1 port 8888 - but not always. You can use `docker exec -it mynodered ip route show default | awk '/default/ {print $3}'` to check.

**Note**: There is a contributed [gpiod project](https://github.com/corbosman/node-red-gpiod) that runs the gpiod in its own container rather than on the host if required.

### Serial Port - Dialout - Adding Groups

To access the host serial port you may need to add the container to the `dialout` group. This can be enabled by adding `--group-add dialout` to the start command. For example
```
docker run -it -p 1880:1880 --group-add dialout --name mynodered nodered/node-red
```

---

### Common Issues and Hints

Here is a list of common issues users have reported with possible solutions.

#### User Permission Errors

See [the wiki](https://github.com/node-red/node-red-docker/wiki/Permissions-and-Persistence) for detailed information
on permissions.

If you are seeing *permission denied* errors opening files or accessing host devices, try running the container as the root user.

```
docker run -it -p 1880:1880 --name mynodered -u node-red:dialout nodered/node-red
```

References:

https://github.com/node-red/node-red-docker/issues/15

https://github.com/node-red/node-red-docker/issues/8

#### Accessing Host Devices

If you want to access a device from the host inside the container, e.g. serial port, use the following command-line flag to pass access through.

```
docker run -it -p 1880:1880 --name mynodered --device=/dev/ttyACM0 nodered/node-red
```
References:
https://github.com/node-red/node-red/issues/15

#### Setting Timezone

If you want to modify the default timezone, use the TZ environment variable with the [relevant timezone](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
```
docker run -it -p 1880:1880 --name mynodered -e TZ=Europe/London nodered/node-red
```

References:
https://groups.google.com/forum/#!topic/node-red/ieo5IVFAo2o
