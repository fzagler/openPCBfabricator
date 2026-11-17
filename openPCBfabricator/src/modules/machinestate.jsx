
import { useEffect, useState } from "react";

import { IconStorm } from '@tabler/icons-react';
import { Kbd, RollingNumber, Button, Text } from '@mantine/core';

function MachineState() {
  
    const [connected, setConneted] = useState(false);
    const [job, setJob] = useState(false);
    const [workCoords, setWorkCoords] = useState({x: 105, y: 111, z: 311});
    const [machineCoords, setmachineCoords] = useState({x: 456, y: 455, z: 976});

    function formatCoord(value) {
        const [whole, decimal] = Number(value)
            .toFixed(4)
            .split(".");

        return `${whole.padStart(4, "0")}.${decimal}`;
    }

    return (

        <div className="w-full h-full flex flex-col">
            <div>
                <Text fw={300} size="md" c="">
					Work Coordinates
				</Text>
                <div className='w-full flex flex-row justify-around'>
                    X: <Kbd><RollingNumber fixedDecimalScale decimalScale={3} value={workCoords.x} fz="18px" /></Kbd>
                    Y: <Kbd><RollingNumber fixedDecimalScale decimalScale={3} value={workCoords.y} fz="18px" /></Kbd>
                    Z: <Kbd><RollingNumber fixedDecimalScale decimalScale={3} value={workCoords.z} fz="18px" /></Kbd>
                </div>
            </div>
            <div>
                <Text fw={300} size="md" c="">
					Machine Coordinates
				</Text>
                <div className='w-full flex flex-row justify-around'>
                    X: <Kbd><RollingNumber fixedDecimalScale decimalScale={3} value={machineCoords.x} fz="18px" /></Kbd>
                    Y: <Kbd><RollingNumber fixedDecimalScale decimalScale={3} value={machineCoords.y} fz="18px" /></Kbd>
                    Z: <Kbd><RollingNumber fixedDecimalScale decimalScale={3} value={machineCoords.z} fz="18px" /></Kbd>
                </div>
            </div>
            <div>
                <Text fw={300} size="md" c="">
					Connection Status
				</Text>
                {!connected ? <Button fullWidth variant="outline" color="red">Not Connected</Button> : <Button fullWidth variant="outline" color="green">Connected</Button>}
            </div>
            <div>
                <Text fw={300} size="md" c="">
					Job Status
				</Text>
                {!job ? <Button fullWidth variant="outline" color="orange">Idle</Button> : <Button fullWidth variant="outline" color="green">Running</Button>}
            </div>
        </div>

    )
}

export default MachineState