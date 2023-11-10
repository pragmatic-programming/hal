import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputBase } from "@mui/material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { isLanguage, LanguageIndicator, languageIndicators } from "../../model/node/LanguageIndicator";

interface Props {
    nodeId: string,
    language: LanguageIndicator
}

export default function EditorFooterLanguageSelect(props: Props) {
    const setNodeNodeDataLanguage = useStore((state: State) => state.reactFlow.setNodeNodeDataLanguage);
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
                onChange={(event: SelectChangeEvent<LanguageIndicator>) => {
                    if (!isLanguage(event.target.value)) {
                        throw new Error("Event.target.value is not of language type");
                    }
                    setNodeNodeDataLanguage(props.nodeId, event.target.value);
                }}
                value={props.language}
            >
                {languageIndicators.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
            </Select>
        </FormControl>
    );
}
