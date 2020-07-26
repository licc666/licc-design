import React, { useContext } from 'react'
import classNames from 'classnames'
import { TabsContext } from './tabs'

export interface TabsItemProps {
    index?: string;
    label: any;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: any
}

const TabsItem: React.FunctionComponent<TabsItemProps> = (props) => {
    const { label, disabled, className, index, style } = props
    const context = useContext(TabsContext)
    const classes = classNames('tabs-nav-item', className, {
        'is-active': context.index === index,
        'is-disabled': disabled
    })
    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {label}
        </li>
    )
}
TabsItem.displayName = 'TabsItem'
export default TabsItem