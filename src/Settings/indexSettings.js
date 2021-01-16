import React from 'react'
import ConfirmButton from './ConfirmButton'
import WelcomeMessage from './WelcomeMessage'
import Page from '../Shared/Page'
import CoinGrid from './CoinGrid'
import Search from './Search'

export default function indexSettings() {
    return (
        <Page name='settings'>
            <WelcomeMessage />
            <CoinGrid topSection/>
            <ConfirmButton />
            <Search />
            <CoinGrid />
        </Page>
    )
}
