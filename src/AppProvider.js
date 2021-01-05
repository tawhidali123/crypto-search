import React from 'react'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CC_API_KEY)

export const AppContext = React.createContext()

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'dashboard',
            ...this.savedSettings(),
            setPage: this.setPage,
            confirmFavorites: this.confirmFavorites
        }
    }

    componentDidMount(){
        this.fetchCoins();
    }

    fetchCoins = async() => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList})
    }

    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        })
        localStorage.setItem('cryptoSearch', JSON.stringify({
            test: 'hello'
        }))
    }

    savedSettings = () => {
        let cryptoSearchData = JSON.parse(localStorage.getItem('cryptoSearch'));
        if(!cryptoSearchData) {
            return {page: 'settings', firstVisit: true}
        }
        
        return {}
    }

    setPage = page => this.setState({page})

    render(){
        return(
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
