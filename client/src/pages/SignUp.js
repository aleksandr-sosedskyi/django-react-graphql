import React from "react"
import {Formik, Form, Field} from "formik"
import {useMutation} from "@apollo/react-hooks"
import { Button } from "@material-ui/core"
import { signUp } from "../queries/queries"

const SignUp = (props) => {
    const [a, setA] = useState(false);
    const [signUp, {data}] = useMutation(signUp);

    const handleSubmitForm = (values,) => {
        signUp({
            variables:{
                username: values.username,
                password1: values.password1,
                password2: values.password2,
                email: values.email,
                phone: values.phone,
            }
        })
    }

    return (
        <Formik
            initialValues={{
                username='',
                password1='',
                password2='',
                email='',
                phone=''
            }}
            submitForm={handleSubmitForm}
        >
            {() => {
                <Form>
                    <Field
                        name='username'
                        type='text'
                    />
                    <Field
                        name='password1'
                        type='password'
                    />
                    <Field
                        name='password2'
                        type='password'
                    />
                    <Field
                        name='email'
                        type='email'
                    />
                    <Field
                        name='phone'
                        type='text'
                    />
                    <Button type='submit'>SignUp</Button>
                </Form>
            }}
        </Formik>
    )
}

export default SignUp;