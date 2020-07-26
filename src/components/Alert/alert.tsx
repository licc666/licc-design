import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';

export type AlertType = 'default' | 'success' | 'danger' | 'warning'
interface BaseAlertProps {
    className?: string;
    type?: AlertType;
    description?: string;
    title?: string;
    closable?: boolean;
    onClose?: () => void;
}

const Alert: React.FunctionComponent<BaseAlertProps> = (props) => {
    const { className, type, description, title, closable, onClose, children } = props;

    const classes = classNames('alert', className, {
        [`alert-${type}`]: type
    })

    const domRef = useRef<HTMLDivElement>(null)
    const [show, setShow] = useState(true)

    function handleAlertClose() {
        setShow(false)
        if (onClose) {
            onClose();
        }
    }

    return (
        <Transition in={show} timeout={300} animation="zoom-in-right" >
            <div className={classes} ref={domRef}>
                {title && <span className='alert-title'>{title}</span>}
                {description && <p className='alert-desc'>{description}</p>}
                {children && <p className='alert-desc'>{children}</p>}
                {closable && <span className='alert-close' onClick={handleAlertClose}><Icon icon="times" /></span>}
            </div>
        </Transition>
    )
}

Alert.defaultProps = {
    type: 'default'
}

export default Alert