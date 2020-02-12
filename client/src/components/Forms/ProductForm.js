import React from "react"
import { Formik, Form, Field } from "formik"
import { Button } from "@material-ui/core"
import IosAddCircleOutline from "react-ionicons/lib/IosAddCircleOutline"

const ProductForm = (props) => {
    return (
        <Formik
            initialValues={{
                productName: '',
                price: ''
            }}
            onSubmit={props.submitForm}
        >
            {() => (
                <Form>
                    <h3 className='text-center mt-5'>Расходы</h3>
                    <div className='mx-auto mb-3' style={{display: "flex", justifyContent:"center"}}>
                        <Field
                            name='productName'
                            type='text'
                            placeholder='Название'
                        />
                        <Field 
                            name='productPrice'
                            type='text'
                            placeholder='Цена'

                        />
                        <Button type='submit' >
                            <IosAddCircleOutline
                                fontSize='30px'
                                color='primary'
                            />
                        </Button>
                    </div>
                </Form>
            )}
            
        </Formik>
    )
}

export default ProductForm;