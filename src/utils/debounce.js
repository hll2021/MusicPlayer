export const debounce = function (fn, delay) {
    delay = delay || 500;
    let timer = null;

    return function () {
        let th = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(th, args);
        }, delay);
    }
}

