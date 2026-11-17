
import { useState } from 'react';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { IconArrowDown, IconArrowLeft, IconChevronDown, IconCode, IconEdit, IconEye, IconFile, IconHelp, IconLayoutDashboard, IconMenu2 } from '@tabler/icons-react';
import { ActionIcon, Button, Divider, Tabs, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { useEffect } from "react";


import Header from './modules/header'
import PCBVisualizer from './modules/pcbvisualizer'
import GCodeVisualizer from './modules/gcodevisualizer'
import Modifier from './modules/modifier'
import Hightmap from './modules/hightmap'
import UserInput from './modules/userinput'
import MachineState from './modules/machinestate'
import Jog from './modules/jog'
import Programmer from './modules/programmer'

function App() {

	const [visualizerTab, setVisualizerTab] = useState('pcb');
	const [gcode, setGcode] = useState({});
	const [pcb, setPcb] = useState({});

	useEffect(() => {
		const cleanup = window.electronWindow.on("notify", (data) => {
			notifications.show({
				title: data.title,
				message: data.msg,
				color: data.color
			})
		});

		return cleanup;
	}, []);

	useEffect(() => {
        const cleanup = window.electronWindow.on("svg", (data) => {
            setPcb(data.layers);
        });

        return cleanup;
    }, []);

	useEffect(() => {
        const cleanup = window.electronWindow.on("gcode", (data) => {
            setGcode(data.layers)
        });

        return cleanup;
    }, []);


  	return (
		<MantineProvider defaultColorScheme={'dark'}>
			<Notifications position="top-right" zIndex={9999} />
			<div className='w-screen h-screen overflow-hidden'>
				<Header />

				<Divider></Divider>

				<div className='w-full h-full flex flex-row'>

					<div className='w-[17vw] h-screen flex flex-col gap-2'>
						
						<div className='p-2 h-[30%]'>
							<Text fw={500} size="lg" c="">
								Spindle Modifier
							</Text>
							<Modifier />
						</div>
						<Divider></Divider>

						<div className='p-2 h-[50%]'>
							<Text fw={500} size="lg" c="">
								Hightmap
							</Text>
							<Hightmap />
						</div>
						<Divider></Divider>

						<div className='p-2 h-[40%]'>
							<Text fw={500} size="lg" c="">
								User-Input
							</Text>
							<UserInput />
						</div>
						<Divider></Divider>


					</div>

					<Divider orientation="vertical"></Divider>
					<div className='w-[66vw] h-screen flex flex-col gap-2'>
						
						<div className='p-2 h-[60%]'>
							{/* <h1 className='text-lg text-gray-200'>Visualizer</h1> */}
							<Tabs value={visualizerTab} onChange={setVisualizerTab}>
								<Tabs.List justify="space-around" >
									<Tabs.Tab value="pcb" leftSection={<IconCode size={12} />}>
										PCB Visualizer
									</Tabs.Tab>
									<Tabs.Tab value="gcode" leftSection={<IconCode size={12} />}>
										G-Code Visualizer
									</Tabs.Tab>
								</Tabs.List>
							</Tabs>

							{visualizerTab == "pcb" ? <PCBVisualizer layers={pcb}/> : <></>}
							{visualizerTab == "gcode" ? <GCodeVisualizer layers={gcode}/> : <></>}

						</div>
						<Divider></Divider>

						<div className='p-2 h-[40%]'>
							<Text fw={500} size="lg" c="">
								Programmer
							</Text>
							<Programmer/>
						</div>
					</div>

					<Divider orientation="vertical"></Divider>
					<div className='w-[17vw] h-screen flex flex-col gap-2'>
						
						<div className='p-2'>
							<Text fw={500} size="lg" c="">
								Machine State
							</Text>
							<MachineState/>
						</div>
						<Divider></Divider>

						<div className='p-2 h-[30%]'>
							<Text fw={500} size="lg" c="">
								Jog
							</Text>
							<Jog/>
						</div>
						<Divider></Divider>

						<div className='p-2 h-[60%]'>
							<Text fw={500} size="lg" c="">
								G-Code
							</Text>
						</div>
						<Divider></Divider>

					</div>

				</div>



			</div>
		</MantineProvider>
  	)
}

export default App
