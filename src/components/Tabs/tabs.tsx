import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { TabsItemProps } from './tabsItem'

type MenuMode = 'line' | 'card'
type SelectCallback = (selectIndex: string) => void
export interface TabsProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}

interface ITabsContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
}

export const TabsContext = createContext<ITabsContext>({ index: "0" })

const Tabs: React.FunctionComponent<TabsProps> = (props) => {
    const { className, mode, children, defaultIndex, onSelect } = props
    const classes = classNames('tabs', className)
    const navClasses = classNames('tabs-nav', {
        [`tabs-${mode}`]: mode
    })
    const [currentActive, setActive] = useState(defaultIndex)

    const handelClick = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const tabsContext: ITabsContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handelClick,
        mode
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabsItemProps>
            const { displayName } = childElement.type
            if (displayName === 'TabsItem') {
                return React.cloneElement(childElement, { index: index.toString() })
            } else {
                console.error('error: Menu has a child which is not TabsItem component');
            }
        })
    }

    const renderChildrenContent = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabsItemProps>
            const { props: { children } } = childElement
            if (currentActive === index.toString()) {
                return children
            }
        })
    }

    return (
        <div className={classes}>
            <TabsContext.Provider value={tabsContext}>
                <ul className={navClasses}>
                    {renderChildren()}
                </ul>
                <div className="tabs-content">
                    {renderChildrenContent()}
                </div>
            </TabsContext.Provider>
        </div>
    )
}

Tabs.defaultProps = {
    mode: 'line',
    defaultIndex: '0'
}

export default Tabs