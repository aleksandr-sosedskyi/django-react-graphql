import React, { setState } from "react";
import {useQuery, useMutation} from "@apollo/react-hooks"
import { capitalUpdate } from "../../queries/queries"
import {Formik, Form, Field} from "formik";
import IosAddCircleOutline from "react-ionicons/lib/IosAddCircleOutline"
import _ from "lodash"
import { Button } from "@material-ui/core"
import { graphql } from "react-apollo"

const CapitalForm = props => {
    return (
    <Formik
        initialValues={{
            keeperPlus: '',
        }}
        onSubmit={values => (props.submitForm(values))}
        >
        {() => (
                    <Form>
                <div className='capitalForms'>
                        <Field
                            name="keeperPlus"
                            type='text'
                        />
                        <Button type='submit' variant='outlined' color='primary'>
                            <IosAddCircleOutline
                                fontSize="30px"
                                color='primary'
                            />
                        </Button>
                        </div>

                    </Form>
        )}
    </Formik>
    );
};

export default CapitalForm;