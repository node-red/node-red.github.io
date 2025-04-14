
## Installing on Oracle Cloud

There are instructions for how to sign up for and configure an "Always Free VM" on Oracle Cloud in [this blog post](https://blogs.oracle.com/developers/installing-node-red-in-an-always-free-vm-on-oracle-cloud).

Once you have your instance setup, SSH in to your machine.

From a terminal window on your local machine, make an SSH connection into your VM using the private key associated with the public key you specified at instance creation and the IP address of your VM. Use `opc` as the username:

![SSH to Oracle VM](/images/oracle-ssh.jpg)


### Installing Node-RED

Once logged in you just need to run the rpm script from [here](https://github.com/node-red/linux-installers/blob/master/README.md).

```
bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/rpm/update-nodejs-and-nodered)
```

The script will install Node.JS, Node-RED and optionally open the VM firewall for port 1880.

Once it is complete you will see output similar to this:

![Linux Installer](/images/nr-rpm-install.jpg)


Start Node-RED with `node-red-start` and you will see output similar to the following:

```
Once Node-RED has started, point a browser at http://10.0.2.6:1880
On Pi Node-RED works better with the Firefox or Chrome browser

Use   node-red-stop                          to stop Node-RED
Use   node-red-start                         to start Node-RED again
Use   node-red-log                           to view the recent log output
Use   sudo systemctl enable nodered.service  to autostart Node-RED at every boot
Use   sudo systemctl disable nodered.service to disable autostart on boot

To find more nodes and example flows - go to http://flows.nodered.org

Starting as a systemd service.
Started Node-RED graphical event wiring tool.
15 Oct 14:28:07 - [info]
Welcome to Node-RED
===================
15 Oct 14:28:07 - [info] Node-RED version: v1.0.2
15 Oct 14:28:07 - [info] Node.js  version: v10.16.3
15 Oct 14:28:07 - [info] Linux 4.14.35-1902.5.2.2.el7uek.x86_64 x64 LE
15 Oct 14:28:08 - [info] Loading palette nodes
15 Oct 14:28:09 - [info] Settings file  : /home/opc/.node-red/settings.js
15 Oct 14:28:09 - [info] Context store  : 'default' [module=memory]
15 Oct 14:28:09 - [info] User directory : /home/opc/.node-red
15 Oct 14:28:09 - [warn] Projects disabled : editorTheme.projects.enabled=false
15 Oct 14:28:09 - [info] Flows file     : /home/opc/.node-red/flows_node-red.json
15 Oct 14:28:09 - [info] Creating new flow file
15 Oct 14:28:10 - [warn]
---------------------------------------------------------------------
Your flow credentials file is encrypted using a system-generated key.
If the system-generated key is lost for any reason, your credentials
file will not be recoverable, you will have to delete it and re-enter
your credentials.
You should set your own key using the 'credentialSecret' option in
your settings file. Node-RED will then re-encrypt your credentials
file using your chosen key the next time you deploy a change.
---------------------------------------------------------------------
15 Oct 14:28:10 - [info] Server now running at http://127.0.0.1:1880/
15 Oct 14:28:10 - [info] Starting flows
15 Oct 14:28:10 - [info] Started flows
```

You can ensure that Node-RED always starts at boot with:
```
sudo systemctl enable nodered.service
```

You're now ready to launch Node-RED in your browser at `http://[public-IP]:1880`

### Next steps

- [Learn how to secure your editor](/docs/user-guide/runtime/securing-node-red)
- [Create your first flow](/docs/tutorials/first-flow)
- [Adding nodes to the palette](/docs/user-guide/runtime/adding-nodes)
