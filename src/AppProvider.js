import React from 'react'
import _ from 'lodash'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CC_API_KEY)

export const AppContext = React.createContext()

const MAX_FAVORITES = 10

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETH'],
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
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
            favorites: this.state.favorites
        }))
    }

    isInFavorites = key => _.includes(this.state.favorites, key)

    addCoin = key => {
        let favorites = [...this.state.favorites]
        if(favorites.length < MAX_FAVORITES){
            favorites.push(key)
            this.setState({favorites})
        }
    }

    removeCoin = key => {
        let favorites = [...this.state.favorites]
        this.setState({favorites: _.pull(favorites, key)})
    }

    savedSettings = () => {
        let cryptoSearchData = JSON.parse(localStorage.getItem('cryptoSearch'));
        if(!cryptoSearchData) {
            return {page: 'settings', firstVisit: true}
        }
        let {favorites} = cryptoSearchData
        return {favorites}
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
