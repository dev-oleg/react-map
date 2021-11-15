import React, {useContext} from 'react'
import './ResultList.css'
import {ListGroup} from 'reactstrap'
import ResultItem from './ResultItem/ResultItemTS'
import {Context} from '../../../context'

const ResultList = () => {
    const {results, activeElement} = useContext(Context)

    return (
        <div className = 'ResultList'>
            <ListGroup>
                {
                    results ? 
                        results.map((item, index) => {
                            return (
                                <ResultItem
                                    key = {index}
                                    name = {item.name}
                                    id = {index}
                                    active = {activeElement === index}
                                />
                            )
                        }) : ''
                }
            </ListGroup>
        </div>
    )
}

export default ResultList
