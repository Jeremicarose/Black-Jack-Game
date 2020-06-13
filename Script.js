
document.querySelector('#hitButton').addEventListener('click', blackjackHit);
document.querySelector('#standButton').addEventListener('click', blackjackStand);
document.querySelector('#dealButton').addEventListener('click', blackjackDeal);


let blackJack = {
    'you': { 'scorespan': '#your-results', 'div': '#your-box', 'score': 0 },
    'deal': { 'scorespan': '#deal-results', 'div': '#deal-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A'],
    'CardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A': 1 },
    'wins': 0,
    'draws': 0,
    'losses': 0,
    'stand': false,
    'turnOver': false,
}
const YOU = blackJack['you'];
const DEAL = blackJack['deal'];
const hitSound = new Audio('interval.mp3');
const hitSound2 = new Audio('win.mp3');
const hitSound3 = new Audio('lose.mp3');
const hitSound4 = new Audio('draw.mp3');
const hitSound5 = new Audio('click.mp3')
const hitSound6 = new Audio('Slime_J_x_Mink_Flow_ft_f_right_-_Broken_Heart_(official_audio)(128k).mp3')


function blackjackHit() {
    if (blackJack['stand'] === false) {
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        hitSound5.play();
    }
}
function randomCard() {
    let indexCard = Math.floor(Math.random() * 13);
    return blackJack['cards'][indexCard];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
        
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
  async function blackjackStand() {
    blackJack['stand'] = true;
    while (DEAL['score'] < 16 && blackJack['stand'] === true) {

        let card = randomCard();
        showCard(card, DEAL);
        updateScore(card, DEAL);
        showScore(DEAL);
        await sleep(1000)
        hitSound5.play();
        
    }

    blackJack['turnOver'] = true
    showResult(computrWinner());

}
function blackjackDeal() {
    if (blackJack['turnOver'] === true) {
        blackJack['stand'] = false;

        let yourImage = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImage = document.querySelector('#deal-box').querySelectorAll('img');

        for (let i = 0; i < yourImage.length; i++) {
            yourImage[i].remove();
        }
        for (let i = 0; i < dealerImage.length; i++) {
            dealerImage[i].remove();
        }


        YOU['score'] = 0;
        DEAL['score'] = 0;

        document.querySelector('#your-results').textContent = 0;
        document.querySelector("#deal-results").textContent = 0;
        console.log(document.querySelector('#your-results').textContent = 0);


        document.querySelector('#your-results').style.color = 'white';
        document.querySelector('#deal-results').style.color = 'white';
        document.querySelector('#blackjack-result').textContent = 'Lets Play';
        document.querySelector('#blackjack-result').style.color = 'black';
        blackJack['turnOver'] = true;
        hitSound5.play();
    }
}

function updateScore(card, activePlayer) {

    activePlayer['score'] += blackJack['CardsMap'][card];

}
function showScore(activePlayer) {
    console.log(activePlayer['score']);
    
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scorespan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scorespan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    }
}
function computrWinner() {
    let winner;
    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEAL['score'] || DEAL['score'] > 21) {
            blackJack['wins']++;
            winner = YOU;
        }
        else if (YOU['score'] < DEAL['score']) {
            blackJack['losses']++;
            winner = DEAL;
        }
        else if (YOU['score'] === DEAL['score']) {
            blackJack['draws']++;
        }
    } else if (YOU['score'] > 21 && DEAL['score'] <= 21) {
        blackJack['losses']++;
        winner = DEAL;
    }
    else if (YOU['score'] > 21 && DEAL['score'] > 21) {
        blackJack['draws']++;

    }
   
    return winner;
}
function showResult(winner) {
    let message, messageColor;
    if (blackJack['turnOver'] === true) {
        if (winner === YOU) {
            document.querySelector('#win').textContent = blackJack['wins'];
            message = 'You won'
            messageColor = 'blue'
            hitSound2.play();
        }
        else if (winner === DEAL) {
            document.querySelector('#loses').textContent = blackJack['losses'];
            message = 'You lost'
            messageColor = 'red'
            hitSound3.play();
        } else {
            document.querySelector('#draw').textContent = blackJack['draws'];
            message = 'You Drew'
            messageColor = 'green'
            hitSound4.play();

        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}