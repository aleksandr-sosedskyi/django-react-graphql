import React, { useState } from "react"
import { Query } from "react-apollo"
import { useMutation } from "@apollo/react-hooks"
import ReactTable from "react-table"
import { getAllProducts, getProductDistinct, productCreate } from "../../queries/queries"
import "react-table/react-table.css"
import ProductForm from "../Forms/ProductForm"

const ProductTable = (props) => {
    const [a, setA] = useState(false);
    const [addProduct, {data}] = useMutation(productCreate);

    const columnsAll = [
        {
            Header: "Последние расходы",
            columns: [
                {
                    Header: "Товар",
                    accessor: 'name'
                },
                {
                    Header: 'Цена',
                    accessor: 'price'
                },
                {
                    Header: 'Дата',
                    accessor: 'createdAt'
                }
            ]
        }
    ]

    const columnsDistinct = [
        {
            Header: "Сумма расходов по товарам",
            columns: [
                {
                    Header: "Товар",
                    accessor: 'name'
                },
                {
                    Header: "Сума",
                    accessor: 'price'
                }
            ]
        }
    ]

    const handleSubmitForm = async (values) => {
        await addProduct({
            variables:{
                name: values.productName,
                price: parseFloat(values.productPrice)
            },
            refetchQueries: [
                {
                    query: getAllProducts
                },
                {
                    query: getProductDistinct
                }
            ]
        })
        setA(!a);
    }

    return (
        <>
            <ProductForm submitForm={handleSubmitForm} />
            <div style={{display: "flex"}}>
                <Query query={getAllProducts}>
                    {({loading, error, data}) => {
                        if (loading) return 'Loading...'
                        if (error) return `Error ${error}`
                        const objects = data.allProducts
                        return (
                                <ReactTable 
                                    columns={columnsAll}
                                    data={objects}
                                    className="-striped -highlight table"
                                />
                        )
                    }}
                </Query>  
                <Query query={getProductDistinct}>
                    {({loading, error, data}) => {
                        if (loading) return 'Loading...'
                        if (error) return `Error ${error}`
                        const objects = data.productDistinct
                        return (
                                <ReactTable 
                                    columns={columnsDistinct}
                                    data={objects}
                                    className="-striped -highlight table"
                                />
                        )
                    }}
                </Query>  
            </div>    
        </>
    )
}

export default ProductTable;