import React from 'react'
import ConfirmButton from './ConfirmButton'
import WelcomeMessage from './WelcomeMessage'
import Page from '../Shared/Page'

export default function indexSettings() {
    return (
        <Page name='settings'>
            <WelcomeMessage />
            <ConfirmButton />
        </Page>
    )
}
