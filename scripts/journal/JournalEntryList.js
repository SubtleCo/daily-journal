import { getMoods } from '../moods/MoodProvider.js';
import { getJournalEntries, useJournalEntries } from './JournalDataProvider.js';
import { JournalEntryComponent } from './JournalEntry.js';

const entryLog = document.querySelector('.containerLeft__entries');
const eventHub = document.querySelector('#container')

export const EntryList = moodId => {
    getJournalEntries()
    .then(getMoods)
        .then ( () => {
            const entries = useJournalEntries();
            let matchedEntries
            if (!moodId) {
                matchedEntries = [...entries]
            } else {
                matchedEntries = entries.filter(entry => entry.moodId === moodId)
            }
            entryLog.innerHTML = matchedEntries.map(entry => JournalEntryComponent(entry)).join("");
        })
}

eventHub.addEventListener("journalStateChanged", e => {
    EntryList()
})

eventHub.addEventListener("moodFilterSelected", e => {
    EntryList(e.detail.moodId)
})