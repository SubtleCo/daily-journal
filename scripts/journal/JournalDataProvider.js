let journal = []

export const getJournalEntries = () => {
    return fetch("http://localhost:8088/entries")
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