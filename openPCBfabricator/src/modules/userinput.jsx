import { IconCancel, IconCircuitGroundDigital, IconCurrentLocation, IconHome, IconLetterXSmall, IconLetterYSmall, IconLetterZSmall, IconLockOpen2, IconMathXPlusY, IconPlayerPause, IconPlayerPlay, IconPlus, IconPropeller, IconPropellerOff, IconRefreshDot, IconRefreshOff, IconRestore, IconStackPush, IconUserPause } from '@tabler/icons-react';
import { Text, HoverCard, ActionIcon } from '@mantine/core';

function UserInput() {
  

    return (

        <div className="w-full flex flex-col gap-4">
            <div className='flex flex-row gap-2'>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='green' size="xl" variant="filled" onClick={() => {}}>
                            <IconLetterXSmall style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Zero X
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='green' size="xl" variant="filled" onClick={() => {}}>
                            <IconLetterYSmall style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Zero Y
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='green' size="xl" variant="filled" onClick={() => {}}>
                            <IconLetterZSmall style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Zero Z
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='green' size="xl" variant="filled" onClick={() => {}}>
                            <IconMathXPlusY style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Zero XY
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='green' size="xl" variant="filled" onClick={() => {}}>
                            <IconCurrentLocation style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Zero XYZ
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
            </div>

            <div className='flex flex-row gap-2'>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='orange' size="xl" variant="filled" onClick={() => {}}>
                            <IconHome style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Home
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='purple' size="xl" variant="filled" onClick={() => {}}>
                            <IconPlayerPause style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Pause
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='purple' size="xl" variant="filled" onClick={() => {}}>
                            <IconPlayerPlay style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Resume
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='red' size="xl" variant="filled" onClick={() => {}}>
                            <IconCancel style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Stop
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='yellow' size="xl" variant="filled" onClick={() => {}}>
                            <IconLockOpen2 style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Unlock
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='yellow' size="xl" variant="filled" onClick={() => {}}>
                            <IconRestore style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Reset
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
            </div>

            <div className='flex flex-row gap-2'>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='orange' size="xl" variant="filled" onClick={() => {}}>
                            <IconCircuitGroundDigital style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Move mill to board
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='orange' size="xl" variant="filled" onClick={() => {}}>
                            <IconStackPush style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Probe Z
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
            </div>

            <div className='flex flex-row gap-2'>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='cyan' size="xl" variant="filled" onClick={() => {}}>
                            <IconRefreshDot style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Spindle on
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='cyan' size="xl" variant="filled" onClick={() => {}}>
                            <IconRefreshOff style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Spindle off
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='indigo' size="xl" variant="filled" onClick={() => {}}>
                            <IconPropeller style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Flood on
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
                <HoverCard shadow="md">
                    <HoverCard.Target>
                        <ActionIcon color='indigo' size="xl" variant="filled" onClick={() => {}}>
                            <IconPropellerOff style={{ width: "70%", height: "70%" }} />
                        </ActionIcon>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text size="sm">
                            Flood off
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
            </div>
        </div>

    )
}

export default UserInput