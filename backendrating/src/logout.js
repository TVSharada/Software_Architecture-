import React, { Component, useState } from 'react';
import { Link, Redirect  } from 'react-router-dom';


export default class LoginUsersForm extends Component{
}

render (){
    return (
        <div>
            <P>{JSON.stringify(json)} </P>
            <button onClick = {() => {
                localStorage.clear();
                props.history.push('/'); 
            }}
            className = "btn btn-primary">Logout</button>
        </div>
    )
}


