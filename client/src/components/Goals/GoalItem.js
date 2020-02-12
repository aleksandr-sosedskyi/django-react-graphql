import React, { Component } from "react";
import { MDBCard, MDBCardText } from 'mdbreact'
import {Pie} from "react-chartjs-2"
import { useQuery } from "@apollo/react-hooks"
import { getCapital } from "../../queries/queries"

function GoalItem (props){
    const {loading, error, data} = useQuery(getCapital);
    if (loading) return 'Loading...';
    if (error) return `Error ${error.message}`;
    const state = {
        labels: ['Have', "Haven't"],
        datasets: [{
            data: [data.capital.keeper, props.item.price - data.capital.keeper],
            backgroundColor: ['#3bff45', '#e6e6e6']
        }]
    }
    const stylesOnCard = {width: '22rem', margin:'1rem'}    
    return(
        <li>
            <MDBCard style={stylesOnCard} className='p-4'>
                <h3 className='text-center'>{props.item.name}</h3>
                <MDBCardText>
                    <Pie
                        data={{
                            labels: state.labels,
                            datasets: state.datasets
                        }}
                        options={{ responsive: true }}
                    />
                </MDBCardText>
                    <h4 className='text-center'>{(data.capital.keeper * 100 / props.item.price).toFixed(3)} %</h4>
            </MDBCard>
        </li>
    )
}

export default GoalItem;