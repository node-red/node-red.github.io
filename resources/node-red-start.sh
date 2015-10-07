#!/bin/bash
echo -e '\033]2;'NODE-Red console'\007'
sudo /etc/init.d/nodered start
sleep 2
tail -f /var/log/node-red.log
