
import { useEffect, useState } from "react";

import { IconChevronCompactDown, IconChevronCompactUp, IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronUp, IconStorm } from '@tabler/icons-react';
import { ActionIcon, Select } from '@mantine/core';

function Jog() {
  
    const [step, setStep] = useState(0.01);

    return (

        <div className="w-full h-full flex flex-row justify-around">
            <div className='flex flex-col gap-4'>
                <div className='flex flex-row gap-4'>
                    <ActionIcon size="xl" className='invisible'></ActionIcon>
                    <ActionIcon color='blue' size="xl" variant="filled" onClick={() => {}}>
                            <IconChevronUp style={{ width: "70%", height: "70%" }} />
                    </ActionIcon>
                    <ActionIcon size="xl" className='invisible'></ActionIcon>
                    <ActionIcon color='blue' size="xl" variant="filled" onClick={() => {}}>
                            <IconChevronCompactUp style={{ width: "70%", height: "70%" }} />
                    </ActionIcon>
                </div>
                <div className='flex flex-row gap-4'>
                    <ActionIcon color='blue' size="xl" variant="filled" onClick={() => {}}>
                            <IconChevronLeft style={{ width: "70%", height: "70%" }} />
                    </ActionIcon>
                    <ActionIcon size="xl" className='invisible'></ActionIcon>
                    <ActionIcon color='blue' size="xl" variant="filled" onClick={() => {}}>
                            <IconChevronRight style={{ width: "70%", height: "70%" }} />
                    </ActionIcon>
                    
                </div>
                <div className='flex flex-row gap-4'>
                    <ActionIcon size="xl" className='invisible'></ActionIcon>
                    <ActionIcon color='blue' size="xl" variant="filled" onClick={() => {}}>
                            <IconChevronDown style={{ width: "70%", height: "70%" }} />
                    </ActionIcon>
                    <ActionIcon size="xl" className='invisible'></ActionIcon>
                    <ActionIcon color='blue' size="xl" variant="filled" onClick={() => {}}>
                            <IconChevronCompactDown style={{ width: "70%", height: "70%" }} />
                    </ActionIcon>
                </div>
                
                <div>
                    <Select
                        label="Step"
                        value={step} 
                        onChange={setStep}
                        data={[0.01, 0.05, 0.1, 0.5, 1, 5, 10, 50]}
                    />
                </div>
            </div>
        </div>

    )
}

export default Jog