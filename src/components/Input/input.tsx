import React, { ReactElement, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize = "lg" | 'sm'
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    className?: string;
    // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FunctionComponent<InputProps> = (props) => {
    const { disabled, size, icon, prepend, append, className, ...restProps } = props
    const classes = classNames('input-wrapper', className, {
        'is-disabled': disabled,
        [`input-size-${size}`]: size,
        'input-group': prepend || append,
        'input-group-prepend': !!prepend,//前缀
        'input-group-append': !!append,//后缀
    })
    return (
        <div className={classes}>
            {icon && <div className="icon-wrapper"><Icon icon={icon} /></div>}
            {prepend && <div className="input-inner-group-prepend">{prepend}</div>}
            <input className="input-inner" disabled={disabled} {...restProps} />
            {append && <div className="input-inner-group-append">{append}</div>}
        </div>
    )
}
export default Input