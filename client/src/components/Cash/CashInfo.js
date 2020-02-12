import React from "react"
import { Query } from "react-apollo"
import { getCapital } from "../../queries/queries"

const CashInfo = (props) => {
    return (
        <Query query={getCapital}>
            {({loading, error, data}) => {
                if (loading) return 'Loading'
                if (error) return `Erorr: ${error}`
                return (
                    <>
                        <h1 className="text-center">Прожиточные</h1>
                        <ul style={{fontSize: "1.25rem"}}>
                            <li>{data.capital.cash} грн</li>
                            <li>{(data.capital.cash / 25).toFixed(2)} $</li>
                            <li>{(data.capital.cash / 27).toFixed(2)} EUR</li>
                        </ul>
                    </>
                );
            }}
        </Query>
    )
}

export default CashInfo;