export default function UUID() {
    let UUID = ''
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "H", "I", "J", "M", "L", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    for (let j = 0; j < 2; j++) {
      UUID += letters[Math.floor(Math.random() * 10)].toLowerCase()
    }
    for (let i = 0; i < 2; i++) {
      UUID += letters[Math.floor(Math.random() * 10)]
    }
    for (let g = 0; g < 1; g++) {
      UUID += Math.floor(Math.random() * 10)
    }
    console.log(UUID)
    return UUID
}
