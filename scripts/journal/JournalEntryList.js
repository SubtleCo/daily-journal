import { useJournalEntries } from './JournalDataProvider.js';
import { JournalEntryComponent } from './JournalEntry.js';

const entryLog = document.querySelector('.containerLeft__entries');

export const EntryList = () => {
    const entries = useJournalEntries();

    let entryHTML = "";
    for (const entry of entries) {
        entryHTML += JournalEntryComponent(entry);
    }

    entryLog.innerHTML += entryHTML;
}