import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputBase } from "@mui/material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { isLanguage, Language, languages } from "../../model/Languages";

interface Props {
    nodeId: string,
    language: Language
}

export default function EditorFooterLanguageSelect(props: Props) {
    const setNodeNodeData = useStore((state: State) => state.setNodeNodeData);
    return (
        <FormControl
            style={{
                minWidth: 120,
            }}
            variant="standard"
            className="nopan nodrag"
        >
            <Select
                input={<InputBase/>}
                onChange={(event: SelectChangeEvent<Language>) => {
                    console.log(event.target.value);
                    if (!isLanguage(event.target.value)) {
                        throw new Error("Event.target.value is not of language type");
                    }
                    setNodeNodeData(props.nodeId, {language: event.target.value});
                }}
                value={props.language}
            >
                {languages.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
            </Select>
        </FormControl>
    );
}
