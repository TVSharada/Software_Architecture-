import React from "react";
import { Route } from "react-router-dom";




const ProtectedRouter = ({component,...rest}) => {

    let RenderComponents =  component;
    let hasToken = JSON.parse(localStorage.getItem('auth'));
    console.log(hasToken);
    
    Return (
        <Route 
            {...rest}
            render = {props => {
                    return hasToken !== null ? (
                    <RenderComponents {...props} />
                    ) : (
                        <Redirect 
                        to = {{
                            pathname: '/mobiles' 
                        }}
                        /> 
                    )
                }
            }
        />
    )
}

export default ProtectedRouter;

