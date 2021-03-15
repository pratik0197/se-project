import React, { Component } from 'react'
import classes from './auth.module.css'
import {Formik} from 'formik'
import Axios from '../../api/axios'
import authenticationToken from '../../utils/authenticationToken'

class Auth extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            login: true
        }
    }
    
    changeLoginState = ()=>{
        const loginState = this.state.login

        this.setState({
            login: !loginState
        })
    }
    loginWithEmailAndPassword = async({email,password})=>{  
        try{
            let response = await Axios.post((this.state.login ? '/login' : '/signup'),{email,password})
            if(!this.state.login)
                response = await Axios.post('/login',{email,password})
            localStorage.setItem('authToken',response.data.token)

            console.log(authenticationToken())
            const userResponse = await Axios.get('/me')

            localStorage.setItem('isAdmin',userResponse.data.data.isAdmin)
        }catch(e){
            window.alert(`Could not ${this.state.login ? 'LOG IN' : 'SIGN UP'}`)
        }
    }
    render(){
        return <div className={classes.Auth}>
            <Formik
                initialValues = {{email:'',password:''}}
                validate = {
                    values => {
                        const errors = {}
                        if(!values.email)
                            errors.email = 'Required'
                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
                            errors.email = 'Invalid email id'
                        
                        if(!values.password)
                            errors.password = 'Required'
                        else if(!values.password.length)
                            errors.password = 'Password length should not be less than 6 characters'
                        return errors
                    }
                }
                onSubmit = {
                    (values,{setSubmitString}) =>{
                        this.loginWithEmailAndPassword({
                            email: values.email,
                            password: values.password
                        })
                    }
                }
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) =>
                    (
                        <form onSubmit={handleSubmit}>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email && errors.email}
                            <br/>
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && errors.password}
                            <button type="submit" disabled={isSubmitting}>
                                {this.state.login ? 'LOGIN' : 'SIGN UP'}
                            </button>
                            <p>{this.state.login ? 'New User?' : 'Already have an account?'}</p>
                            <button onClick={this.changeLoginState}>{this.state.login ? ' Sign up' : ' Login'}</button>
                        </form>
                    )
                }
            </Formik>
        </div>
    }
}

export default Auth