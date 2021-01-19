import React from 'react'
import styled from 'styled-components'
import Page from '../Shared/Page'
import CoinSpotlight from './CoinSpotlight'
import PriceGrid from './PriceGrid'
import PriceChart from './PriceChart'

const ChartGridStyled = styled.div`
    display: grid;
    margin-top: 20px;
    grid-gap: 15px;
    grid-template-columns: 1fr 3fr;
`

export default function indexDashboard() {
    return (
        <Page name='dashboard'>
            <PriceGrid />
            <ChartGridStyled>
                <CoinSpotlight />
                <PriceChart />
            </ChartGridStyled>
        </Page>
    )
}