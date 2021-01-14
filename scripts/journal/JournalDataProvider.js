const journal = [
    {
        id: 1,
        date: "07/24/2025",
        concept: "HTML & CSS",
        entry: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit consequat justo non volutpat. Duis maximus mi posuere felis aliquet, id aliquam libero suscipit. Mauris sed facilisis sapien. Vestibulum molestie odio quis tortor congue vehicula. Sed fermentum lorem et augue aliquet, vel sagittis sem consequat. Nam gravida et dui ut tempor. Donec varius nisl eget malesuada facilisis.",
        mood: "Ok"
    },
    {
        id: 2,
        date: "07/24/2048",
        concept: "New Stuff",
        entry: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit consequat justo non volutpat. Duis maximus mi posuere felis aliquet, id aliquam libero suscipit. Mauris sed facilisis sapien. Vestibulum molestie odio quis tortor congue vehicula. Sed fermentum lorem et augue aliquet, vel sagittis sem consequat. Nam gravida et dui ut tempor. Donec varius nisl eget malesuada facilisis.",
        mood: "Excited"
    },
    {
        id: 3,
        date: "07/24/2049",
        concept: "C++++",
        entry: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit consequat justo non volutpat. Duis maximus mi posuere felis aliquet, id aliquam libero suscipit. Mauris sed facilisis sapien. Vestibulum molestie odio quis tortor congue vehicula. Sed fermentum lorem et augue aliquet, vel sagittis sem consequat. Nam gravida et dui ut tempor. Donec varius nisl eget malesuada facilisis.",
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