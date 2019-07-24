import React from 'react';

import Page from './Page';
import CreatePollForm from '../forms/CreatePollForm';

import { localize } from '../utils';
 
function AddPollPage() {
    return (
        <Page title={localize({'ru' : 'Создать опрос', 'en' : 'Create poll'})}>
            <CreatePollForm />
        </Page>
    )
}

export default AddPollPage;