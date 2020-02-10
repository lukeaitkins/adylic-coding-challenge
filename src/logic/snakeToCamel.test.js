import { snakeToCamel, formatObjectCamelCase } from './snakeToCamel';

test('"alreadyCamelCase" is "alreadyCamelCase" in camel case', () => {
    expect(snakeToCamel("single")).toBe("single");
});

test('"multiple_words" is "multipleWords" in camel case', () => {
    expect(snakeToCamel("multiple_words")).toBe("multipleWords");
});

test('"MUlTiple_wOrDS" is "multipleWords" in camel case', () => {
    expect(snakeToCamel("MUlTiple_wOrDS")).toBe("multipleWords");
});

test('"lots_and_lots_of_words" is "lotsAndLotsOfWords" in camel case', () => {
    expect(snakeToCamel("lots_and_lots_of_words")).toBe("lotsAndLotsOfWords");
});

test('"Lots_And_LoTS_of_wORDS" is "lotsAndLotsOfWords" in camel case', () => {
    expect(snakeToCamel("Lots_And_LoTS_of_wORDS")).toBe("lotsAndLotsOfWords");
});

test('Empty Object formats correctly', () => {
    expect(formatObjectCamelCase({})).toStrictEqual({});
});

test('Empty Array formats correctly', () => {
    expect(formatObjectCamelCase([])).toStrictEqual([]);
});

test('Basic object formats correctly', () => {
    expect(formatObjectCamelCase({
        "single": 1,
        "multiple_words": "as",
        "Lots_And_LoTS_of_wORDS": "bleh_bleh",
        "$notSnake": 4
    })).toStrictEqual({
        "single": 1,
        "multipleWords": "as",
        "lotsAndLotsOfWords": "bleh_bleh",
        "$notSnake": 4
    });
});

test('Basic array formats correctly', () => {
    expect(formatObjectCamelCase([1, "as", "bleh_bleh", 4])).toStrictEqual([1, "as", "bleh_bleh", 4]);
});

test('Deep nested Object/Array formats correctly', () => {
    const input = [
        {
            "multiple_words" : [
                [5, 9, "test", {}],
            ],
            "Lots_And_LoTS_of_wORDS" : {
                "$notSnake": {
                    "multiple_words": 5,
                    "Lots_And_LoTS_of_wORDS": "bleh_bleh",
                    "empty": {}
                }
            }
        }, {
            "single": 1,
            "multiple_words": "as",
            "Lots_And_LoTS_of_wORDS": "bleh_bleh",
            "$notSnake": 4
        },
        [1, "as", "bleh_bleh", 4]
    ];
    const expected = [
        {
            "multipleWords" : [
                [5, 9, "test", {}],
            ],
            "lotsAndLotsOfWords" : {
                "$notSnake": {
                    "multipleWords": 5,
                    "lotsAndLotsOfWords": "bleh_bleh",
                    "empty": {}
                }
            }
        }, {
            "single": 1,
            "multipleWords": "as",
            "lotsAndLotsOfWords": "bleh_bleh",
            "$notSnake": 4
        },
        [1, "as", "bleh_bleh", 4]
    ];
    expect(formatObjectCamelCase(input)).toStrictEqual(expected);
});