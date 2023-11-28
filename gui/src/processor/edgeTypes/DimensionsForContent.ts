import { Dimensions } from "reactflow";

export class DimensionsForContent {
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    dimension(): Dimensions {
        return {
            width: this.width(),
            height: this.height(),
        };
    }

    private height(): number {
        const pixelForLine: number = 30;
        const minimumHeight: number = 200;
        const maximumHeight: number = 480;
        return this.minLengthMax(
            minimumHeight,
            this.lines().length * pixelForLine,
            maximumHeight
        );
    }

    private width(): number {
        const pixelForCharacter: number = 12;
        const minimumWidth: number = 300;
        const maximumWidth: number = 640;
        return this.minLengthMax(
            minimumWidth,
            this.longestLine().length * pixelForCharacter,
            maximumWidth
        );
    }

    private lines(): string[] {
        return this.content.split("\n");
    }

    private longestLine(): string {
        const lines: string[] = this.lines();
        let longestString: string = lines[0];
        for (const str of lines) {
            if (str.length > longestString.length) {
                longestString = str;
            }
        }
        return longestString;
    }

    private minLengthMax(minimum: number, length: number, maximum: number): number {
        return Math.min(
            Math.max(
                length,
                minimum
            ),
            maximum
        );
    }


}
