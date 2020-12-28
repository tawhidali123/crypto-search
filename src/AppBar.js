import React from 'react'
import styled, {css} from 'styled-components'

const Bar = styled.div`
    display: grid;
    margin-bottom: 40px;
    grid-template-columns: 180px auto 100px 100px;
`

const Logo = styled.div`
    font-size: 1.5em;
`

const ControlButtonElem = styled.div`
    cursor: pointer;
    ${props => props.active && css`
        text-shadow: 0 0 15px #0ff567;
    `}
`

function toProperCase(lower){
    return lower.charAt(0).toUpperCase() + lower.substr(1)
}

function ControlButton({name, active}){
    return(
        <ControlButtonElem active={active}>
            {toProperCase(name)}
        </ControlButtonElem>
    )
    
}

export default function AppBar() {
    return (
        <Bar>
            <Logo>CryptoSearch</Logo>
            <div />
            <ControlButton active name='dashboard' />
            <ControlButton name='settings' />
        </Bar>
    )
}
