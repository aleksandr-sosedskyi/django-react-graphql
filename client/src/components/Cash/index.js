import React, {Fragment} from "react"
import CapitalItem from "./CapitalItem"
import CashItem from "./CashItem"

const CashComponent = (props) => {
    const stylesOnCash = {
        display: "flex",
        justifyContent: "space-around",
        listStyle: "none"
    }
    
    return (
        <ul style={stylesOnCash}>
            <CapitalItem />
            <CashItem />
        </ul>
    );
    
}

export default CashComponent;