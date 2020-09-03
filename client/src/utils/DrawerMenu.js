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
            <Button onClick={showDrawer}>
                <MenuOutlined />
            Menu
            </Button>
            <Drawer
                title="Menu"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <p>Category1</p>
                <p>Category2</p>
                <p>Category3</p>
            </Drawer>
        </div>
    )
}

export default DrawerMenu
