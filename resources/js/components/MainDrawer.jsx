import React, {useState, useCallback} from 'react';
import {Drawer, Button, Menu} from 'react-daisyui';

export default function MainDrawer({children}) {

    const [visible, setVisible] = useState(false);

    const toggleVisible = useCallback(() => {
        setVisible(visible => !visible);
    }, []);

    return <Drawer  open={visible} onClickOverlay={toggleVisible} side={
        <Menu className="p-4 w-80 h-full bg-secondary text-secondary-content">
            <Menu.Item>
                <a>Sidebar Item 1</a>
            </Menu.Item>
            <Menu.Item>
                <a>Sidebar Item 2</a>
            </Menu.Item>
        </Menu>
    }>
        <Button color="primary" onClick={toggleVisible} className="lg:hidden">
            Open drawer
        </Button>
        {children}
    </Drawer>
}
