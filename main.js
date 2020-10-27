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
  // console.info("1")
})
// console.info("2")

// .html
// app.get("/roll", (req, res) => {
//   res.status(200)
//   res.type('text/html')
//   res.sendFile(__dirname + '/static/roll.html');
// })

let pictures = ["one", "two", "three", "four", "five", "six"];
let randomPicture = Math.floor(Math.random() * (pictures.length + 1));
let image = `${pictures[randomPicture]}.png`;
// console.info(__dirname + ${'/static/${image}`)

// .hbs
app.get("/roll", (req, res) => {
  // console.info(image)
  // console.info("hi")
  res.status(200)
  res.type('text/html')
  res.render('roll', {
    image: image,
  });
})

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
  console.info(`Application started on port ${PORT} at ${new Date()}`);
});