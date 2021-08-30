import React from 'react'
import {ListGroupItem} from 'reactstrap'

const ResultItem = props => {
    const cls = []

    if (props.active) {
        cls.push('active')
    }

    return (
        <ListGroupItem
            className = {cls.join('')}
            onClick = {() => props.onItemClick(props.id)}
        >
            {props.result.display_name}
        </ListGroupItem>
    )
}

export default ResultItem
