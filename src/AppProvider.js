import React from 'react'
import _ from 'lodash'
import moment from 'moment'

const cc = require('cryptocompare')
cc.setApiKey(process.env.REACT_APP_CC_API_KEY)

export const AppContext = React.createContext()

const MAX_FAVORITES = 10

const TIME_UNITS = 10

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
            confirmFavorites: this.confirmFavorites,
            setFilteredCoins: this.setFilteredCoins,
            setCurrentFavorite: this.setCurrentFavorite
        }
    }

    componentDidMount(){
        this.fetchCoins()
        this.fetchPrices()
        this.fetchHistorical()
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList})
    }

    fetchHistorical = async () => {
        if (this.state.firstVisit) return;
        let results = await this.historical();
        let historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((ticker, index) => [
                    moment().subtract({months: TIME_UNITS - index}).valueOf(),
                    ticker.USD
                ])
            }
        ]
        this.setState({historical})
    }

    fetchPrices = async () => {
        if(this.state.firstVisit) return;
        let prices = await this.prices()
        prices = prices.filter(price => Object.keys(price).length)

        this.setState({prices})
    }

    prices = async () => {
        let returnData = []
        for(let data in this.state.favorites){
            try{
                let priceData = await cc.priceFull(this.state.favorites[data], 'USD')
                returnData.push(priceData)
            } catch(e){
                console.warn('Fetch price error:', e)
            }
        }
        return returnData
    }

    historical = () => {
        let promises = []
        for (let units = TIME_UNITS; units > 0; units--) {
            promises.push(cc.priceHistorical(
                this.state.currentFavorite,
                ['USD'],
                moment().subtract({months: units}).toDate()
            ))
        }
        return Promise.all(promises)
    }

    confirmFavorites = () => {
        let currentFavorite = this.state.favorites[0]
        this.setState({
            firstVisit: false,
            page: 'dashboard',
            currentFavorite, 
            prices: null,
            historical: null
        }, () => {
            this.fetchPrices()
            this.fetchHistorical()
        })
        localStorage.setItem('cryptoSearch', JSON.stringify({
            favorites: this.state.favorites,
            currentFavorite
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
        let {favorites, currentFavorite} = cryptoSearchData
        return {favorites, currentFavorite}
    }

    setPage = page => this.setState({page})

    setFilteredCoins = filteredCoins => this.setState({filteredCoins})

    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym,
            historical: null
        }, this.fetchHistorical)

        localStorage.setItem('cryptoSearch', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoSearch')),
            currentFavorite: sym
        }))
    }

    render(){
        return(
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
