import React, {useContext} from 'react'
import {ListGroupItem} from 'reactstrap'
import {Context} from '../../../../context'

type ResultItemProps = {
    active: boolean,
    id: number,
    name: string
}

const ResultItem: React.FC<ResultItemProps> = ({active, id, name}) => {
    const {itemClickHandler} = useContext(Context)
    
    return (
        <ListGroupItem
            className = {active ? 'active' : ''}
            onClick = {() => itemClickHandler(id)}
        >
            {name}
        </ListGroupItem>
    )
}

export default ResultItem
