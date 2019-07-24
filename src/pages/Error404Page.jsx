import React from 'react';

import Page from './Page';

import { localize } from '../utils';

function Error404Page() {
    return (
        <Page title={localize({'ru' : '404 не найдено', 'en' : '404 Not Found'})}>
            <h1 style={{color : 'red'}}>{localize({'ru' : 'Страница не найдена', 'en' : 'Page not found'})} :(</h1>
        </Page>
    )
}

export default Error404Page;