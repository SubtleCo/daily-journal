import { saveJournalEntry } from './JournalDataProvider.js'

const targetElement = document.querySelector('.containerLeft__entryForm')
const eventHub = document.querySelector('#container')

export const JournalFormComponent = () => {

    const journalForm =  `
        <form class="containterLeft__entryForm" id="entryForm" action="">
            <fieldset>
                <label for="journalDate">Date of Entry</label>
                <input type="date" name="journalDate" id="journalDate" class="input-left">
                <label for="mood">Mood</label>
                <select name="mood" id="mood" form="entryForm" class="input-left">
                    <option value="mind-blown">🤯 Mind Blown</option>
                    <option value="excited">😃 Excited</option>
                    <option value="happy">🙂 Happy as a clam</option>
                    <option value="neutral">😐 OK with things</option>
                    <option value="sad">😞 Sad about it</option>
                    <option value="confused">🤨 Confused...</option>
                    <option value="frustrated">😣 Frustrated</option>
                    <option value="angry">🤬 Mad!</option>
                    <option value="tired">🥱 Tired</option>
                    <option value="nervous">😬 Nervous...</option>
                </select>
                <label for="concepts">Concepts Covered</label>
                <input type="text" name="concepts" id="concepts" class="input-left" size="50">
                <label for="entryContent">Journal Entry</label>
                <textarea name="entryContent" id="entryContent" cols="30" rows="10"></textarea>
                <input id="entryForm__submit" type="submit" value="Record Jounral Entry" class="button">
            </fieldset>
        </form>
    `

    targetElement.innerHTML = journalForm
}

eventHub.addEventListener("input", e => {
    if (e.target.id === "concepts") {
        const entryLength = document.querySelector("#concepts").value.length
        if (entryLength > 25) {
            alert("Dude, that's too many characters.")
        }
    }
})

eventHub.addEventListener("click", e => {
    if (e.target.id === "entryForm__submit") {
        e.preventDefault()
        const newEntryObj = {
            date: document.querySelector("#journalDate").value,
            concept: document.querySelector("#concepts").value,
            entry: document.querySelector("#entryContent").value,
            mood: document.querySelector("#mood").value,
        }
        document.querySelector("#entryForm").reset()
        saveJournalEntry(newEntryObj)
    }
})