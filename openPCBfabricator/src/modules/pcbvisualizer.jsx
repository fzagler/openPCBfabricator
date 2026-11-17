
import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { IconMinus, IconPlus, IconZoomReset } from '@tabler/icons-react';
import { ActionIcon, Checkbox } from '@mantine/core';

function PCBVisualizer({ layers }) {
    const [showFront, setShowFront] = useState(true);

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
                                    (showFront ? layers.front || "" : layers.back || "")
                                    .replace(
                                        "</svg>",
                                        `
                                        <line
                                            x1="0"
                                            y1="-100"
                                            x2="5000"
                                            y2="-100"
                                            stroke="red"
                                            stroke-width="300"
                                        />

                                        <line
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="-5000"
                                            stroke="lime"
                                            stroke-width="300"
                                        />

                                        </svg>
                                        `
                                    )
                                }}
                            />
                            </TransformComponent>

                            <div className="absolute top-2 left-2 flex flex-col gap-2">
                                <Checkbox
                                    label="Front Copper"
                                    checked={showFront}
                                    onChange={(event) => setShowFront(event.currentTarget.checked)}
                                />
                                <Checkbox
                                    label="Back Copper"
                                    checked={!showFront}
                                    onChange={(event) => setShowFront(!event.currentTarget.checked)}
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

export default PCBVisualizer;