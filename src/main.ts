/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";
import {UIWebsite} from "@workadventure/iframe-api-typings/front/Api/Iframe/Ui/UIWebsite";

console.log('Script started successfully');

const music = WA.sound.loadSound("NewsJingle.mp3");
let currentZone: number|undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

    WA.state.onVariableChange('timer').subscribe((newValue) => {
        console.log('timer changed to ', newValue);
        displayTimerWindow();
    });

    WA.room.onEnterLayer('zones_delimiter/zone1').subscribe(() => {
        currentZone = 1;
    });

    WA.room.onEnterLayer('zones_delimiter/zone2').subscribe(() => {
        currentZone = 2;
    });

    WA.room.onEnterLayer('zones_delimiter/zone3').subscribe(() => {
        currentZone = 3;
    });

    WA.room.onLeaveLayer('zones_delimiter/zone1').subscribe(() => {
        currentZone = undefined;
    });

    WA.room.onLeaveLayer('zones_delimiter/zone2').subscribe(() => {
        currentZone = undefined;
    });

    WA.room.onLeaveLayer('zones_delimiter/zone3').subscribe(() => {
        currentZone = undefined;
    });

}).catch(e => console.error(e));

let timerWindow: UIWebsite|undefined;

async function displayTimerWindow() {
    if (timerWindow !== undefined) {
        return;
    }
    const timerUrl = new URL("./timer.html", WA.room.mapURL).toString();
    timerWindow = await WA.ui.website.open({
        url: timerUrl,
        allowApi: true,
        position: {
            horizontal: "middle",
            vertical: "top",
        },
        margin: {
            top: "12vh",
            left: "25vw",
        },
        size: {
            width: "50vw",
            height: "20vh",
        }
    });
    triggerBlinking(1);
    triggerBlinking(2);
    triggerBlinking(3);
    music.play({
        loop: false,
    });
    setTimeout(() => {
        stopBlinking(1);
        stopBlinking(2);
        stopBlinking(3);
        setTimeout(() => {
            triggerBlinking(WA.state.correctAnswer as number);
            if (WA.state.correctAnswer == currentZone) {
                WA.player.setOutlineColor(0, 255, 0);
                if (typeof WA.player.state.score === 'number') {
                    WA.player.state.saveVariable('score', WA.player.state.score + 1, {
                        scope: 'room',
                        persist: false,
                        public: true,
                    });
                } else {
                    WA.player.state.saveVariable('score',  1, {
                        scope: 'room',
                        persist: false,
                        public: true,
                    });
                }
            } else if (currentZone !== undefined) {
                WA.player.setOutlineColor(255, 0, 0);
                if (typeof WA.player.state.score !== 'number') {
                    WA.player.state.saveVariable('score',  0, {
                        scope: 'room',
                        persist: false,
                        public: true,
                    });
                }
            }
            setTimeout(() => {
                stopBlinking(WA.state.correctAnswer as number);
                timerWindow?.close();
                timerWindow = undefined;
                WA.state.answer1 = '';
                WA.state.answer2 = '';
                WA.state.answer3 = '';
                WA.player.removeOutlineColor();
            }, 10_000);
        }, 1_000);

    }, 10_000);
}

function triggerBlinking(zoneNumber: number) {
    WA.room.showLayer(`zones/zone${zoneNumber}_bright`);
    WA.room.hideLayer(`zones/zone${zoneNumber}`);
}

function stopBlinking(zoneNumber: number) {
    WA.room.hideLayer(`zones/zone${zoneNumber}_bright`);
    WA.room.showLayer(`zones/zone${zoneNumber}`);
}

export {};
