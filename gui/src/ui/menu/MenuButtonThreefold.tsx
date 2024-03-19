import React from "react";
import MenuButtonBox from "./MenuButtonBox";
import ButtonThreefold from "../util/ButtonThreefold";

interface Props {
    disabled?: boolean;
    iconStepOne: React.JSX.Element;
    iconStepTwo: React.JSX.Element;
    iconStepThree: React.JSX.Element;
    step: "one" | "two" | "three";
    onClick: () => void;
    tooltipStepOne: string;
    tooltipStepTwo: string;
    tooltipStepThree: string;
}

export default function MenuButtonThreefold(props: Props): React.JSX.Element {
    return (
        <MenuButtonBox>
            <ButtonThreefold
                placement={"right"}
                size={"large"}
                {...props}
            />
        </MenuButtonBox>
    );
}
