import * as Knex from 'knex';
import * as Koa from 'koa';

import Article from './resources/article';
import Comment from './resources/comment';
import Vote from './resources/vote';

import { Application, KnexProcessor, jsonApiKoa } from '@ebryn/jsonapi-ts';
import { join } from 'path';

const app = new Application({
    types: [Article, Comment, Vote],
    defaultProcessor: KnexProcessor
});

app.services.knex = Knex({
    client: 'sqlite3',
    connection: { filename: join(__dirname, 'db.sqlite3') },
    useNullAsDefault: true,
});

// transport layer
const koa = new Koa();
koa.use(jsonApiKoa(app));
koa.listen(3000);
console.log('Server Up!');
