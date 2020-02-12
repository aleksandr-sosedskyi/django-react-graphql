import React, { Fragment } from "react";
import AllGoals from "../../components/Goals/index"
import CashComponent from "../../components/Cash/index"
import ProductTable from "../../components/Product/ProductTable"

class HomePage extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <Fragment>
                <AllGoals />
                <CashComponent />
                <ProductTable />
            </Fragment>
        )
    }
}

export default HomePage;