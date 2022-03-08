const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// we are taking the score object and returning back a string version of a <li> 

highScoresList.innerHTML = 
    highScores
        .map(score => {
            return `<li class="high-score">${score.name} - ${score.score}</li>`;
        })
        .join("");