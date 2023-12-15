# Local Development

## Creating the DB

- Open docker in WSL
- Start with `sudo service docker start`
- Create new volume for data `docker volume create tabletop-assistant`
- Run `docker run -v tabletop-assistant:/data/db --name mongodb -d -p 27017:27017 mongo`

## Start the Server

## Start the Frontend
