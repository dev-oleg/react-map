import React, { useContext } from 'react'
import './ResultList.css'
import { ListGroup } from 'reactstrap'
import ResultItem from './ResultItem/ResultItem'
import { Context } from '../../../context'
import { IResult } from '../../../redux/types'

const ResultList: React.FC = () => {
    const {results, activeElement} = useContext(Context)

    return (
        <div className = 'ResultList'>
            <ListGroup>
                {
                    results ? 
                        results.map((item: IResult, index: number) => {
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
