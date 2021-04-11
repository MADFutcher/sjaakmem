import React from 'react';
import { Route, Redirect } from 'react-router-dom';



const ProtectedRoute  = ({component: Component , ...rest}) => {
  console.log(localStorage)
    return (
      <Route
        {...rest}
        render={ props  => {
            if (localStorage.user){
              return <Component {...props} user={localStorage.user} gezin={localStorage.gezin}/>
            } else {
              return <Redirect to={{pathname: '/', state: {from: props.location}}} />
            }
          }
        }
      />
    )
}
export default ProtectedRoute;