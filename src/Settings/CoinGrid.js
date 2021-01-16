import React from 'react'
import {AppContext} from '../AppProvider'
import styled from 'styled-components'
import CoinTile from './CoinTile'

const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 15px;
    margin-top: 43.5px;
`

function getCoinsToDisplay(coinList, topSection, favorites) {
    return topSection ? favorites : Object.keys(coinList).slice(0, 100);
}

export default function CoinGrid({topSection}) {
    return (
        <AppContext.Consumer>
            {
                ({coinList, favorites}) => (
                    <CoinGridStyled>
                        {
                            getCoinsToDisplay(coinList, topSection, favorites).map(coinKey => {
                                return <CoinTile coinKey={coinKey} topSection={topSection} />
                            })
                        }
                    </CoinGridStyled>
                )
            }
        </AppContext.Consumer>
    )
}
