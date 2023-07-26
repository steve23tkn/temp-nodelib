module.exports = {
    preset: "ts-jest/presets/js-with-babel",
    transform: { "^.+\\.ts?$": "ts-jest" },
    testEnvironment: "node",
    testRegex: ".*\\.(test|spec)?\\.(ts)$",
    moduleFileExtensions: ["ts", "js", "json", "node", "cjs"]
};
