let moods = []

export const useMoods = () => [...moods]

export const getMoods = () => {
    return fetch("http://localhost:8088/moods")
        .then(res => res.json())
        .then(parsedRes => {
            moods = parsedRes
        })
}