# PostgreSQL

- To manually start the db, use:

```sh
docker compose up
```

- To seed the db use the docker-entrypoint-initdb.d directory.

- To config the postgres db use the postgres.conf file within the postgres.conf directory.

- To expose the database so that it can be accessed from outside the container, use the following instruction in the postgres.conf file:

```s
listen_addresses = '*'
```

- To persist the data of the db within the host use de following instruction in the "docker-compose.yml" file:

```sh
services:
    postgres:
    ...
        volumes:
            # Persistent data using host storage
            - ./postgres-data:/var/lib/postgresql/data
```

- To persist the data of the db within the docker guest use de following instruction in the "docker-compose.yml" file:

```sh
services:
    postgres:
    ...
        volumes:
            # Persistent data using docker guest storage
            - postgres-data:/var/lib/postgresql/data
...

volumes:
    postgres-data:
```
