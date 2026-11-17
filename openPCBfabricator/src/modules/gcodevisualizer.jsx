
import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { IconMinus, IconPlus, IconZoomReset } from '@tabler/icons-react';
import { ActionIcon, Checkbox } from '@mantine/core';

function GCodeVisualizer({ layers }) {
    const [showFront, setShowFront] = useState(true);
    const [showBack, setShowBack] = useState(false);
    const [showDrills, setShowDrills] = useState(false);

    return (
        <div className="w-full h-full overflow-hidden flex flex-row">

            <div className="flex-1 h-full overflow-hidden relative pb-4">
                <TransformWrapper
                    initialScale={1}
                    minScale={0.1}
                    maxScale={20}
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        <TransformComponent
                            wrapperStyle={{
                                width: "100%",
                                height: "100%"
                            }}
                            contentStyle={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html:
                                        (showFront ? layers.front || "" : "") +
                                        (showBack ? layers.back || "" : "") +
                                        (showDrills ? layers.drill || "" : "")
                                }}
                            />
                            </TransformComponent>

                            <div className="absolute top-2 left-2 flex flex-col gap-2">
                                <Checkbox
                                    label="Front Milling"
                                    checked={showFront}
                                    onChange={(event) => {
                                        if (event.currentTarget.checked) {
                                            setShowFront(true);
                                            setShowBack(false);
                                            setShowDrills(false);
                                        }
                                    }}
                                />
                                <Checkbox
                                    label="Back Balling"
                                    checked={showBack}
                                    onChange={(event) => {
                                        if (event.currentTarget.checked) {
                                            setShowFront(false);
                                            setShowBack(true);
                                            setShowDrills(false);
                                        }
                                    }}
                                />
                                <Checkbox
                                    label="Hole Drilling"
                                    checked={showDrills}
                                    onChange={(event) => {
                                        if (event.currentTarget.checked) {
                                            setShowFront(false);
                                            setShowBack(false);
                                            setShowDrills(true);
                                        }
                                    }}
                                />
                            </div>

                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                            <ActionIcon variant="filled" onClick={() => zoomIn()}>
                                <IconPlus style={{ width: "70%", height: "70%" }} />
                            </ActionIcon>

                            <ActionIcon variant="filled" onClick={() => zoomOut()}>
                                <IconMinus style={{ width: "70%", height: "70%" }} />
                            </ActionIcon>

                            <ActionIcon variant="filled" onClick={() => resetTransform()}>
                                <IconZoomReset style={{ width: "70%", height: "70%" }} />
                            </ActionIcon>
                        </div>
                    </>
                    )}
                </TransformWrapper>
            </div>
        </div>
    );
}

export default GCodeVisualizer;