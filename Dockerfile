FROM node:lts-alpine
#Verzeichnis zu app wechseln
WORKDIR /usr/src/app
#Kopieren der package dependencies und konfigurationen
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
#Installieren der dependencies
RUN npm install --force && mv node_modules ../
#Kopieren des Source-Code in das app Verzeichnis
COPY . .
#Port 3000 oeffnen
EXPOSE 3000
#Berechtigungen für node setzen
RUN chown -R node /usr/src/app
USER node
#Starten der Applikation
CMD ["npm", "start"]
