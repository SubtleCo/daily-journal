import { getMoods, useMoods } from "./MoodProvider.js"

const targetElement = document.querySelector('.moodFilter')
const eventHub = document.querySelector('#container')

export const MoodFilter = () => {
    getMoods()
        .then(
            () => {
                const allMoods = useMoods()
                const moodRadioHTML = allMoods.map(mood => {
                    return `
                    <label for="moodRadio--${mood.id}">${mood.emoji}</label>
                    <input class="moodRadio" id="moodRadio--${mood.id}" value="${mood.id}" type="radio" name="moodFilterRadios">`
                }).join("")

                targetElement.innerHTML = `
                <fieldset>
                    <legend>Filter By Mood</legend>
                    ${moodRadioHTML}
                </fieldset>`
            }
        )
        }

eventHub.addEventListener("click", e => {
    if (e.target.id.includes("moodRadio--")) {
        const cE = new CustomEvent("moodFilterSelected", {
            detail: {
                moodId: parseInt(e.target.value)
            }
        })
        eventHub.dispatchEvent(cE)
    }
})