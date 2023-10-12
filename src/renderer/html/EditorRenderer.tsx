import React, { CSSProperties } from "react";
import { Editor } from "../../model/Editor";
import { Editor as Monaco } from "@monaco-editor/react";
import { Theme, Typography, useTheme } from "@mui/material";
import { useStore } from "../../Store";
import { State } from "../../State";
import { useDraggable } from "@dnd-kit/core";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface Props {
    editor: Editor;
}

export function EditorRenderer(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    const firstSelectedEditor: number | null = useStore((state: State) => state.highlightedEditor.first);
    const secondSelectedEditor: number | null = useStore((state: State) => state.highlightedEditor.second);
    const selectEditor = useStore((state: State) => state.selectEditor);
    const menuWidth: number = useStore((state: State) => state.menuWidth);
    const {listeners, setNodeRef, transform} = useDraggable({id: props.editor.id,});
    let style: Partial<CSSProperties> = {
        borderColor: theme.palette.info.light,
        borderStyle: "solid",
        borderWidth: 1,
        background: theme.palette.gui.menu.background
    };
    if (transform) {
        style = {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        };
    }
    if (props.editor.id === firstSelectedEditor || props.editor.id === secondSelectedEditor) {
        style = {
            ...style,
            borderWidth: 2
        };
    }
    return (
        <div
            ref={setNodeRef}
            className={"rectangle"}
            style={{
                ...style,
                left: props.editor.position.x + menuWidth,
                top: props.editor.position.y,
                height: props.editor.dimension.height,
                width: props.editor.dimension.width,
            }}
            {...listeners}
            onDoubleClick={() => selectEditor(props.editor.id)}
        >
            <div
                style={{
                    display: "inline-block",
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    height: 20,
                    backgroundColor: "#ffffff"
                }}
            >
                <InsertDriveFileIcon fontSize="small"/>
                <Typography style={{marginLeft: 25}} variant="caption">filename.js</Typography>
            </div>
            <Monaco
                defaultLanguage={props.editor.language}
                defaultValue={props.editor.value}
                width={props.editor.dimension.width}
                height={props.editor.dimension.height - 20 - 5 - 5}
                options={{
                    minimap: {
                        enabled: false
                    }
                }}
            />
        </div>
    );
}
