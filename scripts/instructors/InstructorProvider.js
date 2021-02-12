let instructors = []

export const useInstructors = () => [...instructors]

export const getInstructors = () => {
    return fetch("http://localhost:8088/instructors")
        .then(res => res.json())
        .then(parsedRes => {
            instructors = parsedRes
        })

}