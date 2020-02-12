import React, { useState } from "react";
import { useQuery , useMutation} from "@apollo/react-hooks"
import { graphql } from "graphql-tag"
import flowright  from "lodash"
import { capitalUpdate, getCapital } from "../../queries/queries"
import CapitalForm from "../Forms/CapitalForm"
import CapitalInfo from "./CapitalInfo"

const CapitalItem = (props) => {
    const [a, setA] = useState(false);
    const [updateCapitalHook, {data}] = useMutation(capitalUpdate);
    const handleSetA = () => {
        setA(!a);
    }

    const handleUpdateCapital = async (values, resetForm) => {
        const response = await updateCapitalHook({
            variables: {
                keeperPlus: parseInt(values.keeperPlus),
                cashPlus: 0
            },
            refetchQueries: [
                {query: getCapital}
            ]
        })
        resetForm();
        handleSetA();
    }
    return (
        <li>
            <CapitalInfo />
            <CapitalForm  submitForm={handleUpdateCapital} />
        </li>
    )
}

export default CapitalItem;
