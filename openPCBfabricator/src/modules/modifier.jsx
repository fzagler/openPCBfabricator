import { IconStorm } from '@tabler/icons-react';
import { Slider, Text } from '@mantine/core';

function Modifier() {
  

  	return (

        <div className="w-full h-full flex flex-col justify-between pb-10">
            <div>
                <Text fw={300} size="md" c="">
					Mill Speed
				</Text>
                <Slider
                    color="blue"
                    defaultValue={100}
                    max={200}
                    min={0}
                    marks={[
                        { value: 0, label: '0%' },
                        { value: 100, label: '100%' },
                        { value: 200, label: '200%' },
                    ]}
                />
            </div>

            <div>
                <Text fw={300} size="md" c="">
					Drill Speed
				</Text>
                <Slider
                    color="blue"
                    defaultValue={100}
                    max={200}
                    min={0}
                    marks={[
                        { value: 0, label: '0%' },
                        { value: 100, label: '100%' },
                        { value: 200, label: '200%' },
                    ]}
                />
            </div>

            <div>
                <Text fw={300} size="md" c="">
					Cut Speed
				</Text>
                <Slider
                    color="blue"
                    defaultValue={100}
                    max={200}
                    min={0}
                    marks={[
                        { value: 0, label: '0%' },
                        { value: 100, label: '100%' },
                        { value: 200, label: '200%' },
                    ]}
                />
            </div>

        </div>

  	)
}

export default Modifier