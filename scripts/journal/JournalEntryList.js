import { getJournalEntries, useJournalEntries } from './JournalDataProvider.js';
import { JournalEntryComponent } from './JournalEntry.js';

const entryLog = document.querySelector('.containerLeft__entries');

export const EntryList = () => {
    getJournalEntries()
        .then ( () => {
            const entries = useJournalEntries();
            entryLog.innerHTML += entries.map(entry => JournalEntryComponent(entry)).join("");
        })
}

