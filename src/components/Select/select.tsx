import React, { useState, useRef, createContext } from 'react'
import classNames from 'classnames'
import Input from '../Input/input';
import Transition from '../Transition/transition';
import useClickOutside from '../../hooks/useClickOutside';
import { OptionProps } from './option';

export interface SelectProps {
    defaultValue?: string | string[];
    placeholder?: string;
    disabled?: boolean;
    //是否支持多选
    multiple?: boolean;
    //select input 的 name 属性
    name?: string;
    //选中值发生变化时触发
    onChange?: (selectedValue: string, selectedValues: string[]) => void;
    //下拉框出现/隐藏时触发
    onVisibleChange?: (visible: boolean) => void;
    className?: string;
}

export interface OptionContext {
    index?: string;
    onChange?: (selectIndex: string, selectValue: string, selectLabel?: string) => void
}

export const SelectContext = createContext<OptionContext>({ index: "0" })

const Select: React.FunctionComponent<SelectProps> = (props) => {
    const { placeholder, defaultValue, disabled, multiple, name, className, onChange, children } = props;
    const [dropDownVisible, setDropDownVisible] = useState(false)
    const [inputValue, setInputValue] = useState(defaultValue)
    const componentRef = useRef<HTMLDivElement>(null)

    const classes = classNames('select', className, name, {
        'is-disabled': disabled,
        'is-multiple': multiple,
        'is-open': dropDownVisible
    })
    const classesForDropdown = classNames('select-dropdown')

    const handleClick = () => {
        setDropDownVisible(!dropDownVisible)
    }

    useClickOutside(componentRef, () => setDropDownVisible(false))

    const [activeIndex, setActiveIndex] = useState('-1')

    const optionHandle = (selectIndex: string, selectValue: string, selectLabel?: string) => {
        setActiveIndex(selectIndex)
        if (selectLabel) {
            setInputValue(selectLabel)
        }else{
            setInputValue(selectValue)
        }
        setDropDownVisible(!dropDownVisible)
        if (onChange) {
            onChange(selectValue, [selectValue])
        }
    }
    const optionsContext: OptionContext = {
        index: activeIndex,
        onChange: optionHandle
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<OptionProps>
            const { displayName } = childElement.type
            if (displayName === "Option") {
                return React.cloneElement(childElement, { index: index.toString() })
            } else {
                console.error('error: Select has a child which is not Option component');
            }
        })
    }

    return (
        <div className={classes} ref={componentRef}>
            <Input icon="angle-down" value={inputValue} disabled={disabled} readOnly placeholder={placeholder} onClick={handleClick} />
            <Transition in={dropDownVisible} timeout={300} animation="zoom-in-top">
                <ul className={classesForDropdown}>
                    <SelectContext.Provider value={optionsContext}>
                        {renderChildren()}
                    </SelectContext.Provider>
                </ul>
            </Transition>
        </div>
    )
}

Select.defaultProps = {
    placeholder: '请选择',
    defaultValue: ''
}

export default Select