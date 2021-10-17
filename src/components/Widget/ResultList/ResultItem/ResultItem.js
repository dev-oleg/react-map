import React, {useContext} from 'react'
import {ListGroupItem} from 'reactstrap'
import {Context} from '../../../../context'

const ResultItem = props => {
    const {itemClickHandler} = useContext(Context)

    const cls = []

    if (props.active) {
        cls.push('active')
    }

    return (
        <ListGroupItem
            className = {cls.join('')}
            onClick = {() => itemClickHandler(props.id)}
        >
            {props.result.display_name}
        </ListGroupItem>
    )
}

export default ResultItem
