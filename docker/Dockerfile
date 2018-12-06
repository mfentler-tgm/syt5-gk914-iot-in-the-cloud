FROM resin/raspberry-pi-node

RUN sudo apt -y update && sudo apt install python2.7 python-pip

COPY package.json /package.json
RUN npm install

COPY src/ /usr/src/app
CMD ["node", "/usr/src/app/app.js"]
