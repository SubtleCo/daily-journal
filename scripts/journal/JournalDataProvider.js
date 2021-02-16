import { useTags, getTags } from "../tags/TagProvider.js"

const eventHub = document.querySelector('#container')

export const dispatchStateChangeEvent = () => {
    eventHub.dispatchEvent(new CustomEvent("journalStateChanged"))
}

let journal = []

export const getJournalEntries = () => {
    return fetch("http://localhost:8088/entries?_expand=mood&_expand=instructor")
            .then( res => res.json())
            .then( entries => journal = entries)
}

export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate;
}

export const getJournalEntry = entryId => {
    const allEntries = useJournalEntries()
    return allEntries.find(entry => entry.id === entryId)
}


export const saveJournalEntry = (entryObj, tags) => {
    if (entryObj.id === "") {
        return fetch("http://localhost:8088/entries", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryObj)
        })
            .then( res => res.json())
            .then( parsedResponse => {
                const newPostId = parsedResponse.id
                getJournalEntries()
                return newPostId
            })
            .then(newEntryId => {
                assignTags(newEntryId, tags)
            })
            .then(dispatchStateChangeEvent)
    } else {
        return fetch(`http://localhost:8088/entries/${entryObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryObj)
        })
            .then( () => getJournalEntries())
            .then(dispatchStateChangeEvent)

    }
}

export const assignTags = (entryId, tagStrings) => {
    getTags().then( () => {
        const allTags = useTags()
        const tagObjs = tagStrings.map(tS => {
            return allTags.find( tag => tag.subject === tS )
        })
        tagObjs.forEach( tag => {
            const tagEntryObject = {
                tagId: tag.id,
                entryId: entryId
            }
            return fetch(`http://localhost:8088/entryTags`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tagEntryObject)
            })
        })
    })
}

export const deleteJournalEntry = entryId => {
    return fetch(`http://localhost:8088/entries/${entryId}`, {
        method: "DELETE"
    })
    .then(dispatchStateChangeEvent)
}

eventHub.addEventListener("deleteRequested", e => {
    const entryId = e.detail.entryId
    deleteJournalEntry(entryId)
})