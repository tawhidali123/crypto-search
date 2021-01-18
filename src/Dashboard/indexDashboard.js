import React from 'react'
import Page from '../Shared/Page'
import PriceGrid from './PriceGrid'

export default function indexDashboard() {
    return (
        <Page name='dashboard'>
            <PriceGrid />
        </Page>
    )
}