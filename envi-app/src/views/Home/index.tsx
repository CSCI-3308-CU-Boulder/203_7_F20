import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div id="home" className="container">
            <h1>Home Page</h1>
            <Link to="/user">User Page</Link>
        </div>
    )
}

export default Home
