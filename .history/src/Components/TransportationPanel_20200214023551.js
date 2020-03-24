import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'
import SubwayIcon from '../images/subway.png'
import nySubwayMap from '../images/subway_map.jpg'
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";
import ReactImageMagnify from 'react-image-magnify';

const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class TransportationPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
    }

    render() {
        let header =  <thead>
            <tr>
                <th>
                    <div style={{display: 'inline-block'}}>
                        <img src={SubwayIcon} width={50} height={50}/>
                    </div>
                </th>
                <th>Subway</th>
                <th>Lines</th>
                <th>Yearly Foot Traffic-In</th>
                <th>Yearly Foot Traffic-Out</th>
            </tr>
        </thead>
        return (
            <div style={{flexDirection: 'column', alignItems: 'flex-start', padding: '1.5em', width: '100%', backgroundColor: lightBg}}>
                <h1 style={{color: 'whitesmoke', }}>Transportation</h1>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                {this.props.transportation.subways != undefined &&
                <div style={{ backgroundColor: 'green', display: 'flex', flexDirection:'column',justifyContent: 'center'}}>
              
                    <ReactImageMagnify {...{
                        largeImage: {
                            src: nySubwayMap,
                            width: 2000,
                            height: 2500
                        }, 
                        smallImage: {
                            src: nySubwayMap,
                            width: 400,
                            height: 500

                        },
                        
                    }} //2700 × 3314
                    enlargedImageContainerStyle={{ zIndex: 1000, width: 2000, height: 2500}}
                    enlargedImagePosition='beside'
                     />
                       <a  style={{ backgroundColor: 'red', marginRight: 'auto', marginLeft: 'auto', width: 100, height: 20}} href="https://upload.wikimedia.org/wikipedia/commons/3/3a/Official_New_York_City_Subway_Map_vc.jpg" target="_blank" >See full size</a>
                     </div>
                }
                <ReactTableContainer  height={this.state.tableHeight} width='70%' customHeader={[header]}>
                    <Table striped hover variant="dark">
                        {header}
                        <tbody>
                            <SubwaysRows transportation={this.props.transportation}/>
                        </tbody>
                    </Table>
                </ReactTableContainer>
                
                </div>
            </div>    
       )
    }
 }
 const SubwaysRows = (props) => {
    if (props.transportation.subways == undefined || props.transportation.subways.length == 0)
        return<></>;
    return (
       Array.from(props.transportation.subways.entries()).map(([name, data],i) => {
           if (i > 3) return;
            return (
                <tr key={(i)}>
                    <td>{(i+1)}</td>
                    <td>{name}</td>
                    <td>{data.G_LINES}</td>
                    <td>{formatCommas(data.G_TOTAL_ENT)}</td>
                    <td>{formatCommas(data.G_TOTAL_EXITS)}</td>
                  
                </tr>
            )
        }) 
    )
    /**
     *   <td>{e.directions.distance.text}</td>
                    <td>{e.directions.duration.text}</td>
     */
}

 
 const mapStateToProps = createSelector(
     selectors.transportationSelector,
    (transportation) => ({
        transportation, 
    })
 )

 const formatCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
}

 export default connect(mapStateToProps)(TransportationPanel)