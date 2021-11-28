import React from 'react'
import { Spinner } from 'reactstrap'

const Loader: React.FC = () => {
    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '483px'
    }

    const spinnerStyle = {
        width: '100px',
        height: '100px'
    }

    return (
        <div style = {divStyle}>
            <Spinner color = 'primary' style = {spinnerStyle}/>
        </div>
    )
}

export default Loader
