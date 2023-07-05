/**
 * @author Cian Ormond
 */

import express from 'express';
import fs from 'fs';
import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';

type article = {
    id: string,
    title: string,
    date: string,
    author: string,
    firstLine: string
}

require('dotenv').config();

const compression = require('compression');

const app: express.Application = express();
const port = process.env.PORT || 3000;
//const functions = require('./api/functions.ts');

app.use(express.static('public'));
app.use(compression())
app.set('view engine', 'ejs')
app.listen(port, () => console.log(`Server is running on port ${port}`));

marked.use({
    mangle: false,
    gfm: true
});
marked.use(gfmHeadingId());

app.get('/', async (req, res) => {
    res.render('pages/index.ejs');
});

app.get('/news', async (req, res) => {
    const articles = await JSON.parse(fs.readFileSync('./private/articles/articles.json', 'utf8')).articles;
    res.render('pages/news.ejs', { articles: articles});
});

app.get('/news/:date/:id', async (req, res) => {
    const articles = await JSON.parse(fs.readFileSync('./private/articles/articles.json', 'utf8')).articles;
    try {
        const article = articles.find((article: article) => article.id === req.params.id && article.date ===
            req.params.date);
        const content = fs.readFileSync(`./private/articles/${article.date}-${article.id}.md`,
            'utf8');

        res.render('pages/article.ejs', { article: article, content: marked.parse(content) });
    } catch (err) {
        console.error(err);
        res.render('pages/err.ejs', {code: 404, message: 'Article not found'});
    }
});

app.get('/hubs-routes', async (req, res) => {
    const hubs = JSON.parse(fs.readFileSync('./private/hubs.json', 'utf8')).hubs;
    res.render('pages/hubs-routes.ejs', { hubs: hubs });
});

app.get('/fleet', async (req, res) => {
    res.render('pages/fleet.ejs');
});

app.get('*', async (req, res) => {
    res.render('pages/err.ejs', { code: 404, message: 'Page not found' });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(err + Date.now());
    res.render('pages/err.ejs', { code: 500, message: 'Internal server error' });
});