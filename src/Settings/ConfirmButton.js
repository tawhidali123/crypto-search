import React from 'react'
import styled from 'styled-components'
import {AppContext} from '../AppProvider'
import {fontSize1, greenBoxShadow, color3} from '../Shared/Style'

const ConfirmButtonStyled = styled.div`
    margin: 20px;
    color: ${color3}
    ${fontSize1};
    padding: 5px;
    cursor: pointer;
    &:hover{
        ${greenBoxShadow}
    }
`

const CenterDiv = styled.div`
    display: grid;
    justify-content: center;
`

export default function ConfirmButton() {
    return (
        <AppContext.Consumer>
            {
                ({confirmFavorites}) => (
                    <CenterDiv>
                        <ConfirmButtonStyled onClick={confirmFavorites}>
                            <h2 style={{color: `${color3}`}}>Confirm Favorites</h2>
                        </ConfirmButtonStyled>
                    </CenterDiv>
                )
            }
        </AppContext.Consumer>
        
    )
}
