import { getMoods, useMoods } from '../moods/MoodProvider.js'
import { getInstructors, useInstructors } from '../instructors/InstructorProvider.js'
import { getJournalEntry, saveJournalEntry } from './JournalDataProvider.js'

const targetElement = document.querySelector('.containerLeft__entryForm')
const eventHub = document.querySelector('#container')


export const JournalFormComponent = () => {
    getMoods()
    .then(getInstructors)
    .then(
        () => {
            const moods = useMoods()
            const instructors = useInstructors()
            const moodSelectHTML = moods.map(mood => `<option value="${mood.id}">${mood.emoji} ${mood.label}</option>`).join("")
            const instructorSelectHTML = instructors.map(instructor => `<option value="${instructor.id}">${instructor.first_name}</option>`).join("")
            const journalForm =  `
                <form class="containterLeft__entryForm" id="entryForm" action="">
                    <fieldset>
                        <input type="hidden" name="entryId" id="entryId">
                        <label for="journalDate">Date of Entry</label>
                        <input type="date" name="journalDate" id="journalDate" class="input-left">
                        <label for="mood">Mood</label>
                        <select name="mood" id="mood" form="entryForm" class="input-left">
                            <option value="0">Pick A Mood</option>
                            ${moodSelectHTML}
                            </select>
                        <label for="instructor">Instructor</label>
                        <select name="instructor" id="instructor" form="entryForm" class="input-left">
                            <option value="0">Pick An Instructor</option>
                            ${instructorSelectHTML}
                        </select>
                        <label for="concepts">Concepts Covered</label>
                        <input type="text" name="concepts" id="concepts" class="input-left" size="50">
                        <label for="tags">Tags</label>
                        <input type="text" name="tags" id="tags" class="input-left" size="50">
                        <label for="entryContent">Journal Entry</label>
                        <textarea name="entryContent" id="entryContent" cols="30" rows="10"></textarea>
                        <input id="entryForm__submit" type="submit" value="Record Jounral Entry" class="button">
                    </fieldset>
                </form>
            `
        
            targetElement.innerHTML = journalForm
        })
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
            moodId: parseInt(document.querySelector("#mood").value),
            instructorId: parseInt(document.querySelector("#instructor").value),
            id: parseInt(document.querySelector("#entryId").value)
        }
        scanForLanguage(document.querySelector("#concepts").value)
        scanForLanguage(document.querySelector("#entryContent").value)
        document.querySelector("#entryForm").reset()
        saveJournalEntry(newEntryObj)
    }
})

const scanForLanguage = (text) => {
    const re = /bad word/;
    if(re.test(text)) {
        alert("No bad words please!")
    }
}

//==================================Edit Handling====================================//
eventHub.addEventListener("editRequested", e => {
    const entryId = e.detail.entryId
    editEntry(entryId)
})

const editEntry = entryId => {
    const entry = getJournalEntry(entryId)
    document.querySelector("#entryId").value = entry.id
    document.querySelector("#journalDate").value = entry.date
    document.querySelector("#concepts").value = entry.concept
    document.querySelector("#entryContent").value = entry.entry
    document.querySelector("#mood").value = entry.moodId
    document.querySelector("#instructor").value = entry.instructorId
}
