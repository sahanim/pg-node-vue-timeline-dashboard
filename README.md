Before starting ensure nodejs and postgres are installed on the machine with "postgres" as a database.

download repo

cd path/to/repo

npm install

npx sequelize-cli db:migrate --url 'postgres://<username>:<password>@localhost:5432/postgres'

npm start

start new terminal window

cd client

npm install

npm run serve
