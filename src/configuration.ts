/// <reference types="@workadventure/iframe-api-typings" />

console.log('Configuration / Script started successfully');

const question = document.getElementById('question') as HTMLTextAreaElement;
const answer1 = document.getElementById('answer1') as HTMLInputElement;
const answer2 = document.getElementById('answer2') as HTMLInputElement;
const answer3 = document.getElementById('answer3') as HTMLInputElement;
const correctAnswer = document.getElementById('correctAnswer') as HTMLSelectElement;
const submit = document.getElementById('submit') as HTMLButtonElement;

if (question === null || answer1 === null || answer2 === null || answer3 === null || correctAnswer === null || submit === null) {
    throw new Error('Could not find all elements');
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Configuration / Scripting API ready');

    submit.addEventListener('click', () => {
        WA.state.question = question.value;
        WA.state.answer1 = answer1.value;
        WA.state.answer2 = answer2.value;
        WA.state.answer3 = answer3.value;
        WA.state.correctAnswer = correctAnswer.value;
        WA.state.timer = new Date().getTime() + 10_000;
    });


}).catch(e => console.error(e));

export {};
