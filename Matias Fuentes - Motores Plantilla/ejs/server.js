const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

const routes = require('./routes.js');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.render('main', { title: 'Formulario' });
});
app.use('/productos', routes);
app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ err, message: 'Something went wrong, sorry' });
});
app.use('*', (req, res)=> {
    res.status(404).send('<h3> PAGE NOT EXIST </h3>');
});
const connectedSever = app.listen(PORT, ()=> {
    console.log(`Server ON. Listening on PORT: ${PORT}`);
});

connectedSever.on("error", (error)=> {
    console.log(`Wrong -> ERROR: `, error.message);
});