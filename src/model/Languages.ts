export const languages = [
    "JavaScript",
    "Python",
    "HTML",
    "PlainText",
] as const;

export type Language = typeof languages[number];

export function isLanguage(language: unknown): language is Language {
    return typeof language === "string" && languages.find(value => value === language) !== undefined;
}
