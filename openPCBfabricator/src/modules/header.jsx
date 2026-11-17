
import { useState } from 'react';

import { IconArrowDown, IconArrowLeft, IconChevronDown, IconEdit, IconEye, IconFile, IconFileZip, IconHelp, IconLayoutDashboard, IconMenu2, IconMoon, IconSun, IconTrash } from '@tabler/icons-react';
import { useMantineColorScheme, ActionIcon, Button, Divider, Menu } from '@mantine/core';

function Header() {

    const [mode, setMode] = useState(false);
    const { setColorScheme, toggleColorScheme } = useMantineColorScheme();

  	return (

        <div className="w-full flex flex-row p-2 gap-4 items-center">

            <ActionIcon variant="default" color="gray" size="lg">
                <IconMenu2 style={{ width: '70%', height: '70%' }} />
            </ActionIcon>

            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <Button
                        variant="default"
                        leftSection={<IconFile size={14} />}
                        rightSection={<IconChevronDown size={14} />}
                    >
                        File
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item leftSection={<IconFileZip size={14} />} onClick={() => window.electronWindow.send("header:importZIP")}>
                        Import ZIP
                    </Menu.Item>
                    <Menu.Item leftSection={<IconFile size={14} />} onClick={() => window.electronWindow.send("header:importIndividual")}>
                        Import Individals
                    </Menu.Item>
                    <Menu.Item color="red" leftSection={<IconTrash size={14} />} onClick={() => window.electronWindow.send("header:flush")}>
                        Flush Imports
                    </Menu.Item>

                </Menu.Dropdown>
            </Menu>

            <Button
                variant="default"
                leftSection={<IconEdit size={14} />}
                rightSection={<IconChevronDown size={14} />}
            >
                Edit
            </Button>

            <Button
                variant="default"
                leftSection={<IconEye size={14} />}
                rightSection={<IconChevronDown size={14} />}
            >
                View
            </Button>

            <Button
                variant="default"
                leftSection={<IconLayoutDashboard size={14} />}
                rightSection={<IconChevronDown size={14} />}
            >
                Window
            </Button>

            <Button
                variant="default"
                leftSection={<IconHelp size={14} />}
                rightSection={<IconChevronDown size={14} />}
            >
                Help
            </Button>

            <ActionIcon variant="default" color="gray" size="lg" onClick={(event) => {setMode(!mode); toggleColorScheme()}}>
                {mode ? <IconMoon style={{ width: '70%', height: '70%' }} /> : <IconSun style={{ width: '70%', height: '70%' }} />}
            </ActionIcon>

        </div>

  	)
}

export default Header