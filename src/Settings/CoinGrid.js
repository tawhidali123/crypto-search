import React from 'react'
import {AppContext} from '../AppProvider'
import styled from 'styled-components'
import {SelectableTile} from '../Shared/Tile'

const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
`

export default function CoinGrid() {
    return (
        <AppContext.Consumer>
            {
                ({coinList}) => (
                    <CoinGridStyled>
                        {
                            Object.keys(coinList).map(coinKey => {
                                return <SelectableTile> {coinKey} </SelectableTile>
                            })
                        }
                    </CoinGridStyled>
                )
            }
        </AppContext.Consumer>
    )
}
