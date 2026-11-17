import { IconStorm } from '@tabler/icons-react';
import { Checkbox, NumberInput, Button } from '@mantine/core';

function Hightmap() {
  

    return (

        <div className="w-full h-full flex flex-col gap-2 pb-10">
            <Checkbox
                className='pb-6'
                defaultChecked
                label="Use Hightmap"
            />

            <NumberInput
                label="X Samples"
                allowNegative={false}
                defaultValue={0}
            />

            <NumberInput
                label="Y Samples"
                allowNegative={false}
                defaultValue={0}
            />

            <Button fullWidth color='green'>Create</Button>

            <Button fullWidth>Save</Button>
        </div>

    )
}

export default Hightmap