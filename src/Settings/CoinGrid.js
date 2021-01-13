import React from 'react'
import {AppContext} from '../AppProvider'
import styled from 'styled-components'
import CoinTile from './CoinTile'

const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    margin-top: 43.5px;
`

function getCoinsToDisplay(coinList, topSection) {
    return Object.keys(coinList).slice(0, topSection ? 10 : 100);
}

export default function CoinGrid({topSection}) {
    return (
        <AppContext.Consumer>
            {
                ({coinList}) => (
                    <CoinGridStyled>
                        {
                            getCoinsToDisplay(coinList, topSection).map(coinKey => {
                                return <CoinTile coinKey={coinKey} topSection={topSection} />
                            })
                        }
                    </CoinGridStyled>
                )
            }
        </AppContext.Consumer>
    )
}
