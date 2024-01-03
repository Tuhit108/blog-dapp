import { GlobalOutlined, LockOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
const PPTabs = (props) => (
  <Tabs
    defaultActiveKey="public-tab"
    items={[
        {
            key: 'public-tab',
            label: (<span><GlobalOutlined/> Public</span>),
            children: props.public
        },
        {
            key: 'private-tab',
            label: (<span><LockOutlined/> Private</span>),
            children: props.private
        }
    ]}
    centered={true}
    
  />
);
export default PPTabs;