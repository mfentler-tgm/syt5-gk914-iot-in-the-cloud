#!/bin/sh

apt update -y
apt upgrade -y
apt dist-upgrade -y

apt install -y python2.7 python-pip python3 python3-pip
apt install -y vi vim
apt install -y git
apt install -y nodejs npm

npm config set python python2.7

git clone https://github.com/TGM-HIT/syt5-gk914-iot-in-the-cloud-basement-shitting-prevention-team /app
cd app
npm install
npm start
