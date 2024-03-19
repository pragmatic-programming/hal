import React from "react";
import MenuButtonBox from "./MenuButtonBox";
import ButtonToggle from "../util/ButtonToggle";

interface Props {
    disabled?: boolean;
    iconOff: React.JSX.Element;
    iconOn: React.JSX.Element;
    on: boolean;
    onClick: () => void;
    tooltipOff: string;
    tooltipOn: string;
}

export default function MenuButtonToggle(props: Props): React.JSX.Element {
    return (
        <MenuButtonBox>
            <ButtonToggle
                placement={"right"}
                size={"large"}
                {...props}
            />
        </MenuButtonBox>
    );
}
