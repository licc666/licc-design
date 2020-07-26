import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'


export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

type IconProps = FontAwesomeIconProps & {
    theme?: ThemeProps;
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
    // icon-primary
    const { className, theme, ...restProps } = props
    const classes = classNames('licc-icon', className, {
        [`icon-${theme}`]: theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}
export default Icon