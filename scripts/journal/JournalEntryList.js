import { useJournalEntries } from './JournalDataProvider.js';
import { JournalEntryComponent } from './JournalEntry.js';

const entryLog = document.querySelector('.containerLeft__entries');

export const EntryList = () => {
    const entries = useJournalEntries();

    entryLog.innerHTML += entries.map(entry => JournalEntryComponent(entry));
}