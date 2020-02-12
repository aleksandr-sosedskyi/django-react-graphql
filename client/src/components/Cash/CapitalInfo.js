import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { getCapital, getAllGoals } from "../../queries/queries"
import { Query } from "react-apollo"

const CapitalInfo = (props) => {
    return (
        <Query query={getCapital}>
            {({loading, error, data}) => {
                if (loading) return 'Loading...'
                if (error) return `Error ${error}`
                return (
                    <div>
                        <h1 className="text-center">Капитал</h1>
                        <ul style={{fontSize: "1.25rem"}}>
                            <li>{data.capital.keeper} грн</li>
                            <li>{(data.capital.keeper / 25).toFixed(2)} $</li>
                            <li>{(data.capital.keeper / 27).toFixed(2)} EUR</li>
                        </ul>
                    </div>
                )
            }
            }
        </Query>
    )
}

export default CapitalInfo;