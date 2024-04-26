import * as React from 'react'
import Header from '../components/Header'
import Login from './Login'
import Signup from './Signup'
import {useSelector} from 'react-redux'

export default function Home () {
    const { showLogin, showSignup } = useSelector(
        (state) => state.renderLoginSignup
      )
    return (
        <>
            <Header/>
            {showLogin && <Login/>}
            {showSignup && <Signup/>}
        </>
    )
}