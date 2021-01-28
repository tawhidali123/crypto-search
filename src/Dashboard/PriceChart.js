import React from 'react'
import highChartsConfig from './HighchartsConfig'
import {Tile} from '../Shared/Tile'
import {AppContext} from '../AppProvider'
import ReactHighCharts from 'react-highcharts'
import HighchartsTheme from './HighchartsTheme'

ReactHighCharts.Highcharts.setOptions(HighchartsTheme())

export default function PriceChart() {
    return (
        <AppContext.Consumer>
            {
                ({historical}) => (
                    <Tile>
                        {historical ? 
                            <ReactHighCharts config={highChartsConfig(historical)} /> : 
                            <div>Loading History ...</div>
                        }
                    </Tile>
                )
            }
            
        </AppContext.Consumer>
    )
}
