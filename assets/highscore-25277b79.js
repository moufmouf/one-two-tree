import"./modulepreload-polyfill-3cfb730f.js";console.log("Highscore / Script started successfully");const t=document.getElementById("highscore");if(t===null)throw new Error("Could not find all elements");WA.onInit().then(async()=>{console.log("Highscore / Scripting API ready"),await WA.players.configureTracking({players:!0,movement:!1}),r(),WA.players.onVariableChange("score").subscribe(r),WA.player.state.onVariableChange("score").subscribe(r)}).catch(s=>console.error(s));function r(){const o=Array.from([...WA.players.list(),WA.player]).filter(e=>typeof e.state.score=="number").sort((e,a)=>a.state.score-e.state.score).slice(0,3);t.innerHTML=`
        ${o.map(e=>`
            <tr>
                <td>${e.name}</td>
                <td>${e.state.score}</td>
            </tr>
        `).join("")}
    `}
