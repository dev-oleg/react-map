import React, {useContext} from 'react'
import {ListGroupItem} from 'reactstrap'
import {Context} from '../../../../context'

const ResultItem = ({active, id, result: {name}}) => {
    const {itemClickHandler} = useContext(Context)

    const cls = []

    if (active) {
        cls.push('active')
    }

    return (
        <ListGroupItem
            className = {cls.join('')}
            onClick = {() => itemClickHandler(id)}
        >
            {name}
        </ListGroupItem>
    )
}

export default ResultItem
