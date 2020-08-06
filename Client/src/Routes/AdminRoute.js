import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie'

export default function AdminRoute({ component: C, appProps, ...rest }) {
    const cookies = new Cookies()
    return (
        <Route
            {...rest}
            render={props =>
                cookies.get('role') === 'admin' &&
                sessionStorage.getItem('token') !== null ? (
                    <C {...props} {...appProps} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    )
}
