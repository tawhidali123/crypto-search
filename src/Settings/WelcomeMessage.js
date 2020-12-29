import React from 'react'
import {AppContext} from '../AppProvider'

export default function WelcomeMessage() {
    return (
        <AppContext.Consumer>
            {
                ({firstVisit}) => firstVisit ? <div>Welcome to CryptoSearch, Please Select your favorite coins to begin</div> : null
            }
        </AppContext.Consumer>
    )
}
