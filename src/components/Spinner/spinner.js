import React from 'react'
import classes from './spinner.module.css'

const Spinner = (props)=> (
    <div className={classes.loader}>
        {props.text}...
    </div>
)

export default Spinner