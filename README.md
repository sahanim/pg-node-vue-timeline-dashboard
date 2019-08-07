//Setup

1. Before starting ensure nodejs and postgres are installed on the machine with "postgres" as a database running on port 5432

2. Start terminal

  2.1 "git clone https://github.com/sahanim/pg-node-vue-timeline-dashboard.git"

  2.2 "npm install -g sequelize-cli



// Start Server

1. start new terminal

  1.1 "cd path/to/repo"

  1.2 "npm install"

  1.3 "npx sequelize-cli db:migrate --url 'postgres://username:password@localhost:5432/postgres'"

  1.4 "npm start"
  


// Start Client

1. start new terminal

  1.1 "cd path/to/repo/client"

  1.2 "npm install"

  1.3 "npm run serve"
