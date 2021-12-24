const doWorkPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve('Work is done!');
    }, 2000);
});

doWorkPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
