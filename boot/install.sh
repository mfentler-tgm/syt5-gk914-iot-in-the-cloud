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
echo "APT Install: FFMPEG"
apt install -y libomxil-bellagio-dev

wget -O ffmpeg.tar.bz2 https://ffmpeg.org/releases/ffmpeg-snapshot-git.tar.bz2
tar xvjf ffmpeg.tar.bz2
cd ffmpeg
sudo ./configure --arch=armel --target-os=linux --enable-gpl --enable-omx --enable-omx-rpi --enable-nonfree

echo "NPM Config: Python -> 2.7"
npm config set python python2.7

echo "NPM Install: raspi-Live"
npm install -g raspi-live

echo "Install sqlite3"
npm install sqlite3

cd /app
git pull
npm install
