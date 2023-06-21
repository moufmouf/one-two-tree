/// <reference types="@workadventure/iframe-api-typings" />

console.log('Timer / Script started successfully');

const timer = document.getElementById('timer') as HTMLDivElement;
const question = document.getElementById('question') as HTMLDivElement;

if (timer === null || question === null) {
    throw new Error('Could not find all elements');
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Timer / Scripting API ready');

    const timerValue = WA.state.timer;

    let interval;
    const numberFormat = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });

    interval = setInterval(() => {
        const remainingTime = timerValue - new Date().getTime();
        if (remainingTime <= 0) {
            clearInterval(interval);
            timer.innerText = '⌛ 0.0';
            return;
        }
        timer.innerText = `⏳ ${numberFormat.format(remainingTime / 1000)}`;
    }, 100);

    question.innerText = WA.state.question as string ?? 'No question defined';

}).catch(e => console.error(e));

export {};
