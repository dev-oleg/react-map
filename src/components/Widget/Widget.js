import React from 'react'
import './Widget.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, FormGroup, Input, Label, FormFeedback, Button, ButtonGroup} from 'reactstrap'
import Empty from './Empty/Empty'
import Loader from './Loader/Loader'
import ResultList from './ResultList/ResultList'

const Widget = props => {
    return (
        <div className = 'Widget'>
            <Form onSubmit = {props.onSubmit}>
                <FormGroup>
                    <Label for = 'searchInput'>Поиск</Label>

                    <Input
                        id = 'searchInput'
                        value = {props.inputText}
                        onChange = {props.onChange}
                        invalid = {props.showErrorMessage}
                    />

                    {
                        props.showErrorMessage ?
                            <FormFeedback>Поле не должно быть пустым</FormFeedback> :
                            <Empty />
                    }
                </FormGroup>

                <ButtonGroup>
                    <Button
                        color = 'primary'
                        outline = {true}
                        size = 'lg'
                        onClick = {props.onSearch}
                    >
                        Поиск
                    </Button>

                    <Button
                        color = 'secondary'                            
                        outline = {true}
                        size = 'lg'
                        onClick = {props.onClear}
                    >
                        Очистить
                    </Button>
                </ButtonGroup>
            </Form>

            <p>Результаты</p>

            {
                props.loading ?
                    <Loader /> :
                    <ResultList
                        results = {props.results}
                        activeElement = {props.activeElement}
                        onItemClick = {props.onItemClick}
                    />
            }
        </div>
    )
}

export default Widget
