export const JournalEntryComponent = (entry) => {
    return `
        <article class="entry">
            <div class="entry__header">
                <h3 class="entry__concepts">${entry.concept}</h3>
                <div class="entry__header__right">
                    <h4 class="entry__mood">${entry.mood}</h4>
                    <h5 class="entry__date">${entry.date}</h5>
                </div>  <!-- entry__header -->
            </div> <!-- entry__header -->
            <p class="entry__text">${entry.entry}</p>
            <div class="entry__buttons">
                <button class="button button-normal">Edit</button>
                <button class="button button-warn">Delete</button>
            </div> <!-- entry__buttons -->
        </article> <!-- entry -->
        `
}
