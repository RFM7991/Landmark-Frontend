import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { getPopulation, getAge, getIncome, getSocial } from '../Requests/city-requests' 

class DemographicsPanel extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {}
    }

    componentDidMount() {
        
       // getPopulation(this.props.lat, this.props.lng, (data) => console.log('DEMOGRAPHICS', data)

        getSocial(this.props.lat, this.props.lng, (data) => {
            this.setState({social: data})
            console.log('Social', data)
        })
        getAge(this.props.lat, this.props.lng, (data) => {
            this.setState({age: data})
            console.log('Age', data)
        })
        getIncome(this.props.lat, this.props.lng, (data) => {
            this.setState({income : data})
            console.log('Income', data)
         })  
    }
    render() {
       
        var social_data =  {
            gender : {},
            race : {},
            education : {},
            marital_status : {},
            employment : {},
            transportation : {}
        }

        var income_data = {income : {} }
        var age_data = {age : {} }


        if (this.state.social != null) {
           social_data = this.state.social
        }
        if (this.state.income != null) {
            income_data = this.state.income
        }
        if (this.state.age != null) {
            age_data = this.state.age
        }

        const NestedCard = ({name, data, key_i}) => {
            return (
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={key_i}>
                        {name}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={key_i} >
                    <Card.Body>
                        <div style={{overflowX: "auto", overflowY: "auto", width: "100%"}}>
                        <Table striped bordered hover variant="dark" >
                        <tbody>
                            {Object.entries(data).map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{data[0]}</td><td>{data[1]}</td>
                                    </tr>
                                );
                                })}
                        </tbody>
                        </Table>
                        </div>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        }
        
        return (

           <div className={"demographics-list-vertical"}>
                   <br></br>
                 <p style={{textAlign: 'center'}} ><strong>Demographics</strong></p>
               <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    General
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0" >
                    <Card.Body>
                        <Table striped bordered hover variant="dark" >
                        <tbody>
                            <tr>
                            <td>Business</td><td>{this.props.business_type}</td>
                             </tr><tr>
                             <td>City</td><td>{ this.props.city}</td>
                             </tr><tr>
                             <td>Street</td><td>{this.props.street}</td>
                             </tr><tr>
                            <td>Population</td><td>{social_data.population}</td>
                                </tr><tr>
                            <td>Median Age</td><td>{social_data.median_age}</td>
                                </tr><tr>
                            <td>Males</td><td>{social_data.gender.males}</td>
                             </tr><tr>
                            <td>Females</td><td>{social_data.gender.females}</td>
                             </tr>
                        </tbody>
                        </Table>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    Social
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <Accordion defaultActiveKey="0">
                        <NestedCard name={"Race"} data={social_data.race} key_i={"0"}></NestedCard>
                        <NestedCard name={"Education"} data={social_data.education} key_i={"1"}></NestedCard>
                        <NestedCard name={"Employment"} data={social_data.employment} key_i={"2"}></NestedCard>
                        <NestedCard name={"Marital Status"} data={social_data.marital_status} key_i={"3"}></NestedCard>
                        <NestedCard name={"Transportation"} data={social_data.transportation} key_i={"4"}></NestedCard>
                        </Accordion>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <NestedCard name={"Income"} data={income_data.income} key_i={"0"}></NestedCard>
                <NestedCard name={"Age"} data={age_data.age} key_i={"0"}></NestedCard>
                </Accordion>
           </div>
        );
    }
}

export default DemographicsPanel;