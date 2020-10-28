const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

// app.set('views', __dirname + '/views');
app.set('view engine', 'hbs')
app.engine('hbs',
handlebars({ defaultLayout: "default.hbs" })
)

const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

// .html
// app.get("/", (req, res) => {
//   res.status(200)
//   res.type('text/html')
//   res.sendFile(__dirname + '/static/index.html');
// })

// app.use(
//   (req, resp, next) => {
//       console.info(`${new Date()}: ${req.method} ${req.originalUrl}`)
//       next()
//   }
// )

app.use(express.static(__dirname + '/static'));
// console.info(__dirname + '/static');

// .hbs
app.get("/", (req, res) => {
  let twoDiceImage = '2_dice.png'
  res.status(200)
  res.type('text/html')
  res.render('first_page', {
    twoDiceImage: twoDiceImage
  })
})

// .html
// app.get("/roll", (req, res) => {
//   res.status(200)
//   res.type('text/html')
//   res.sendFile(__dirname + '/static/roll.html');
// })


// .hbs
app.get("/roll", (req, res) => {
  let pictures = ["one", "two", "three", "four", "five", "six"];
  let randomNumber1 = Math.floor(Math.random() * (pictures.length));
  let randomNumber2 = Math.floor(Math.random() * (pictures.length));
  let image1 = `${pictures[randomNumber1]}.png`;
  let image2 = `${pictures[randomNumber2]}.png`;
  console.info(image1)
  console.info(image2)
  res.status(200)
  res.type('text/html')
  res.render('roll', {
    image1: image1,
    image2: image2,
  });
});

app.use(
  (req, resp) => {
    let twoDiceImage = '2_dice.png'
    resp.status(404);
    resp.type("text/html");
    resp.render('first_page', {
      twoDiceImage: twoDiceImage
    });
  })

app.listen(PORT, () => {
  console.info(`Application started on port ${PORT} at ${(new Date()).toString().slice(0, 15)}`);
});