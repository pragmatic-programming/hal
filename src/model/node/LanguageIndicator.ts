export const languageIndicators = [
    "C",
    "HTML",
    "JavaScript",
    "PlainText",
    "Python",
] as const;

export type LanguageIndicator = typeof languageIndicators[number];

export function isLanguageIndicator(languageIndicator: unknown): languageIndicator is LanguageIndicator {
    return typeof languageIndicator === "string" && languageIndicators.find((value: LanguageIndicator): boolean => value === languageIndicator) !== undefined;
}
