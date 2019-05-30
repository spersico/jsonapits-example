import * as Knex from 'knex';
import * as Koa from 'koa';

import login from './callbacks/login';

import Article from './resources/article';
import User from './resources/user';
import Comment from './resources/comment';
import Vote from './resources/vote';

import UserProcessor from './processors/user';
import ArticleProcessor from './processors/article';
import {
    Application,
    KnexProcessor,
    jsonApiKoa,
    UserManagementAddon,
    UserManagementAddonOptions,
    ApplicationInstance,
} from '@ebryn/jsonapi-ts';
import { join } from 'path';

const app = new Application({
    namespace: 'api',
    types: [Article, Comment, Vote],
    processors: [ArticleProcessor],
    defaultProcessor: KnexProcessor,
});

app.use(UserManagementAddon, {
    userResource: User,
    userProcessor: UserProcessor,
    userLoginCallback: login,
    async userRolesProvider(this: ApplicationInstance, user: User) {
        return ['Admin'];
    },
} as UserManagementAddonOptions);

app.services.knex = Knex({ client: 'sqlite3', connection: { filename: join(__dirname, "db.sqlite3") }, useNullAsDefault: true });

// transport layer
const koa = new Koa();
koa.use(jsonApiKoa(app));
koa.listen(3000);
console.log("Server Up!");

