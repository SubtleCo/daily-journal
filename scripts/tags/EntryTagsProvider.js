let entryTagsCollection = []

export const useEntryTags = () => [...entryTagsCollection]

export const getEntryTags = () => {
    return fetch(`http://localhost:8088/entryTags`)
        .then( res => res.json() )
        .then( parsedRes => {
            entryTagsCollection = parsedRes
        })
}