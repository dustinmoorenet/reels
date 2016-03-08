const childProcess = require('child_process');
const _ = require('lodash');

const getLengthCmd = (movieNumber) => `ffprobe -v error -select_streams v:0 -show_entries stream=duration -of default=noprint_wrappers=1:nokey=1 dist/files/${movieNumber}-740k.mp4`;
const getImagesCmd = (movieNumber, fps) => `ffmpeg -loglevel quiet -y -i dist/files/${movieNumber}-740k.mp4 -r ${fps} dist/images/${movieNumber}-%03d.jpeg`;
// const getPalletCmd = (movieNumber, fps, length) => `ffmpeg -y -ss 0 -t ${length} -i dist/files/${movieNumber}-740k.mp4 -vf fps=${fps},scale=147:-1:flags=lanczos,palettegen dist/files/palette.png`;
const makeGIFCmd = (movieNumber) => `ffmpeg -loglevel quiet -y -framerate 2 -i dist/images/${movieNumber}-%03d.jpeg -filter:v scale=148:110 -r 30 dist/images/${movieNumber}.gif`;
// const makeGIFCmd = (movieNumber, fps, length) => `ffmpeg -ss 0 -t ${length} -i dist/files/${movieNumber}-740k.mp4 -i dist/files/palette.png -filter_complex "fps=${fps},scale=147:-1:flags=lanczos[x];[x][1:v]paletteuse" dist/images/${movieNumber}.gif`;

function exec(cmd) {
    return new Promise((resolve, reject) => {
        childProcess.exec(cmd, (error, stdout, stderr) => {
            if (error || stderr) {
                reject(error || stderr);
            }
            else {
                resolve(stdout.replace('\n', ''));
            }
        });
    });
}

function getLength(movieNumber) {
    return exec(getLengthCmd(movieNumber));
}

function determineFPS(length) {
    return 14 / +length;
}

function getImages(movieNumber, fps) {
    return exec(getImagesCmd(movieNumber, fps));
}

function makeGIF(movieNumber) {
    console.log('making GIF', movieNumber);
    return exec(makeGIFCmd(movieNumber));
}

function deleteImages(movieNumber) {
    return exec(`cp dist/images/${movieNumber}-001.jpeg dist/images/${movieNumber}.jpeg; rm dist/images/${movieNumber}-*.jpeg`);
}

function makeAll() {
    return _.range(1, 70).reduce((promise, number) => {
        const movieNumber = _.padStart(number, 2, 0);

        return promise.then(() => (
            getLength(movieNumber)
                .then(determineFPS)
                .then((fps) => getImages(movieNumber, fps))
                .then(() => makeGIF(movieNumber))
                .then(() => deleteImages(movieNumber))
        ));
    }, Promise.resolve());
}

makeAll()
    .then(console.log)
    .catch(console.error);
