import { price } from 'cryptocompare'
import React from 'react'
import styled from 'styled-components'
import {AppContext} from '../AppProvider'
import PriceTile from './PriceTile'

const PriceGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    margin-top: 40px;
`

export default function PriceGrid() {
    return (
        <div>
            <AppContext.Consumer>
                {
                    ({prices}) => (
                        <PriceGridStyled>
                            {prices.map((price, index) => (
                                <PriceTile index={index} price={price} />
                            ))}
                        </PriceGridStyled>
                    )
                }
            </AppContext.Consumer>
        </div>
    )
}
