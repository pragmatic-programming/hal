import React from "react";
import MenuButtonBox from "./MenuButtonBox";
import ButtonSteps, { Step } from "../util/ButtonSteps";


interface Props {
    steps: Step[];
    step: number;
    onClick: () => void;
}

export default function MenuButtonSteps(props: Props): React.JSX.Element {
    return (
        <MenuButtonBox>
            <ButtonSteps
                placement={"right"}
                size={"large"}
                {...props}
            />
        </MenuButtonBox>
    );
}
