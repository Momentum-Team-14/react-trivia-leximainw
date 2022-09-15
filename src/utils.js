function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html")
    return doc.documentElement.textContent
}

const shuffleArray = arr => {
    arr = [...arr]
    // algorithm: Fisher-Yates shuffle
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (let i = arr.length - 1; i >= 0; i--) {
        const swapIndex = Math.floor(Math.random() * i)
        const temp = arr[swapIndex]
        arr[swapIndex] = arr[i]
        arr[i] = temp
    }
    return arr
}

export {htmlDecode, shuffleArray}
