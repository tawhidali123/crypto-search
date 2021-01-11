import React from 'react'
import {AppContext} from '../AppProvider'
import styled from 'styled-components'

const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`

export default function CoinGrid() {
    return (
        <AppContext.Consumer>
            {
                ({coinList}) => (
                    <CoinGridStyled>
                        {
                            Object.keys(coinList).map(coinKey => {
                                return <div> {coinKey} </div>
                            })
                        }
                    </CoinGridStyled>
                )
            }
        </AppContext.Consumer>
    )
}
