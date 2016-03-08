(() => {
    const frameLength = 1/18;
    const v = document.querySelector('video');

    document.body.addEventListener('keydown', (event) => {
        if (event.keyCode === 39 /* right */) {
            v.currentTime += frameLength;
            console.log('t=', v.currentTime);
        }
        else if (event.keyCode === 37) {
            v.currentTime -= frameLength;
            console.log('t=', v.currentTime);
        }
    });

    window.v = v;
})()
