import React from 'react';

import Page from './Page';
import CreatePollForm from '../forms/CreatePollForm';

function AddPollPage() {
    return (
        <Page title="Create new poll">
            <CreatePollForm />
        </Page>
    )
}

export default AddPollPage;