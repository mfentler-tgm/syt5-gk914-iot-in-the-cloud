#!/bin/sh

echo "APT Update"
apt update -y
# echo "APT Upgrade"
# apt upgrade -y
# echo "APT Dist-Upgrade"
# apt dist-upgrade -y

echo "APT Install: Python"
apt install -y python2.7 python-pip python3 python3-pip
echo "APT Install: VI, VIM"
apt install -y vi vim
echo "APT Install: GIT"
apt install -y git
echo "APT Install: Node.js, NPM"
apt install -y nodejs npm

echo "NPM Config: Python -> 2.7"
npm config set python python2.7

echo "NPM Install: raspi-Live"
npm install -g raspi-live

echo "Install sqlite3"
npm install sqlite3

cd /app
git pull
npm install
