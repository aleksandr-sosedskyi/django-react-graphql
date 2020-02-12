import React from 'react';
import { getAllGoals } from "../../queries/queries";
import { useQuery } from "@apollo/react-hooks"
import  GoalItem  from "./GoalItem"

function AllGoals() {
    const {loading, error, data} = useQuery(getAllGoals);
    const styleGoalList = {display: 'flex', justifyContent: 'center', listStyle:'none'}
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    return( 
        <ul key='allUsers' style={styleGoalList}>
            {data.allGoals.map(goal => (
                <GoalItem key={goal.id} item={goal} />
            ))}
        </ul>
    );
}


export default AllGoals;