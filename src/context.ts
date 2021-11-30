import React from 'react'
import { TResults } from './redux/types'

interface IContext {
    inputText: string,
    showErrorMessage: boolean,
    loading: boolean,
    results: TResults,
    activeElement: number | null,

    inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    searchHandler: (event: React.MouseEvent) => void,
    clearHandler: (event: React.MouseEvent) => void,
    submitHandler: (event: React.FormEvent) => void,
    itemClickHandler: (id: number) => void
}

const defaultValue: IContext = {
    inputText: '',
    showErrorMessage: false,
    loading: false,
    results: null,
    activeElement: null,

    inputHandler: () => {},
    searchHandler: () => {},
    clearHandler: () => {},
    submitHandler: () => {},
    itemClickHandler: () => {}
}

export const Context = React.createContext<IContext>(defaultValue)