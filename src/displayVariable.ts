/// <reference types="@workadventure/iframe-api-typings" />

console.log('Timer / Script started successfully');

const text = document.getElementById('text') as HTMLDivElement;

if (text === null) {
    throw new Error('Could not find all elements');
}

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Display variable / Scripting API ready');

    const searchParams = new URLSearchParams(window.location.search);
    const variableName = searchParams.get('variable');

    if (variableName === null) {
        throw new Error('No variable defined');
    }

    const variableValue = WA.state[variableName];

    text.innerText = variableValue as string ?? '';

    WA.state.onVariableChange(variableName).subscribe((newValue) => {
        text.innerText = newValue as string ?? '';
    });

}).catch(e => console.error(e));

export {};
