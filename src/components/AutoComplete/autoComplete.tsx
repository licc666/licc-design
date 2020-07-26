import React, { useState, ChangeEvent, useEffect, KeyboardEvent, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => React.ReactElement
}

const AutoComplete: React.FunctionComponent<AutoCompleteProps> = (props) => {
    const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;
    const [inputValue, setInputValue] = useState(value as string || '')
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState(false)
    const [hightLightIndex, setHightLightIndex] = useState(-1)

    const useDebounceValue = useDebounce(inputValue, 500)

    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)

    useClickOutside(componentRef, () => { setSuggestions([]) })

    //useDebounceValue 改变触发事件
    useEffect(() => {
        if (useDebounceValue && triggerSearch.current) {
            const results = fetchSuggestions(useDebounceValue)
            if (results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    setSuggestions(data)
                    setLoading(false)
                })
            } else {
                setSuggestions(results)
            }
            setSuggestions(results as DataSourceType[])
        } else {
            setSuggestions([])
        }
        setHightLightIndex(-1)
    }, [useDebounceValue, fetchSuggestions])

    const classes = classNames('auto-complete')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestions([])
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }

    const hightLight = (index: number) => {
        if (index < 0) index = 0
        if (index >= suggestions.length) index = suggestions.length - 1
        setHightLightIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                //enter
                if (suggestions[hightLightIndex]) handleSelect(suggestions[hightLightIndex])
                break
            case 38:
                //向上
                hightLight(hightLightIndex - 1)
                break
            case 40:
                //向下
                hightLight(hightLightIndex + 1)
                break
            case 27:
                //esc
                setSuggestions([])
                break
            default:
                break
        }
    }



    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item
    }
    const generateDropdown = () => {
        return (
            <ul>
                {
                    suggestions.map((item, index) => {
                        const classes = classNames('suggestion-item', {
                            'item-hightlight': index === hightLightIndex
                        })
                        return (
                            <li className={classes} onClick={() => handleSelect(item)} key={index}>{renderTemplate(item)}</li>
                        )
                    })
                }
            </ul>
        )
    }
    return (
        <div className={classes} ref={componentRef} >
            <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />
            {loading && <Icon icon="spinner" spin />}
            {(suggestions.length > 0) && generateDropdown()}
        </div>
    )
}
export default AutoComplete