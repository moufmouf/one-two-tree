/// <reference types="@workadventure/iframe-api-typings" />

console.log('Highscore / Script started successfully');

const highscore = document.getElementById('highscore') as HTMLTableElement;

if (highscore === null) {
    throw new Error('Could not find all elements');
}

// Waiting for the API to be ready
WA.onInit().then(async () => {
    console.log('Highscore / Scripting API ready');

    await WA.players.configureTracking({
        players: true,
        movement: false,
    });

    displayTopPlayers();

    WA.players.onVariableChange('score').subscribe(displayTopPlayers);
    WA.player.state.onVariableChange('score').subscribe(displayTopPlayers);

}).catch(e => console.error(e));

function displayTopPlayers() {
    const players = Array.from([...WA.players.list(), WA.player]);
    const sortedPlayers = players.
        filter(player => typeof player.state.score === 'number').
        sort((a, b) => {
            return (b.state.score as number) - (a.state.score as number);
        }).
        slice(0, 3);

    highscore.innerHTML = `
        ${sortedPlayers.map(player => `
            <tr>
                <td>${player.name}</td>
                <td>${player.state.score}</td>
            </tr>
        `).join('')}
    `;
}

export {};
