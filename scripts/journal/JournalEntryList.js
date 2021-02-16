import { getMoods } from '../moods/MoodProvider.js';
import { getEntryTags, useEntryTags } from '../tags/EntryTagsProvider.js';
import { getTags, useTags } from '../tags/TagProvider.js';
import { getJournalEntries, useJournalEntries } from './JournalDataProvider.js';
import { JournalEntryComponent } from './JournalEntry.js';

const entryLog = document.querySelector('.containerLeft__entries');
const eventHub = document.querySelector('#container')

export const EntryList = moodId => {
    getJournalEntries()
    .then(getMoods)
    .then(getTags)
    .then(getEntryTags)
        .then ( () => {
            const entries = useJournalEntries()
            const allTags = useTags()
            const entryTags = useEntryTags()
            let matchedEntries
            // debugger
            if (!moodId) {
                matchedEntries = [...entries]
            } else {
                matchedEntries = entries.filter(entry => entry.moodId === moodId)
            }
            entryLog.innerHTML = matchedEntries.map(entry => {
                const matchedRelationships = entryTags.filter(eT => eT.entryId === entry.id)
                const matchedTags = matchedRelationships.map(mR => {
                    const tagObject = allTags.find(tag => tag.id === mR.tagId)
                    return tagObject
                })

                return JournalEntryComponent(entry, matchedTags)
            }).join("");
        })
}

eventHub.addEventListener("journalStateChanged", e => {
    EntryList()
})

eventHub.addEventListener("moodFilterSelected", e => {
    EntryList(e.detail.moodId)
})