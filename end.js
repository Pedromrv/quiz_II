const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');

const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

// things in localStorage are stored as strings
// so we need convert the results array into a JSON string
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// console.log(highScores);
// console.log(JSON.parse(localStorage.getItem("highScores")));

// show final result
finalScore.innerText = `Resultado final: ${mostRecentScore}`;

// disable save socre button unless we have a username value
username.addEventListener('keyup', () =>{
    // console.log(username.value);
    saveScoreBtn.disabled = !username.value;
});
saveHighScore = (e) => {
    // console.log("clicked the save button!");
    e.preventDefault();

    // we create a score object to reference the recent score and a username
    // test the scores 
    const score = {
        score: mostRecentScore,
        name: username.value
    };
    //add the high score
    highScores.push(score);

    // sort from highest to lowest
    // two ways to write it
    // highScores.sort( (a,b) => {
    //     return b.score - a.score;
    // });
    highScores.sort( (a,b) => b.score - a.score);

    // obtain the first 5
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/");
    // console.log(highScores);
};