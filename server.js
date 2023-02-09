const express = require('express');
const session = require('express-session');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const handlebars = require('express-handlebars');

const app = express();

// const hbs = exphbs.create({ helpers });
// app.engine('handlebars', hbs.engine);

app.engine('handlebars', handlebars({ helpers: {} }));

app.set('view engine', 'handlebars');
app.set('views', 'views');

app.use(express.static('public'));
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
