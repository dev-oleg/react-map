import React, { useContext } from 'react'
import './ResultList.css'
import { ListGroup } from 'reactstrap'
import ResultItem from './ResultItem/ResultItem'
import { Context } from '../../../context'
import { TResults, TResultArray, IResult } from '../../../redux/types'

const ResultList: React.FC = () => {
    const {results, activeElement} = useContext(Context)

    const resultsData: TResults = results ? results instanceof IResult ? [results] : results : null
    
    return (
        <div className = 'ResultList'>
            <ListGroup>
                {
                    resultsData ?
                    resultsData.map((item: IResult, index: number) => {
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
