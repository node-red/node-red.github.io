---
layout: docs-getting-started
title: Adding Prerequisites to Docker
toc: toc-user-guide.html
slug: docker-custom
redirect_from:
  - /docs/platforms/docker-custom
---

### Introduction

The project makes available a number of different versions of the Docker container on [Docker hub](https://hub.docker.com/r/nodered/node-red/) which fall into 2 categories:

 - Different underlying NodeJS versions. As new NodeJS LTS versions are released corresponding versions of the container are added.
 - Images tagged with the `-minimal` suffix. These containers are designed to contain the absolute libraries required to run Node-RED and it's core nodes.

Specifically the `-minimal` containers do not have the native build tools required to build some nodes components triggered by installing them.

Both of these sets of images are based on the NodeJS Alpine containers. Alpine is a Linux distribution that aims to provide the smallest possible install footprint, it is used as the base for many language runtime containers (e.g. NodeJS & Python). As part of a number of optimizations to reduce the size it uses the [musl](https://www.musl-libc.org/intro.html) libc instead of the usual glibc implementation.

Musl works fine with most applications but on some occasions it can cause problems e.g. with some of the [SAP](https://github.com/SAP/node-rfc/issues/148) nodes and with some low level video codec.

If you want to extend the provided Docker containers then then you will need to use Alpine's package management tool `apk` to install additional libraries or applications.

        FROM nodered/node-red:latest
        USER root
        RUN apk add py3-pip py3-numpy py3-pandas py3-scikit-learn
        RUN pip install tensorflow
        USER node-red

### Debian based containers

As well as the Alpine based containers the Node-RED Docker git project also includes a script to build a version of the Node-RED Docker containers based on the Debian Linux Distribution. This is useful as Debian is a more mainstream Linux distribution and many nodes include instructions on how to install prerequisites.

You can build the containers locally by running the following commands:

      $ git clone https://github.com/node-red/node-red-docker.git
      $ cd node-red-docker/docker-custom
      $ ./docker-debian.sh


This will a container called `testing:node-red-build` which can be run as follows:

      $ docker run -d -p 1880:1880 -v node_red_data:/data --name myNRtest testing:node-red-build

This container can be extended to add the required prerequisites for your projects. For example to add the required libraries for the [node-red-contrib-machine-learning](https://flows.nodered.org/node/node-red-contrib-machine-learning) node the following Dockerfile will extend the previously built container.

      FROM testing:node-red-build
      USER root
      RUN apt-get install -y python3-pip python3-numpy python3-pandas 
      RUN pip install scikit-learn tensorflow
      USER node-red

This can be build with

      docker build . -t custom-node-red

The other option is to edit the `Dockerfile.debian` to build in the dependencies up front. You can add the packages to the `apt-get` line and then add a `pip` to install the native Python modules not directly packaged for Debian.

      ...
      COPY --from=build /usr/src/node-red/prod_node_modules ./node_modules

      # Chown, install devtools & Clean up
      RUN chown -R node-red:root /usr/src/node-red && \
          apt-get update && apt-get install -y build-essential python-dev python3 \ 
          python3-pip python3-numpy python3-pandas && \
          pip install scikit-learn tensorflow && \
          rm -r /tmp/*

      USER node-red
      ...

In this case you would just need to rerun the `docker-debian.sh` script.