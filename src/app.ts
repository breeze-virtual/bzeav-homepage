/**
 * @author Cian Ormond
 */

import express from 'express';

const app: express.Application = express();
const port = process.env.PORT || 3000;
//const functions = require('./api/functions.ts');

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.get('/', async (req, res) => {
    res.render('pages/index.ejs');
});

app.get('*', (req, res) => {
    res.redirect('/')
});

// Save for when this becomes a multi-page app
/*app.get('*', (req, res) => {
    res.render('pages/err.ejs', { code: 404, message: 'Page not found' });
});*/

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.render('pages/err.ejs', { code: 500, message: 'Internal server error' });
});