const journal = [
    {
        id: 1,
        date: "07/24/2025",
        concept: "HTML & CSS",
        entry: "We talked about HTML components and how to make grid layouts with Flexbox in CSS.",
        mood: "Ok"
    },
    {
        id: 2,
        date: "07/24/2048",
        concept: "New Stuff",
        entry: "We talked about new stuff that I had never heard of before. Wild, right?",
        mood: "Excited"
    },
    {
        id: 3,
        date: "07/24/2049",
        concept: "C++++",
        entry: "We invented a convoluted new language no one will ever use.",
        mood: "Confused"
    },
]

export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate;
}