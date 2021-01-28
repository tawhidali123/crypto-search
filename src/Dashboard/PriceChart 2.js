import React from 'react'
import highChartsConfig from './HighchartsConfig'
import {Tile} from '../Shared/Tile'
import {AppContext} from '../AppProvider'
import ReactHighCharts from 'react-highcharts'
import HighchartsTheme from './HighchartsTheme'
import ChartSelect from './ChartSelect'

ReactHighCharts.Highcharts.setOptions(HighchartsTheme())

export default function PriceChart() {
    return (
        <AppContext.Consumer>
            {
                ({historical, changeChartSelect}) => (
                    <Tile>
                        <ChartSelect
                            defaultValue='months'
                            onChange={e => changeChartSelect(e.target.value)}
                        >
                            <option value='days'>Days</option>
                            <option value='weeks'>Weeks</option>
                            <option value='months'>Months</option>
                        </ChartSelect>
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
