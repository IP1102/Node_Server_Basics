const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000; //Selects port from environt variables

hbs.registerPartials(__dirname + '/Views/Partials');
app.set('view engine', 'hbs');
/* app.use(express.static(__dirname + '/public')); */

app.use((req,res,next) => {
    var now = new Date().toDateString();
    var log = `${now}: ${req.method}: ${req.url}`;

   // console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Error!');
        }
    });
    next();
});

/* app.use((req,res,next) => {
    res.render('maintenance.hbs');
}); */

app.use(express.static(__dirname + '/public')); //It's shifted over here coz app.use works in a sequential
                                                //Order. So, help.html wouldn't have been redirected in the maintenance page.


/* app.get('/', (req,res) => {
    res.send('Hello World!');
});
 */

app.get('/',(req,res) => {
    res.render('home.hbs',{
        title: 'This is my server!',
        CurrentDate: new Date().getDate()
    });
});
 
app.get('/about', (req,res) => {
    res.render('about.hbs',{
        name: 'Indranil Palit',
        hobbies: 'Playing Football',
        DOB: '11/02/1999'
    }); 
});


app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        ProName: 'Node_Server',
        accTime: new Date().getHours().toString()
    });
});




app.listen(port, () => {
    console.log(`Listening in Port ${port}`);
});
