import React from "react";
import {Formik, Form, Field} from "formik";
import { Input } from "reactstrap";
import IosAddCircleOutline from "react-ionicons/lib/IosAddCircleOutline"
import { Button } from "@material-ui/core"

const CashForm = (props) => {
    return (
        <Formik
            initialValues={{
                cashPlus: ""
            }}
            onSubmit={props.submitForm}
        >
            {() => (
                <Form>
                    <div className="capitalForms">
                        <Field
                            name="cashPlus"
                            type="text"
                        />
                        <Button type='submit'>
                            <IosAddCircleOutline
                                fontSize="30px"
                                color='primary'
                            />
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default CashForm;