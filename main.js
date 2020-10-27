const express = require('express');
const handlebars = require('express-handlebars');
const PORT = parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3000;

const app = express();

app.engine('hbs',
  handlebars({ defaultLayout: "default.hbs" })
)
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views');

// .html
// app.get("/", (req, res) => {
//   res.status(200)
//   res.type('text/html')
//   res.sendFile(__dirname + '/static/index.html');
// })

// .hbs
app.use("/", (req, res) => {
  res.status(200)
  res.type('text/html')
  res.render('default')
})

// .html
// app.get("/roll", (req, res) => {
//   res.status(200)
//   res.type('text/html')
//   res.sendFile(__dirname + '/static/roll.html');
// })

let pictures = ["one", "two", "three", "four", "five", "six"];
let number = Math.floor(Math.random * 6) + 1;
let image = `${number}.png`;

// .hbs
app.get("/roll", (req, res) => {
  res.status(200)
  res.type('text/html')
  res.render('roll', {
    image: image
  });
})

app.use(express.static(__dirname + '/static'));

app.use(
  (req, resp) => {
    resp.status(404);
    resp.type("text/html");
    resp.sendFile(__dirname + '/static/index.html');
  })

app.listen(PORT, () => {
  console.info(`Application started on port ${PORT} at ${new Date()}`);
});