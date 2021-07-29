## Youtube clone

In order to run service there is a few things that should be installed: <br/> 1. `node` version `v14.17.3` <br/> 2. `npm` at least `v5.7.1`

To install all dependecies needed we use `npm ci` command which will delete node-moudule(if existed) folder and install all dependencies at once. It will also check package-lock.json and package.json file if any dependencies are missing or have incompatible versions, it will throw an error.
In order to use this command we need to have at least `npm` version `v5.7.1`.

In order to start the service the `npm start` command should be used.

### Configuring the service

To install and configure PSQL using Docker run the below command in linux or windows or mac machine from the terminal or command-prompt to pull PSQL from docker-hub:

```
docker run --name postgresql-container -p 5432:5432 -e POSTGRES_PASSWORD=somePassword -d postgres
```

The postgres server is now running in the IP of your local machine in 5432.

Install PG-admin using Docker:<br/>
Download the pgAdmin-4 browser version from docker-hub using the following command:

```
docker run --rm -p 5050:5050 thajeztah/pgadmin4
```

Now manage your postgres from the browser by launching http://localhost:5050.

To connect the PSQL server in pgAdmin right click on sever then Create->Server

Enter the credentials to save and manage PSQL via GUI.
Host - The IP address of your machine if you dont know it type `hostname -I` in terminal
Password - Password used while creating the PSQL server with docker

In order to start the service the following `.env` variable should be present in the `root` folder:

```
JWT_SECRET = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
JWT_EXPIRE_TIME_TOKEN = 86400000
DATABASE_URL = postgresql://postgres:test1234@192.168.225.86:5432/postgres #setup for database example
DB_DIALECT = postgres
INITIAL_DB_SETUP = true # resync of models in the database, resetting + seeding data
```

### Powered by ministryofprogramming.com
