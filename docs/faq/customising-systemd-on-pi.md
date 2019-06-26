---
layout: docs-faq
toc: toc-user-guide.html
title: Customising the Raspberry Pi service
slug: systemd service
---

When running on the Raspberry Pi or other Debian-based Linux system, our
[install script](/docs/hardware/raspberrypi) can be used to setup a systemd
service to autostart Node-RED on boot.

This guide shows how the service can be customised for some common scenarios.



### Changing the user

The service comes configured for the `pi` user. To change which user it runs as,
edit the service definition `/lib/systemd/system/nodered.service` and change the
`User`, `Group` and `WorkingDirectory` lines as appropriate:

```yaml
[Service]
Type=simple
# Run as normal pi user - change to the user name you wish to run Node-RED as
User=<your_user>
Group=<your_user>
WorkingDirectory=/home/<your_user>
Nice=5
Environment="PI_NODE_OPTIONS=--max_old_space_size=256"
...
```

After editing the file, run the following commands to reload the systemd daemon
and then restart the Node-RED service.

```
sudo systemctl daemon-reload
node-red-stop
node-red-start
```


### Configuring an HTTP proxy

If you need to use a proxy for http requests within your Node-RED flows, you
need to set the `HTTP_PROXY` environment variable.

Edit the service definition `/lib/systemd/system/nodered.service` and add
another `Environment=...` line. For example:

```yaml
...
Nice=5
Environment="NODE_OPTIONS=--max-old-space-size=128"
Environment="HTTP_PROXY=my-proxy-server-address"
...
```

After editing the file, run the following commands to reload the systemd daemon
and then restart the Node-RED service.

```
sudo systemctl daemon-reload
node-red-stop
node-red-start
```
