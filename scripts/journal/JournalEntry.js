import { deleteJournalEntry } from "./JournalDataProvider.js"

const eventHub = document.querySelector('#container')

export const JournalEntryComponent = (entry, tags) => {

    const tagsHTML = tags.map(tag => `<p class="tagDisplay">${tag.subject}</p>`).join("")
    return `
        <article class="entry" id="entry--${entry.id}>
            <div class="entry__header">
                <h3 class="entry__concepts">${entry.concept}</h3>
                <div class="entry__header__right">
                    <h4 class="entry__mood">${entry.mood.emoji} ${entry.mood.label}</h4>
                    <h5 class="entry__date">${entry.date}</h5>
                    <h5 class="entry__instructor">${entry.instructor.first_name}
                </div>  <!-- entry__header -->
            </div> <!-- entry__header -->
            <p class="entry__text">${entry.entry}</p>
            <div class="tagsContainer">${tagsHTML}</div>
            <div class="entry__buttons">
                <button id="editButton--${entry.id}" class="button button-normal">Edit</button>
                <button id="deleteButton--${entry.id}" class="button button-warn">Delete</button>
            </div> <!-- entry__buttons -->
        </article> <!-- entry -->
        <div class="divider"></div>
        `
}

eventHub.addEventListener("click", e => {
  if (e.target.id.includes("deleteButton--")) {
      const [prefix, entryId] = e.target.id.split("--")
      const cE = new CustomEvent("deleteRequested", {
          detail: {
              entryId: entryId
          }
      })
      eventHub.dispatchEvent(cE)
  }  
})

eventHub.addEventListener("click", e => {
    if (e.target.id.includes("editButton--")) {
        const [x, entryId] = e.target.id.split("--")
        const cE = new CustomEvent("editRequested", {
            detail: {
                entryId: parseInt(entryId)
            }
        })
        eventHub.dispatchEvent(cE)
    }
})