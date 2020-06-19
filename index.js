const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./src/utils/geocode');
const forecast = require('./src/utils/forecast');

//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname, '../..'));
//console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '/public');
const viewsPath = path.join(__dirname, '/templates/views');
const partialsPath = path.join(__dirname, '/templates/partials');

//setup handlebar engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to use
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'coolganny'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About me',
        name:'coolganny'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name:'coolganny',
        helptext:'Some Helpful Text'
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help Page not available');
    res.render('error', {
        title:'help pages',
        name:'coolganny',
        errorMsg:'Help Title not available'
    })
})

app.get('/weather',(req, res) => {

    if(!req.query.address) {
        return res.send({
            error:'address is Mandatory'
        });
    } else {

        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        
            if(error) {
                return res.send( {
                    "Error":error
                });
            }
    
            forecast(latitude,  longitude, (error, forecastData) => {
                if (error) {
                    return res.send( {
                        "Error":error
                    });
                }
    
                res.send({
                    location:req.query.address,
                    forecast:forecastData,
                    address:location
                });
            })
        });
    }

});

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products:[]
    });
    console.log(req.query);
})

app.get('/*', (req, res) => {
    //res.send('My 404 Page');
    res.render('error', {
        title:404,
        name:'coolganny',
        errorMsg: 'My 404 Page'
    });
})

/*app.get('',(req, res) => {
    res.send("<h1>hello express!</h1>");
});*/

/*app.get('/help',(req, res) => {
    res.send([{
        name:'coolganny',
        age:35
    }, {
        name:'noddyceg',
        age:33
    }]);
});

app.get('/about',(req, res) => {
    res.send("<h2>About page</h2>");
});

*/

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})