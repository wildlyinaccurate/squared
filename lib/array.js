import { randomIntBetween } from './math'

let randomArrayItem = (arr) => arr[randomIntBetween(0, arr.length - 1)]

export { randomArrayItem }
