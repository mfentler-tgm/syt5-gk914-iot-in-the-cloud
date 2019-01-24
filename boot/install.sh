#!/bin/sh

apt update -y
apt upgrade -y
apt dist-upgrade -y

apt install -y python2.7 python-pip python3 python3-pip
apt install -y vi vim
apt install -y git
apt install -y nodejs npm
apt install -y libomxil-bellagio-dev

wget -O ffmpeg.tar.bz2 https://ffmpeg.org/releases/ffmpeg-snapshot-git.tar.bz2
tar xvjf ffmpeg.tar.bz2
cd ffmpeg
sudo ./configure --arch=armel --target-os=linux --enable-gpl --enable-omx --enable-omx-rpi --enable-nonfree

npm config set python python2.7

npm install -g raspi-live

cd /app
git pull
npm start
