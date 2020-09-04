import React, { useState } from 'react'
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

function DrawerMenu() {

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <div style={{ justifyContent: 'flex-end', display: 'flex' }}>
            <Button onClick={showDrawer} type='text'>
                <MenuOutlined />
            </Button>
            <Drawer
                title="Menu"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <p>Skeleton Models</p>
                <p>Human Models</p>
                <p>Animal Plant Model</p>
                <p>SPECIMEN</p>
                <p>Microscope Slides</p>
                <p>Chemistry</p>
                
            </Drawer>
        </div>
    )
}

export default DrawerMenu
