const express = require('express');
const handlebars = require('express-handlebars');

const roll_dice = () => Math.floor(Math.random() * 6) + 1
// const alt_roll_dice = function() {
//   return Math.floor(Math.random() * 6) + 1;
// }

const DICE_IMGS = [
  "", "one.png", "two.png", "three.png", "four.png", "five.png", "six.png"
]

const landingPage = (req, res) => {
  res.status(200)
  res.type('text/html')
  res.render('indexChuk')
}

// configure the environemnt
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

// create an instance of express
const app = express();

// configure HBS
app.engine('hbs', handlebars({ defaultLayout: 'defaultChuk.hbs' }));
app.set('view engine', 'hbs');

// configure express
app.get(['/', '/index.html'], landingPage);

app.get('/roll', 
  (req, res) => {
    const d1 = DICE_IMGS[roll_dice()];
    const d2 = DICE_IMGS[roll_dice()];

    res.status(200)
    res.type('text/html')
    // first d1 is in roll, second d1 from variable from top
    // res.render('roll', { d1: d1, d2: d2 })
    // shortcut
    res.render('rollChuk', { d1, d2 })
  }
)

// load/mount the static resources directory (this is a middleware)
// you can load more than one folder for express to look into
app.use(express.static(__dirname + '/static'))
app.use(landingPage)

// start express
app.listen(PORT, () => {
  console.info(`Application started on port ${PORT} at ${(new Date())}`);
});





