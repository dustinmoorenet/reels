import expect from 'expect';

import {
    reduceTimeLine,
    transformMoviesTimeToTimeLine,
} from 'js/redux/selectors/components/playList';

describe('redux/selectors/components/playList', () => {
    describe('reduceTimeLine', () => {
        function testReduceTimeLine({timeLine, expected}, index) {
            it(`should reduce timeline to no overlap times (test: ${index + 1})`, () => {
                expect(reduceTimeLine(timeLine, Object.keys(timeLine).sort())).toEqual(expected);
            });
        }

        const tests = [
            {
                timeLine: {
                    10: true,
                    16: false,
                },
                expected: {
                    10: true,
                    16: false,
                },
            },
            {
                timeLine: {
                    10: true,
                    16: false,
                    27: true,
                    32: false,
                },
                expected: {
                    10: true,
                    16: false,
                    27: true,
                    32: false,
                },
            },
            {
                timeLine: {
                    10: true,
                    15: true,
                    16: false,
                    27: true,
                    28: false,
                    32: false,
                },
                expected: {
                    10: true,
                    32: false,
                },
            },
            {
                timeLine: {
                    10: true,
                    15: true,
                    16: false,
                    22: false,
                    27: true,
                    32: false,
                    34: true,
                    35: true,
                    37: false,
                    39: false,
                },
                expected: {
                    10: true,
                    22: false,
                    27: true,
                    32: false,
                    34: true,
                    39: false,
                },
            },
            {
                timeLine: {
                    10: true,
                    14: true,
                    15: true,
                    16: false,
                    22: false,
                    27: true,
                    32: false,
                    34: true,
                    35: true,
                    36: false,
                    37: false,
                    39: false,
                },
                expected: {
                    10: true,
                    39: false,
                },
            },
        ];

        tests.forEach(testReduceTimeLine);
    });

    describe('transformMoviesTimeToTimeLine', () => {
        function testTransformMoviesTimeToTimeLine({movieTimes, expected}, index) {
            it(`should reduce timeline to no overlap times (test: ${index + 1})`, () => {
                expect(transformMoviesTimeToTimeLine(movieTimes)).toEqual(expected);
            });
        }

        const tests = [
            {
                movieTimes: [
                    [10, 16],
                ],
                expected: {
                    10: true,
                    16: false,
                },
            },
            {
                movieTimes: [
                    [10, 16],
                    [27, 32],
                ],
                expected: {
                    10: true,
                    16: false,
                    27: true,
                    32: false,
                },
            },
            {
                movieTimes: [
                    [10, 16],
                    [15, 28],
                    [27, 32],
                ],
                expected: {
                    10: true,
                    15: true,
                    16: false,
                    27: true,
                    28: false,
                    32: false,
                },
            },
            {
                movieTimes: [
                    [10, 16],
                    [15, 22],
                    [27, 32],
                    [34, 37],
                    [35, 39],
                ],
                expected: {
                    10: true,
                    15: true,
                    16: false,
                    22: false,
                    27: true,
                    32: false,
                    34: true,
                    35: true,
                    37: false,
                    39: false,
                },
            },
            {
                movieTimes: [
                    [10, 16],
                    [14, 36],
                    [15, 22],
                    [27, 32],
                    [34, 37],
                    [35, 39],
                ],
                expected: {
                    10: true,
                    14: true,
                    15: true,
                    16: false,
                    22: false,
                    27: true,
                    32: false,
                    34: true,
                    35: true,
                    36: false,
                    37: false,
                    39: false,
                },
            },
        ];

        tests.forEach(testTransformMoviesTimeToTimeLine);
    });
});
