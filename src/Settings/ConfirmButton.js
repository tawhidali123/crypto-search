import React from 'react'
import styled from 'styled-components'
import {AppContext} from '../AppProvider'

const ConfirmButtonStyled = styled.div`
    margin: 20px;
    color: green;
    font-size: 7.5px;
    cursor: pointer;
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
                            <h1>Confirm Favorites</h1>
                        </ConfirmButtonStyled>
                    </CenterDiv>
                )
            }
        </AppContext.Consumer>
        
    )
}
