'use strict';
const fs = require('fs');
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('../google-creds.json');
const _ = require('lodash');

function parseSecondsFormat(string) {
    const parts = string.split(':');

    if (parts.length === 1) {
        return +parts[0];
    }

    return (parts[0] * 60) + +parts[1];
}

function parseDateFormat(date) {
    return Date.parse(date);
}

function endOfDay(unix) {
    return +(new Date(unix)).setHours(23, 59, 59, 999);
}

function getSheet() {
    return new Promise((resolve, reject) => {
        const sheet = new GoogleSpreadsheet('1JCbRSx9VwYpV1OZ4V7RYayVw6SojgtpIrJUqFKTk8jw');

        sheet.useServiceAccountAuth(creds, (error) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(sheet);
            }
        });
    });
}

function getTagData(sheet) {
    const data = [];

    return new Promise((resolve, reject) => {
        sheet.getCells(2, {
            'min-row': 6,
            'max-col': 4,
        }, (error, cells) => {
            if (error) {
                reject(error);
            }
            else {
                let row;
                cells.forEach((cell) => {
                    switch (cell.col) {
                    case 1:
                        row = {
                            movieNumber: _.padStart(cell.value, 2, 0),
                        };
                        break;
                    case 2:
                        row.what = _.without(cell.value.split(',').map((v) => v.trim()), '');
                        break;
                    case 3:
                        row.startSeconds = parseSecondsFormat(cell.value);
                        break;
                    case 4:
                        row.endSeconds = parseSecondsFormat(cell.value);
                        data.push(row);
                        break;
                    default:
                    }
                });

                resolve(data);
            }
        });
    });
}

function createIndexPass1(data) {
    const index = {};

    data.forEach((thing) => {
        thing.what.forEach((what) => {
            const whatIndex = index[what] = index[what] || {};

            whatIndex[thing.movieNumber] = whatIndex[thing.movieNumber] || [];

            whatIndex[thing.movieNumber].push([thing.startSeconds, thing.endSeconds]);
        });
    });

    return index;
}

const OVERLAP = 2;
function createIndexPass2(index) {
    Object.keys(index).forEach((what) => {
        Object.keys(index[what]).forEach((movieNumber) => {
            const times = index[what][movieNumber].sort((timeA, timeB) => timeA[0] - timeB[0]);
            let lastEnd = (OVERLAP + 1) * -1;

            index[what][movieNumber] = times.reduce((newTimes, time) => {
                const start = time[0];
                const end = time[1];
                if (lastEnd + OVERLAP >= start) {
                    newTimes[newTimes.length - 1][1] = end;
                }
                else {
                    newTimes.push([start, end]);
                }
                lastEnd = end;

                return newTimes;
            }, []);
        });
    });

    return index;
}

function getMovieData(sheet) {
    const data = [];

    return new Promise((resolve, reject) => {
        sheet.getCells(1, {
            'min-row': 2,
            'max-col': 6,
        }, (error, cells) => {
            if (error) {
                reject(error);
            }
            else {
                let row;
                cells.forEach((cell) => {
                    switch (cell.col) {
                    case 1:
                        row = {
                            movieNumber: _.padStart(cell.value, 2, 0),
                            description: '',
                            filmedBy: '',
                        };
                        data.push(row);
                        break;
                    case 2:
                        row.description = cell.value.trim();
                        break;
                    case 3:
                        row.filmedBy = cell.value.trim();
                        break;
                    case 4:
                        row.length = Math.ceil(+cell.value);
                        break;
                    case 5:
                        row.startDate = parseDateFormat(cell.value);
                        row.startDateString = cell.value;
                        row.endDate = endOfDay(row.startDate);
                        break;
                    case 6:
                        row.endDate = parseDateFormat(cell.value);
                        row.endDateString = cell.value;
                        break;
                    default:
                    }
                });

                resolve(data);
            }
        });
    });
}

function getTags(sheet) {
    return getTagData(sheet)
        .then((data) => createIndexPass1(data))
        .then((index) => createIndexPass2(index))
        .then((index) => {
            let id = 1;
            const tags = _.chain(index)
                .map((movies, tag) => (
                    {
                        id: id++,
                        label: tag,
                        movies,
                    }
                ))
                .sortBy('label')
                .value();

            const json = JSON.stringify(tags, null, '  ');

            fs.writeFileSync('./dist/tags.js', `window.tags = ${json};\n`);
        });
}

function getMovies(sheet) {
    return getMovieData(sheet)
        .then((movies) => {
            const json = JSON.stringify(_.sortBy(movies, 'startDate'), null, '  ');

            fs.writeFileSync('./dist/movies.js', `window.movies = ${json};\n`);
        });
}

getSheet()
    .then((sheet) => (
        getTags(sheet)
            .then(() => getMovies(sheet))
    ))
    .catch((error) => {
        console.error(error.stack);
    });
