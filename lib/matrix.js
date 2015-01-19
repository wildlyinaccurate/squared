function *allCoordinates(matrix) {
    let nx = matrix.shape[0]
    let ny = matrix.shape[1]

    for (let x = 0; x < nx; ++x) {
        for (let y = 0; y < ny; ++y) {
            yield [x, y]
        }
    }
}

export { allCoordinates }
