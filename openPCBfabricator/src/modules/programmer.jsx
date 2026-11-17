import { useState } from "react";
import { Button, ScrollArea, Divider, Text, NumberInput } from "@mantine/core";

function Programmer() {
    const [settings, setSettings] = useState({
        offset: 0,
        millDiameter: 0.15,
        millPaths: 1,
        pathSpacing: 0.15,

        safeHeight: 3,
        millDepth: -0.05,
        cutDepth: -1.8,
        drillDepth: -1.8,

        millFeedrate: 250,
        drillFeedrate: 100,
        cutFeedrate: 200,
        cutInfeed: 0.3,

        millSpindleSpeed: 12000,
        drillSpindleSpeed: 12000,
        cutSpindleSpeed: 12000
    });

    function updateSetting(key, value) {
        setSettings((prev) => ({
            ...prev,
            [key]: value === "" ? 0 : Number(value)
        }));
    }

    function SettingRow({ label, description, valueKey, min, max, step = 0.01, allowDecimal = true }) {
        return (
            <div className="w-full flex flex-row justify-between items-center gap-4 py-1">
                <NumberInput
                    label={label}
                    value={settings[valueKey]}
                    onChange={(value) => updateSetting(valueKey, value)}
                    min={min}
                    max={max}
                    step={step}
                    allowDecimal={allowDecimal}
                />

                <Text size="sm" c="dimmed" className="w-[80%]">
                    {description}
                </Text>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col gap-2 pb-20">
            <ScrollArea className="h-full w-full">
                <Divider my="xs" label="Isolation Routing" labelPosition="center" />

                <SettingRow label="General offset" valueKey="offset" min={0} max={100} step={1} allowDecimal={false} description="How far the isolation paths are expanded from copper." />
                <SettingRow label="Mill diameter" valueKey="millDiameter" min={0.001} max={10} step={0.01} description="Diameter of the milling bit in mm." />
                <SettingRow label="Mill paths" valueKey="millPaths" min={0} max={10} step={1} allowDecimal={false} description="Number of isolation passes around copper." />
                <SettingRow label="Path spacing" valueKey="pathSpacing" min={0} max={10} step={0.01} description="Distance between multiple isolation paths in mm." />

                <Divider my="xs" label="Heights" labelPosition="center" />

                <SettingRow label="Safe height" valueKey="safeHeight" min={0} max={100} step={0.1} description="Z height used for travel moves." />
                <SettingRow label="Mill depth" valueKey="millDepth" min={-10} max={0} step={0.01} description="Z depth for isolation milling." />
                <SettingRow label="Cut depth" valueKey="cutDepth" min={-20} max={0} step={0.1} description="Final Z depth for board outline cutting." />
                <SettingRow label="Drill depth" valueKey="drillDepth" min={-20} max={0} step={0.1} description="Z depth for drilling holes." />

                <Divider my="xs" label="Feedrates" labelPosition="center" />

                <SettingRow label="Mill feedrate" valueKey="millFeedrate" min={1} max={10000} step={10} allowDecimal={false} description="Feedrate for isolation milling in mm/min." />
                <SettingRow label="Drill feedrate" valueKey="drillFeedrate" min={1} max={10000} step={10} allowDecimal={false} description="Feedrate for drilling in mm/min." />
                <SettingRow label="Cut feedrate" valueKey="cutFeedrate" min={1} max={10000} step={10} allowDecimal={false} description="Feedrate for outline cutting in mm/min." />
                <SettingRow label="Cut-infeed" valueKey="cutInfeed" min={0.01} max={10} step={0.1} description="Depth per outline cutting pass in mm." />

                <Divider my="xs" label="Spindle Speeds" labelPosition="center" />

                <SettingRow label="Mill spindle speed" valueKey="millSpindleSpeed" min={0} max={100000} step={500} allowDecimal={false} description="Spindle speed for isolation milling in RPM." />
                <SettingRow label="Drill spindle speed" valueKey="drillSpindleSpeed" min={0} max={100000} step={500} allowDecimal={false} description="Spindle speed for drilling in RPM." />
                <SettingRow label="Cut spindle speed" valueKey="cutSpindleSpeed" min={0} max={100000} step={500} allowDecimal={false} description="Spindle speed for outline cutting in RPM." />
            </ScrollArea>

            <Button color="green" onClick={() => window.electronWindow.send("programmer:createGCode", settings)}>
                Generate GCode
            </Button>
        </div>
    );
}

export default Programmer;