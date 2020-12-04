// Initialize game variables
let isIntro = true;
let isGameOver = false;
let scoreCount;
let frogTop;
let rockLeft;
let game = document.querySelector(".game");
let score = document.querySelector(".score");
const frog = document.createElement("div");
let imgArray = new Array("url(Images/Intro2.png)", "url(Images/Intro3.png)", "url(Images/Intro4.png)");

// Function to run the game
function runGame() {
	scoreCount = 0;
	score.innerHTML = "Score: " + scoreCount;
	
	// Create frog div and add to game div
	frog.classList.add("frog");
    game.appendChild(frog);
	
	// Event handler for space bar
	document.addEventListener("keydown", function(event) {
		if (event.keyCode == 32) {
			
			// Using the space bar to transition between screens during intro
			if (isIntro) {
				if (imgArray.length == 0) {
					// Begin game and add background divs
					game.removeChild(game.lastChild);
                    let hills = document.createElement('div');
                    hills.classList.add("hills");
		            game.appendChild(hills);
                    let grass = document.createElement('div');
                    grass.classList.add("grass");
		            game.appendChild(grass);
					game.style.backgroundImage = "url(Images/Cloud.gif)";
					game.appendChild(frog);
					isIntro = false;
					generateRocks();
					
				} else {
					game.style.backgroundImage = imgArray.shift();
				}
			
			// Using the space bar to restart the game
			} else if (isGameOver) {
				location.reload();		   
			}
			jump();
		}
	});
}

// Function to generate random rocks
function generateRocks() {
	if (!isGameOver) {
		
		// Generate a random interval between 1 and 2 seconds
		let randomTime = (Math.random() * (1 - 0.5) + 0.5) * 2000;

		// Create a new rock div and add to the game div
		let rock = document.createElement('div');
		rock.classList.add('rock');
		game.appendChild(rock);

		// Interval timer to generate multiple rocks
		let timer = setInterval(function() {
			if (!isIntro) {
				
				// Get current positions of frog and rock
				frogTop = parseInt(window.getComputedStyle(frog).getPropertyValue("top"));
				rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue("left"));

				// Detect collision
				if (rockLeft > 0 && rockLeft < 50 && frogTop >= 100) {
					clearInterval(timer);
					gameOver();
					return;
				} else if (rockLeft <= 5) {
					// Increment score
					scoreCount += 10;
					score.innerHTML = "Score:  " + scoreCount;
					rock.remove();
				}	

				// Win condition
				if (scoreCount >= 300) {
					clearInterval(timer);
					gameOver();
					return;
				}
			}
		}, 20)
		setTimeout(generateRocks, randomTime);
	}
}

// Function to make the frog jump
function jump() {
	if (!frog.classList.contains("jump")) {
		frog.classList.add("jump");
		setTimeout(function() {
			frog.classList.remove("jump");
		}, 500)
	}
}

// Function to reset the game
function gameOver() {
	
	// Remove all elements from the game div before resfreshing
	while(game.firstChild) {
		game.removeChild(game.lastChild);
	}
	
	isGameOver = true;
	
	if (scoreCount >= 300) {
		// Win condition
		game.style.backgroundImage = "url(Images/YouWin.png)";
	} else {
		// Lose condition
		game.style.backgroundImage = "url(Images/TryAgain.png)";
	}
}

runGame();