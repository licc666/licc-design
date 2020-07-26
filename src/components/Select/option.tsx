import React, { useContext } from 'react'
import classNames from 'classnames'
import { SelectContext } from './select'
import Icon from '../Icon/icon';

export interface OptionProps {
    index?: string;
    value: string;
    label?: string;
    disabled?: boolean;
}

const Option: React.FunctionComponent<OptionProps> = (props) => {

    const { value, label, disabled, index, children } = props;
    const context = useContext(SelectContext)
    const classes = classNames('select-item', {
        'is-disabled': disabled,
        'is-active': context.index === index
    })
    const handelClick = () => {
        if (context.onChange && !disabled && (typeof index === 'string')) {
            context.onChange(index, value, label)
        }
    }
    return (
        <li className={classes} onClick={handelClick} >
            {children || label || value}
            {context.index === index && <Icon icon="check" />}
        </li>
    )
}

Option.displayName = 'Option'
export default Option