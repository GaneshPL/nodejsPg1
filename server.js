const exp = require('express')
const hbs = require('hbs')
const fs = require('fs')

var app = exp();
hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getYear', ()=>{
  return new Date().getFullYear();
})

hbs.registerHelper('capt', (text)=>{
  return text.toUpperCase()
})

app.set('view engine', 'hbs')

app.use(exp.static(__dirname + '/public'))

app.use((req, res, next)=>{
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.path}`
  fs.appendFile('server.log', log+'\n', (err)=>{
    if(err){
      console.log('Unable to append server.log');
    }
  })
  next();
})

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs',{
//     info:'We are in maintenance mode, will be right back!!'
//   })
// })

app.get('/',(req, res)=>{
  // res.send('This is RESTAPI using <b>Express!<b>')
  res.render('main.hbs',{
    title:'Index Page',
    info: 'Welcome to Ganesh page, rendered using Express for Handlebars'
  })
})

app.get('/about', (req, res)=> {
  res.render('about.hbs', {
    title: 'About me'
  })
})

app.get('/bad', (req, res)=> {
    res.send({
      errorMessage:'Something bad in this site'
    })
})

app.listen(3008, ()=>{
  console.log('Server is running in 3008');
});
