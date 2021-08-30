import React from 'react'
import './ResultList.css'
import {ListGroup} from 'reactstrap'
import ResultItem from './ResultItem/ResultItem'

const ResultList = props => {
    return (
        <div className = 'ResultList'>
            <ListGroup>
                {
                    props.results ? 
                        props.results.map((item, index) => {
                            return (
                                <ResultItem
                                    key = {index}
                                    result = {item}
                                    id = {index}
                                    active = {props.activeElement === index}
                                    onItemClick = {props.onItemClick}
                                />
                            )
                        }) : ''
                }
            </ListGroup>
        </div>
    )
}

export default ResultList
