// include modules
var    express = require('express'),
    app = express(),
    path = require('path'),
    less = require('less-middleware');
    

app.set('port', process.env.PORT || 1337);

// compile and serve css
app.use(less(path.join(__dirname,'source','less'),{
    dest: path.join(__dirname, 'public'),
    options: {
        compiler: {
            compress: false,
        },
    },
    preprocess: {
        path: function(pathname, req) {
            return pathname.replace('/css/','/'); 
        },
    },
    force: true,
}));
// serve static content
app.use(express.static(path.join(__dirname, 'public')));

app.get('/moo', function (req, res) {
    console.log('hey!');
    res.send('Hello World!')
  //return express.static(path.join(__dirname, 'public'));
});

app.post('/moo', function (req, res) {
    console.log('Okay!');
    res.send('Hello World!')
  //return express.static(path.join(__dirname, 'public'));
});

// setup server
var server = app.listen(app.get('port'), function(){
 console.log('Express server listening on port ' + app.get('port'));
});