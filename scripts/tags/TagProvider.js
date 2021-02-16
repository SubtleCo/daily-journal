let tagCollection = []

export const useTags = () => [...tagCollection]

export const getTags = () => {
    return fetch(`http://localhost:8088/tags`)
        .then( res => res.json())
        .then( parsedRes => {
            tagCollection = parsedRes
        })
}

export const saveTags = tags => {
    tags.forEach(tagString => {
        getTags().then ( () => {
            const allTags = useTags()
            const foundTag = allTags.find(tag => tag.subject === tagString)
            if (!foundTag) {
                const newTag = {subject: tagString}
                return fetch("http://localhost:8088/tags", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newTag)
                    })
            }
        })
    })
}