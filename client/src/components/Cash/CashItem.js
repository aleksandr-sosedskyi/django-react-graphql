import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks"
import { capitalUpdate, getCapital } from "../../queries/queries"
import CashForm from "../Forms/CashForm"
import CashInfo from "./CashInfo"

function CashItem (props) {
    const [a, setA] = useState(false);
    const [updateCash, {data}] = useMutation(capitalUpdate);

    const handleUpdateCash = async (values) => {
        await updateCash({
            variables:{
                keeperPlus: 0,
                cashPlus: parseFloat(values.cashPlus)
            },
            refetchQueries: [
                {
                    query: getCapital
                }
            ]
        })
        setA(!a);
    }
    return (
        <li>
            <CashInfo />
            <CashForm submitForm={handleUpdateCash} />
        </li>
    );
}

export default CashItem;