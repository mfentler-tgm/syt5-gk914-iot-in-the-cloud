#!/bin/bash
#author: Max Fruehmann, 3BHIT 2018/19
echo " ______  _______ _______ _     _ _     _  _____       _______ _______ __   _ _______  ______ _______  ______"
echo " |_____] |_____| |       |____/  |     | |_____]      |  |  | |_____| | \  | |_____| |  ____ |______ |_____/"
echo " |_____] |     | |_____  |    \_ |_____| |            |  |  | |     | |  \_| |     | |_____| |______ |    \_"
echo ""
user=$(whoami)
if [[ "$1" == "" || "$2" == "" || "$user" != "root" || "$1" == "help" ]] 
then
	echo "Usage: bm <clone | defrag | backzip | unbackzip> <Input Device/File> <Output Device/File> <bootable (optional)>"
	echo "Please run as ROOT"
	echo "The bootable option is requiered if the partition clone should be bootable! "
	echo "It may fail if there are no bootable files in the partition"
        echo ""
        echo "If you are not on a debian based machine, please ensure following commands are available:"
        echo "rsync, grub-[setup,install,update], e4defrag, lrzip, dd"
	exit 2
fi
blocksize=$(blockdev --getbsz $2)
if [ "$(echo $2 | grep /dev/)" == "" ]
then
	let blocksize=1
fi
cores=$(lscpu | grep -m1 "CPU(s)" | awk '{print $2}')
threads=$cores*4
echo "Blocksize: $blocksize"
echo "Available CPU Cores: $cores"
if [ "$1" == "clone" ]
then
	if [ "$3" == "" ]
	then
		echo "Please specify Output Device"
		exit 2
	fi
	if [ "$(dpkg -l | grep rsync)" == "" ]
	then
		apt install rsync -y
	fi
	echo "Creating Backup from $2 on $3"
	e4defrag $2 -v
	echo "=============================="
	echo "|Defragmentation successfull!|"
	echo "=============================="
	rsync -a $2 $3
	if [ "$4" == "bootable" ]
	then
		grub-setup $2
		grub-install $2
		grub-update
        fi
fi
if [ "$1" == "defrag" ]
then
	echo "Defragmenting $2"
	e4defrag $2 -v
	echo "=============================="
	echo "|Defragmentation successfull!|"
	echo "=============================="
fi
if [ "$1" == "backzip" ]
then
	if [ "$(dpkg -l | grep lrzip)" == "" ]
	then
		apt-get install lrzip -y
	fi
	if [ "$3" == "" ]
	then
		echo "Please specify Output File"
		exit 2
	fi
	echo "Defragmenting $2"
	e4defrag $2 -v
	echo "=============================="
	echo "|Defragmentation successfull!|"
	echo "=============================="
	echo "Creating Backup..."
	echo "This will take some time..."
	echo "Please be patient!"
	dd if=$2 bs=$blocksize status=progress conv=noerror,sync,notrunc | lrzip -L 9 -p $threads > $3
fi
if [ "$1" == "unbackzip" ]
then
	if [ "$(dpkg -l | grep lrzip)" == "" ]
	then
		apt-get install lrzip -y
	fi
	if [ "$3" == "" ]
	then
		echo "Please specify Output File"
		exit 2
	fi
	echo "Unzipping Backup!"
	echo "This will take some time..."
	echo "Please be patient!"
	lrzip -d $2 -p $threads -o $3
	rm -f $2
fi
echo "Finished... Bye!"
echo "As Tommy Snooks, and Bessie Brooks were walking out one Sunday; Says Tommy Snooks to Bessie Brooks, Tomorrow will be Monday."
