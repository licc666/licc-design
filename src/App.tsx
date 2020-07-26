import React from 'react';
import './styles/index.scss';
import Button from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tabs/tabs';
import TabsItem from './components/Tabs/tabsItem';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Icon from './components/Icon/icon'
import Input from './components/Input/input';
import AutoComplete from './components/AutoComplete/autoComplete';
import { DataSourceType } from './components/AutoComplete/autoComplete'
import Select from './components/Select/select';
import Option from './components/Select/option';
library.add(fas)

function inputOnChange(e: any) {
  const { currentTarget: { value } } = e
  console.log(value);
}

interface autoCompleteListProps {
  age: string | number;
  html_url: string;
}
const AutoCompleteList = [
  { value: 'aaa', age: '11' },
  { value: 'babb', age: '12' },
  { value: 'cacc', age: '13' },
  { value: 'dadd', age: '14' },
  { value: 'eee', age: '15' }
]
// function handelFetch(query: string) {
//   return AutoCompleteList.filter(item => item.includes(query))
// }

function handelFetch(query: string) {
  return AutoCompleteList.filter(item => item.value.includes(query))
}

// function handelFetch(query: string) {
//   return fetch(`https://api.github.com/search/users?q=${query}`)
//     .then(res => res.json())
//     .then(({ items }) => {
//       console.log(items);
//       const formatItems = items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
//       return formatItems
//     })
// }

function handelSelect(value: DataSourceType) {
  console.log(value);
}

function renderOption(item: DataSourceType) {
  const _item = item as DataSourceType<autoCompleteListProps>
  return (
    <div>
      <h2>name:{_item.value}</h2>
      {/* <a href={_item.html_url}> url:{_item.html_url}</a> */}
    </div>
  )
}

function selectOnChange(value: string, arrValue: string[]) {
  console.log('arrValue: ', arrValue);
  console.log('value: ', value);

}

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ padding: 20 }} >
        <div className="button">
          <h1>Button</h1>
          <Button autoFocus>Hello</Button>
          <Button disabled>Hello</Button>
          <Button btnType="danger">Hello</Button>
          <Button btnType="primary" size="lg">Hello</Button>
          <Button btnType="link" href="baidu.com">百度</Button>
          <Button btnType="link" href="baidu.com" disabled>disabled 百度</Button>
        </div>
        <div className="Alert">
          <h1>Alert</h1>
          <Alert type='success' description="This is Success Alert" />
          {/* <Alert type={AlertType.Danger} description="This is Danger Alert" />
        <Alert type={AlertType.Default} description="This is Default Alert" />
        <Alert type={AlertType.Warning} description="This is Warning Alert" />
        <Alert>children</Alert> */}
          <Alert closable onClose={() => console.log('关闭')} title="This is Alert title!" description="This is Warning Alert" />
        </div>
        <div className="Menu"><h1>Menu</h1>
          <Menu mode="vertical">
            <MenuItem>menu 1</MenuItem>
            <MenuItem disabled>menu 2</MenuItem>
            <MenuItem>menu 3</MenuItem>
            <SubMenu title="DropDown">
              <MenuItem>menu 3-1</MenuItem>
              <MenuItem>menu 3-2</MenuItem>
              <MenuItem>menu 3-3</MenuItem>
            </SubMenu>
          </Menu>
          {/* <Menu mode="vertical" defaultOpenSubMenus={['3']} onSelect={(index) => console.log(index)}>
          <MenuItem>menu 1</MenuItem>
          <MenuItem disabled>menu 2</MenuItem>
          <MenuItem>menu 3</MenuItem>
          <SubMenu title="DropDown">
            <MenuItem>menu 3-1</MenuItem>
            <MenuItem>menu 3-2</MenuItem>
            <MenuItem>menu 3-3</MenuItem>
          </SubMenu>
        </Menu> */}</div>
        <div className="tabs">
          <h1>Tabs</h1>
          <Tabs mode="line" defaultIndex='2'>
            <TabsItem label="选项卡一" disabled>
              this is content one
          </TabsItem>
            <TabsItem label="选项卡二">
              this is content two
          </TabsItem>
            <TabsItem label="用户管理">
              this is content three
          </TabsItem>
          </Tabs>
          <Tabs mode="card" defaultIndex='1'>
            <TabsItem label="选项卡一" >
              this is content one
          </TabsItem>
            <TabsItem label={"选项卡二"}>
              this is content two
          </TabsItem>
          </Tabs>
        </div>
        <div className="Icons">
          <h1>Icons</h1>
          <Icon icon="coffee" theme="primary" />
          <Icon icon="allergies" theme="danger" size="9x" />
        </div>
        <div className="Input">
          <h1>Input</h1>
          <Input icon="search" placeholder="with icon" onChange={inputOnChange} />
          <Input placeholder="large Input" size="lg" />
          <Input icon="power-off" placeholder="disabled Input" disabled />
          <Input append=".com" prepend="https://" placeholder="with append Input" />
        </div>
        <div className="AutoComplete">
          <h1>AutoComplete</h1>
          <AutoComplete fetchSuggestions={handelFetch} renderOption={renderOption} onSelect={handelSelect} />
        </div>
        <div className="Select">
          <h1>Select</h1>
          <Select onChange={selectOnChange}>
            <Option value="选项一" >
              <Icon icon="coffee" />
            </Option>
            <Option disabled value="选项二" >
              我是禁用的
            </Option>
            <Option value="选项三" />
          </Select>
        </div>

      </header>
      <div className="br" style={{ padding: 150 }}>-----填高度专属-----</div>
    </div>
  );
}

export default App;
