import React, {useContext} from 'react'
import './Widget.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, FormGroup, Input, Label, FormFeedback, Button, ButtonGroup} from 'reactstrap'
import Empty from './Empty/Empty'
import Loader from './Loader/Loader'
import ResultList from './ResultList/ResultList'
import {Context} from '../../context'

const Widget = () => {
    const {
        inputText,
        showErrorMessage,
        loading,
        inputHandler,
        searchHandler,
        clearHandler,
        submitHandler
    } = useContext(Context)

    return (
        <div className = 'Widget'>
            <Form onSubmit = {submitHandler}>
                <FormGroup>
                    <Label for = 'searchInput'>Поиск</Label>

                    <Input
                        id = 'searchInput'
                        value = {inputText}
                        onChange = {inputHandler}
                        invalid = {showErrorMessage}
                    />

                    {
                        showErrorMessage ?
                            <FormFeedback>Поле не должно быть пустым</FormFeedback> :
                            <Empty />
                    }
                </FormGroup>

                <ButtonGroup>
                    <Button
                        color = 'primary'
                        outline = {true}
                        size = 'lg'
                        onClick = {searchHandler}
                    >
                        Поиск
                    </Button>

                    <Button
                        color = 'secondary'                            
                        outline = {true}
                        size = 'lg'
                        onClick = {clearHandler}
                    >
                        Очистить
                    </Button>
                </ButtonGroup>
            </Form>

            <p>Результаты</p>

            {loading ? <Loader /> : <ResultList />}
        </div>
    )
}

export default Widget
