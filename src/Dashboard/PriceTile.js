import React from 'react'
import styled, {css} from 'styled-components'
import { CoinHeaderGridStyled } from '../Settings/CoinHeaderGrid'
import { fontSize3, fontSizeBig, greenBoxShadow } from '../Shared/Style'
import {SelectableTile} from '../Shared/Tile'
import {AppContext} from '../AppProvider'

const JustifyRight = styled.div`
    justify-self: right;
`
const JustifyLeft = styled.div`
    justify-self: left;
`

const TickerPrice = styled.div`
    ${fontSizeBig}
`

const ChangePctStyled = styled.div`
    color: green;
    ${props => props.red && css`
        color: red;
    `}
`

const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
        display: grid;
        ${fontSize3};
        grid-gap: 7.5px;
        grid-template-columns: repeat(3, 1fr);
        justify-items: right;
    `}

    ${props => props.currentFavorite && css`
        ${greenBoxShadow};
        pointer-events: none;
    `}
`

const numberFormat = number => {
    return +(number + '').slice(0, 7)
}


function ChangePercent({data}) {
    return (
        <JustifyRight>
            <ChangePctStyled red={data.CHANGEPCT24HOUR < 0}>
                {numberFormat(data.CHANGEPCT24HOUR)}% 
            </ChangePctStyled>
        </JustifyRight>
    )
}

function PriceTile({sym, data, currentFavorite, setCurrentFavorite}) {
    return (
        <PriceTileStyled currentFavorite={currentFavorite} onClick={setCurrentFavorite}>
            <CoinHeaderGridStyled>
                <div> {sym} </div>
                <ChangePercent data={data} />
            </CoinHeaderGridStyled>
            <TickerPrice>
                ${numberFormat(data.PRICE)}
            </TickerPrice>
        </PriceTileStyled>
    )
}

function PriceTileCompact({sym, data, currentFavorite, setCurrentFavorite}) {
    return (
        <PriceTileStyled compact currentFavorite={currentFavorite} onClick={setCurrentFavorite}>
            <JustifyLeft> {sym} </JustifyLeft>
            <ChangePercent data={data} />
            <div>
                ${numberFormat(data.PRICE)}
            </div>
        </PriceTileStyled>
    )
}


export default function({price, index}) {

    let sym = Object.keys(price)[0]
    let data = price[sym]['USD']
    let TileClass = index < 5 ? PriceTile : PriceTileCompact

    return (
        <AppContext.Consumer>
            {
                ({currentFavorite, setCurrentFavorite}) => (
                    <TileClass 
                        sym={sym} 
                        data={data} 
                        currentFavorite={currentFavorite === sym} 
                        setCurrentFavorite={() => setCurrentFavorite(sym)}
                    />
                )
            }
        </AppContext.Consumer>
        
    )
}
