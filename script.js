 // Enhanced Game State with All New Features
        let gameState = {
            // Previous state variables
            currentScore: 0,
            rollsCount: 0,
            winsCount: 0,
            targetScore: 25,
            attemptsLeft: 4,
            maxAttempts: 4,
            gameActive: true,
            winStreak: 0,
            lastRollSum: 0,
            soundEnabled: true,
            challengeActive: false,
            challengeCooldown: 0,
            darkMode: false,
            currentSkin: 'default',
            comboMultiplier: 1,
            lastRollValues: [],
            gameMode: 'solo',
            computerScore: 0,
            playerTurn: true,
            dailyChallengeCompleted: false,
            
            // New State Variables for Enhanced Features
            // Progression System
            playerLevel: 1,
            playerXP: 0,
            nextLevelXP: 100,
            unlockedAbilities: [],
            skillTree: {},
            
            // Multiplayer
            multiplayerActive: false,
            roomCode: null,
            players: [],
            chatMessages: [],
            currentRoom: null,
            
            // Statistics
            totalGames: 0,
            totalWins: 0,
            totalRolls: 0,
            rollFrequency: {},
            sessionHistory: [],
            bestStreak: 0,
            
            // Game Modes
            bossHealth: 100,
            timeAttackTime: 60,
            puzzleTarget: 0,
            tournamentRound: 1,
            
            // Tutorial
            tutorialCompleted: false,
            currentTutorialStep: 0,
            
            // Accessibility
            highContrast: false,
            largeText: false,
            reducedMotion: false,
            colorblindMode: false,
            
            // Seasonal Content
            seasonalEvent: null,
            holidaySkins: [],
            limitedTimeModes: []
        };

        // Achievement tracking
        const achievements = {
            firstRoll: false,
            highRoller: false,
            perfectRoll: false,
            luckySeven: false,
            hardWinner: false,
            speedRunner: false,
            comboMaster: false,
            skinCollector: false,
            dailyChampion: false,
            bossSlayer: false,
            puzzleMaster: false
        };

        // Dice skins
        const diceSkins = {
            'default': { name: 'Classic', unlocked: true },
            'neon': { name: 'Neon Pink', unlocked: false, requirement: 'Win 5 games' },
            'ocean': { name: 'Ocean Blue', unlocked: false, requirement: 'Get a streak of 3' },
            'forest': { name: 'Forest Green', unlocked: false, requirement: 'Roll a perfect match' },
            'royal': { name: 'Royal Purple', unlocked: false, requirement: 'Win 10 games total' }
        };

        // Daily challenge
        const dailyChallenge = {
            target: 21,
            dice: 3,
            attempts: 3,
            completed: false
        };

        // Leaderboard
        let leaderboard = [];
        
        // Achievement queue
        let achievementQueue = [];
        let isShowingAchievement = false;
        
        // DOM elements
        const diceResult = document.getElementById('diceResult');
        const diceContainer = document.getElementById('diceContainer');
        const targetScoreElement = document.getElementById('targetScore');
        const attemptsLeftElement = document.getElementById('attemptsLeft');
        const winsCountElement = document.getElementById('winsCount');
        const streakCountElement = document.getElementById('streakCount');
        const challengeStatusElement = document.getElementById('challengeStatus');
        const comboStatusElement = document.getElementById('comboStatus');
        const gameModeSelect = document.getElementById('gameMode');
        const rollButton = document.getElementById('rollButton');
        const resetButton = document.getElementById('resetButton');
        const challengeButton = document.getElementById('challengeButton');
        const achievementElement = document.getElementById('achievement');
        const achievementText = document.getElementById('achievementText');
        const rollHistory = document.getElementById('rollHistory');
        const leaderboardModal = document.getElementById('leaderboardModal');
        const leaderboardList = document.getElementById('leaderboardList');
        const skinsModal = document.getElementById('skinsModal');
        const skinGrid = document.getElementById('skinGrid');
        const statsModal = document.getElementById('statsModal');
        const tutorialOverlay = document.getElementById('tutorialOverlay');
        const tutorialContent = document.getElementById('tutorialContent');
        const tutorialStep = document.getElementById('tutorialStep');
        const accessibilityPanel = document.getElementById('accessibilityPanel');
        const multiplayerPanel = document.getElementById('multiplayerPanel');
        const roomCodeElement = document.getElementById('roomCode');
        const playerList = document.getElementById('playerList');
        const chatContainer = document.getElementById('chatContainer');
        const chatInput = document.getElementById('chatInput');
        const sendChatButton = document.getElementById('sendChat');
        const copyRoomCodeButton = document.getElementById('copyRoomCode');
        const glowOrb1 = document.getElementById('glowOrb1');
        const glowOrb2 = document.getElementById('glowOrb2');
        const glowOrb3 = document.getElementById('glowOrb3');
        const difficultySelect = document.getElementById('difficulty');
        
        // Hamburger menu elements
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const menuClose = document.getElementById('menuClose');
        const menuSound = document.getElementById('menuSound');
        const menuDarkMode = document.getElementById('menuDarkMode');
        const menuSkins = document.getElementById('menuSkins');
        const menuLeaderboard = document.getElementById('menuLeaderboard');
        const menuStats = document.getElementById('menuStats');
        const menuTutorial = document.getElementById('menuTutorial');
        const menuAccessibility = document.getElementById('menuAccessibility');

        // Initialize hamburger menu
        function initHamburgerMenu() {
            // Toggle menu
            hamburgerMenu.addEventListener('click', function() {
                this.classList.toggle('active');
                menuOverlay.classList.toggle('active');
            });
            
            // Close menu
            menuClose.addEventListener('click', function() {
                hamburgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
            
            // Menu item click handlers
            menuSound.addEventListener('click', function() {
                toggleSound();
                updateMenuSoundText();
                hamburgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
            
            menuDarkMode.addEventListener('click', function() {
                toggleDarkMode();
                hamburgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
            
            menuSkins.addEventListener('click', function() {
                showModal('skinsModal');
                hamburgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
            
            menuLeaderboard.addEventListener('click', function() {
                showModal('leaderboardModal');
                hamburgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
            
            menuStats.addEventListener('click', function() {
                showModal('statsModal');
                hamburgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
            
            menuTutorial.addEventListener('click', function() {
                showTutorial();
                hamburgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
            
            menuAccessibility.addEventListener('click', function() {
                toggleAccessibilityPanel();
                hamburgerMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
            
            // Update menu text based on current state
            updateMenuSoundText();
        }

        // Update menu sound text
        function updateMenuSoundText() {
            menuSound.querySelector('.menu-text').textContent = 
                `Sound: ${gameState.soundEnabled ? 'On' : 'Off'}`;
        }

        // Audio context for sound effects
        let audioContext;
        
        // Initialize all features
        function initializeAllFeatures() {
            initGame();
            initHamburgerMenu();
            initializeMultiplayer();
            initializeProgressionSystem();
            initializeGameModes();
            initializeEnhancedVisuals();
            initializeStatistics();
            initializeTutorial();
            initializeAccessibility();
            initializeSeasonalContent();
            
            // Set up tutorial navigation
            document.getElementById('nextTutorial').addEventListener('click', nextTutorialStep);
            document.getElementById('prevTutorial').addEventListener('click', prevTutorialStep);
            document.getElementById('skipTutorial').addEventListener('click', finishTutorial);
        }

        // 1. MULTIPLAYER MODE
        function initializeMultiplayer() {
            // Event listeners for multiplayer
            copyRoomCodeButton.addEventListener('click', copyRoomCode);
            sendChatButton.addEventListener('click', sendChatMessage);
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') sendChatMessage();
            });
        }

        function createMultiplayerRoom() {
            // Generate a random room code
            gameState.roomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
            gameState.multiplayerActive = true;
            gameState.players = [{ id: 'player1', name: 'You', score: 0, isHost: true }];
            
            // Update UI
            roomCodeElement.textContent = gameState.roomCode;
            multiplayerPanel.style.display = 'block';
            updatePlayerList();
            
            // Simulate other players joining
            setTimeout(() => {
                if (gameState.players.length < 4) {
                    gameState.players.push({ 
                        id: 'player2', 
                        name: 'Player2', 
                        score: 0, 
                        isHost: false 
                    });
                    updatePlayerList();
                    addChatMessage('System', 'Player2 joined the room');
                }
            }, 2000);
        }

        function updatePlayerList() {
            playerList.innerHTML = '';
            
            gameState.players.forEach(player => {
                const li = document.createElement('li');
                li.className = `player-item ${player.id === 'player1' ? 'player-you' : ''}`;
                li.innerHTML = `
                    <span>${player.name} ${player.isHost ? '👑' : ''}</span>
                    <span>Score: ${player.score}</span>
                `;
                playerList.appendChild(li);
            });
        }

        function copyRoomCode() {
            navigator.clipboard.writeText(gameState.roomCode)
                .then(() => {
                    showFloatingText('Room code copied!', roomCodeElement);
                })
                .catch(err => {
                    console.error('Failed to copy room code: ', err);
                });
        }

        function sendChatMessage() {
            const message = chatInput.value.trim();
            
            if (message) {
                addChatMessage('You', message);
                chatInput.value = '';
                
                // Simulate response
                setTimeout(() => {
                    const responses = [
                        "Nice roll!",
                        "Good game everyone!",
                        "I almost had it that time",
                        "Let's play another round"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    addChatMessage('Player2', randomResponse);
                }, 1000 + Math.random() * 2000);
            }
        }

        function addChatMessage(sender, message) {
            gameState.chatMessages.push({ sender, message, timestamp: new Date() });
            
            const messageElement = document.createElement('div');
            messageElement.className = 'chat-message';
            messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
            
            chatContainer.appendChild(messageElement);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            
            // Limit chat history
            if (gameState.chatMessages.length > 50) {
                gameState.chatMessages.shift();
                if (chatContainer.children.length > 50) {
                    chatContainer.removeChild(chatContainer.firstChild);
                }
            }
        }

        // 2. PROGRESSION & LEVEL SYSTEM
        function initializeProgressionSystem() {
            // Load progression data from localStorage
            const savedProgression = localStorage.getItem('diceGameProgression');
            if (savedProgression) {
                const progression = JSON.parse(savedProgression);
                gameState.playerLevel = progression.level || 1;
                gameState.playerXP = progression.xp || 0;
                gameState.nextLevelXP = calculateNextLevelXP(gameState.playerLevel);
                gameState.unlockedAbilities = progression.unlockedAbilities || [];
            }
            
            // Update UI
            updateProgressionUI();
        }

        function calculateNextLevelXP(level) {
            return Math.floor(100 * Math.pow(1.5, level - 1));
        }

        function addXP(amount) {
            gameState.playerXP += amount;
            
            // Check for level up
            while (gameState.playerXP >= gameState.nextLevelXP) {
                gameState.playerXP -= gameState.nextLevelXP;
                gameState.playerLevel++;
                gameState.nextLevelXP = calculateNextLevelXP(gameState.playerLevel);
                
                // Level up effects
                levelUpEffects(gameState.playerLevel);
            }
            
            updateProgressionUI();
            saveProgressionData();
        }

        function levelUpEffects(level) {
            // Show level up notification
            queueAchievement(`Level Up! Reached Level ${level}`);
            
            // Unlock new abilities based on level
            const abilitiesToUnlock = {
                2: "Double Roll Chance",
                5: "Reroll Ability",
                10: "Lucky Number Boost"
            };
            
            if (abilitiesToUnlock[level]) {
                gameState.unlockedAbilities.push(abilitiesToUnlock[level]);
                queueAchievement(`Unlocked: ${abilitiesToUnlock[level]}`);
            }
            
            // Visual effects
            createLevelUpConfetti();
        }

        function updateProgressionUI() {
            const xpPercentage = (gameState.playerXP / gameState.nextLevelXP) * 100;
            document.getElementById('xpBar').style.width = `${xpPercentage}%`;
            document.getElementById('currentXP').textContent = gameState.playerXP;
            document.getElementById('nextLevelXP').textContent = gameState.nextLevelXP;
            
            // Update level display
            const levelValueElement = document.querySelector('#progressionContainer .info-value');
            if (levelValueElement) {
                levelValueElement.innerHTML = `${gameState.playerLevel} <span class="level-badge">${getLevelTitle(gameState.playerLevel)}</span>`;
            }
        }

        function getLevelTitle(level) {
            if (level < 5) return "Novice";
            if (level < 10) return "Apprentice";
            if (level < 15) return "Adept";
            if (level < 20) return "Expert";
            return "Master";
        }

        function saveProgressionData() {
            const progressionData = {
                level: gameState.playerLevel,
                xp: gameState.playerXP,
                unlockedAbilities: gameState.unlockedAbilities
            };
            localStorage.setItem('diceGameProgression', JSON.stringify(progressionData));
        }

        function createLevelUpConfetti() {
            createConfetti();
            screenShake(10, 0.5);
        }

        // 3. THEMED GAME MODES
        function initializeGameModes() {
            // Add event listener for game mode changes
            gameModeSelect.addEventListener('change', function() {
                gameState.gameMode = this.value;
                setupGameMode(this.value);
            });
        }

        function setupGameMode(mode) {
            resetGame();
            
            switch(mode) {
                case 'boss':
                    setupBossBattle();
                    break;
                case 'timeAttack':
                    setupTimeAttack();
                    break;
                case 'puzzle':
                    setupPuzzleMode();
                    break;
                case 'tournament':
                    setupTournamentMode();
                    break;
                case 'multiplayer':
                    createMultiplayerRoom();
                    break;
                case 'daily':
                    setupDailyChallenge();
                    break;
                default:
                    // Standard setup
                    break;
            }
        }

        function setupBossBattle() {
            gameState.bossHealth = 100;
            gameState.targetScore = 30; // Higher target for boss battle
            
            // Add boss health bar to UI
            const bossHealthHTML = `
                <div class="info-box">
                    <div class="info-label">Boss Health</div>
                    <div class="boss-health">
                        <div class="health-bar" id="bossHealthBar" style="width: 100%"></div>
                    </div>
                </div>
            `;
            document.querySelector('.game-info').insertAdjacentHTML('beforeend', bossHealthHTML);
            
            diceResult.textContent = "Defeat the Boss! Roll high to deal damage!";
        }

        function setupTimeAttack() {
            gameState.timeAttackTime = 60;
            gameState.targetScore = 0; // Score as high as possible
            
            // Add timer to UI
            const timerHTML = `
                <div class="info-box">
                    <div class="info-label">Time Left</div>
                    <div class="timer" id="timeAttackTimer">60s</div>
                </div>
            `;
            document.querySelector('.game-info').insertAdjacentHTML('beforeend', timerHTML);
            
            // Start the timer
            startTimeAttack();
            
            diceResult.textContent = "Score as high as possible in 60 seconds!";
        }

        function startTimeAttack() {
            const timerElement = document.getElementById('timeAttackTimer');
            const timerInterval = setInterval(() => {
                gameState.timeAttackTime--;
                timerElement.textContent = `${gameState.timeAttackTime}s`;
                
                if (gameState.timeAttackTime <= 0) {
                    clearInterval(timerInterval);
                    endTimeAttack();
                }
            }, 1000);
        }

        function endTimeAttack() {
            gameState.gameActive = false;
            rollButton.disabled = true;
            diceResult.textContent = `Time's up! Your final score: ${gameState.currentScore}`;
            
            // Award XP based on score
            const xpEarned = Math.floor(gameState.currentScore / 5);
            addXP(xpEarned);
            
            queueAchievement(`Time Attack Complete! +${xpEarned} XP`);
        }

        function setupPuzzleMode() {
            // Generate a random target that's achievable with the dice
            const numDice = parseInt(document.getElementById('numOfDice').value);
            gameState.puzzleTarget = Math.floor(Math.random() * (numDice * 6 - numDice + 1)) + numDice;
            gameState.targetScore = gameState.puzzleTarget;
            gameState.attemptsLeft = 3; // Limited attempts for puzzle mode
            
            targetScoreElement.textContent = gameState.targetScore;
            attemptsLeftElement.textContent = gameState.attemptsLeft;
            
            diceResult.textContent = `Puzzle: Roll exactly ${gameState.puzzleTarget} with ${numDice} dice!`;
        }

        function setupTournamentMode() {
            gameState.tournamentRound = 1;
            gameState.targetScore = 20; // Starting target
            
            diceResult.textContent = `Tournament Round ${gameState.tournamentRound}! Target: ${gameState.targetScore}`;
        }

        function setupDailyChallenge() {
            gameState.targetScore = dailyChallenge.target;
            document.getElementById('numOfDice').value = dailyChallenge.dice;
            gameState.attemptsLeft = dailyChallenge.attempts;
            gameState.maxAttempts = dailyChallenge.attempts;
            
            targetScoreElement.textContent = gameState.targetScore;
            attemptsLeftElement.textContent = gameState.attemptsLeft;
            diceResult.textContent = `Daily Challenge: Roll exactly ${gameState.targetScore} with ${dailyChallenge.dice} dice in ${dailyChallenge.attempts} attempts!`;
            
            createInitialDice();
        }

        // 4. ENHANCED VISUAL EFFECTS
        function initializeEnhancedVisuals() {
            // Screen shake and particle effects are implemented in the roll functions
        }

        function createParticleEffect(x, y, color, count = 10) {
            if (gameState.reducedMotion) return;
            
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.width = '5px';
                particle.style.height = '5px';
                particle.style.borderRadius = '50%';
                particle.style.background = color;
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                
                document.body.appendChild(particle);
                
                gsap.to(particle, {
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    opacity: 0,
                    scale: 0,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => particle.remove()
                });
            }
        }

        function screenShake(intensity = 5, duration = 0.5) {
            if (gameState.reducedMotion) return;
            
            const container = document.getElementById('container');
            gsap.to(container, {
                x: (Math.random() - 0.5) * intensity,
                y: (Math.random() - 0.5) * intensity,
                duration: 0.05,
                repeat: Math.floor(duration / 0.05),
                yoyo: true,
                onComplete: () => {
                    gsap.to(container, { x: 0, y: 0, duration: 0.1 });
                }
            });
        }

        // 5. STATISTICS DASHBOARD
        function initializeStatistics() {
            // Load statistics from localStorage
            const savedStats = localStorage.getItem('diceGameStatistics');
            if (savedStats) {
                const stats = JSON.parse(savedStats);
                gameState.totalGames = stats.totalGames || 0;
                gameState.totalWins = stats.totalWins || 0;
                gameState.totalRolls = stats.totalRolls || 0;
                gameState.rollFrequency = stats.rollFrequency || {};
                gameState.bestStreak = stats.bestStreak || 0;
            }
        }

        function updateStatistics(rollValues, win = false) {
            gameState.totalRolls++;
            
            // Update roll frequency
            const rollSum = rollValues.reduce((a, b) => a + b, 0);
            gameState.rollFrequency[rollSum] = (gameState.rollFrequency[rollSum] || 0) + 1;
            
            if (win) {
                gameState.totalWins++;
            }
            
            // Update best streak
            if (gameState.winStreak > gameState.bestStreak) {
                gameState.bestStreak = gameState.winStreak;
            }
            
            // Save statistics
            saveStatistics();
            
            // Update statistics display if modal is open
            if (statsModal.style.display === 'flex') {
                updateStatsDisplay();
            }
        }

        function updateStatsDisplay() {
            document.getElementById('totalGames').textContent = gameState.totalGames;
            document.getElementById('totalRolls').textContent = gameState.totalRolls;
            document.getElementById('winRate').textContent = gameState.totalGames > 0 
                ? `${Math.round((gameState.totalWins / gameState.totalGames) * 100)}%` 
                : '0%';
            document.getElementById('bestStreak').textContent = gameState.bestStreak;
            
            // Calculate average score (simplified)
            document.getElementById('avgScore').textContent = gameState.totalGames > 0 
                ? Math.round(gameState.currentScore / gameState.totalGames) 
                : '0';
                
            document.getElementById('perfectRolls').textContent = Object.values(gameState.rollFrequency)
                .reduce((a, b) => a + b, 0) - (gameState.rollFrequency[0] || 0);
            
            // Update roll frequency display
            const rollFrequencyElement = document.getElementById('rollFrequency');
            rollFrequencyElement.innerHTML = '';
            
            // Get top 5 most common rolls
            const topRolls = Object.entries(gameState.rollFrequency)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);
                
            topRolls.forEach(([roll, frequency]) => {
                const rollElement = document.createElement('div');
                rollElement.style.display = 'flex';
                rollElement.style.justifyContent = 'space-between';
                rollElement.style.margin = '5px 0';
                rollElement.innerHTML = `
                    <span>Roll ${roll}:</span>
                    <span>${frequency} times</span>
                `;
                rollFrequencyElement.appendChild(rollElement);
            });
        }

        function saveStatistics() {
            const statsData = {
                totalGames: gameState.totalGames,
                totalWins: gameState.totalWins,
                totalRolls: gameState.totalRolls,
                rollFrequency: gameState.rollFrequency,
                bestStreak: gameState.bestStreak
            };
            localStorage.setItem('diceGameStatistics', JSON.stringify(statsData));
        }

        // 6. TUTORIAL SYSTEM
        function initializeTutorial() {
            // Check if tutorial has been completed
            const tutorialCompleted = localStorage.getItem('diceGameTutorialCompleted');
            if (!tutorialCompleted) {
                showTutorial();
            }
        }

        function showTutorial() {
            tutorialOverlay.style.display = 'flex';
            gameState.currentTutorialStep = 0;
            updateTutorialContent();
        }

        function updateTutorialContent() {
            const tutorialSteps = [
                {
                    title: "Welcome to Enhanced Dice Game!",
                    content: "This is a feature-rich dice game with multiple modes, progression, and multiplayer. Let's learn how to play!"
                },
                {
                    title: "Rolling Dice",
                    content: "Click the 'Roll Dice' button to roll. Try to get a total that meets or exceeds the target score. Use multiple dice for higher scores!"
                },
                {
                    title: "Game Modes",
                    content: "Choose from Solo, vs Computer, Multiplayer, Boss Battle, Time Attack, Puzzle, Tournament, and Daily Challenge modes!"
                },
                {
                    title: "Progression System",
                    content: "Earn XP and level up by playing games. Higher levels unlock new abilities and dice skins. Check your progress at the top!"
                },
                {
                    title: "Have Fun!",
                    content: "That's it! Now you're ready to play. Explore all the features using the buttons at the top right. Good luck!"
                }
            ];
            
            const currentStep = tutorialSteps[gameState.currentTutorialStep];
            tutorialContent.innerHTML = `
                <h3>${currentStep.title}</h3>
                <p>${currentStep.content}</p>
            `;
            
            tutorialStep.textContent = `${gameState.currentTutorialStep + 1}/${tutorialSteps.length}`;
            
            // Update button states
            document.getElementById('prevTutorial').disabled = gameState.currentTutorialStep === 0;
            document.getElementById('nextTutorial').textContent = 
                gameState.currentTutorialStep === tutorialSteps.length - 1 ? 'Finish' : 'Next';
        }

        function nextTutorialStep() {
            const totalSteps = 5;
            if (gameState.currentTutorialStep < totalSteps - 1) {
                gameState.currentTutorialStep++;
                updateTutorialContent();
            } else {
                finishTutorial();
            }
        }

        function prevTutorialStep() {
            if (gameState.currentTutorialStep > 0) {
                gameState.currentTutorialStep--;
                updateTutorialContent();
            }
        }

        function finishTutorial() {
            tutorialOverlay.style.display = 'none';
            gameState.tutorialCompleted = true;
            localStorage.setItem('diceGameTutorialCompleted', 'true');
        }

        // 7. ACCESSIBILITY FEATURES
        function initializeAccessibility() {
            // Load accessibility settings
            const savedAccessibility = localStorage.getItem('diceGameAccessibility');
            if (savedAccessibility) {
                const accessibility = JSON.parse(savedAccessibility);
                gameState.highContrast = accessibility.highContrast || false;
                gameState.largeText = accessibility.largeText || false;
                gameState.reducedMotion = accessibility.reducedMotion || false;
                gameState.colorblindMode = accessibility.colorblindMode || false;
                
                // Apply settings
                applyAccessibilitySettings();
            }
            
            // Set up accessibility toggle events
            document.getElementById('highContrastToggle').addEventListener('change', function() {
                gameState.highContrast = this.checked;
                applyAccessibilitySettings();
                saveAccessibilitySettings();
            });
            
            document.getElementById('largeTextToggle').addEventListener('change', function() {
                gameState.largeText = this.checked;
                applyAccessibilitySettings();
                saveAccessibilitySettings();
            });
            
            document.getElementById('reducedMotionToggle').addEventListener('change', function() {
                gameState.reducedMotion = this.checked;
                applyAccessibilitySettings();
                saveAccessibilitySettings();
            });
            
            document.getElementById('colorblindToggle').addEventListener('change', function() {
                gameState.colorblindMode = this.checked;
                applyAccessibilitySettings();
                saveAccessibilitySettings();
            });
        }

        function toggleAccessibilityPanel() {
            accessibilityPanel.style.display = accessibilityPanel.style.display === 'none' ? 'block' : 'none';
        }

        function applyAccessibilitySettings() {
            // High contrast
            if (gameState.highContrast) {
                document.body.classList.add('high-contrast');
            } else {
                document.body.classList.remove('high-contrast');
            }
            
            // Large text
            if (gameState.largeText) {
                document.body.style.fontSize = '18px';
            } else {
                document.body.style.fontSize = '';
            }
            
            // Colorblind mode
            if (gameState.colorblindMode) {
                document.body.classList.add('colorblind-mode');
            } else {
                document.body.classList.remove('colorblind-mode');
            }
            
            // Update toggle states
            document.getElementById('highContrastToggle').checked = gameState.highContrast;
            document.getElementById('largeTextToggle').checked = gameState.largeText;
            document.getElementById('reducedMotionToggle').checked = gameState.reducedMotion;
            document.getElementById('colorblindToggle').checked = gameState.colorblindMode;
        }

        function saveAccessibilitySettings() {
            const accessibilityData = {
                highContrast: gameState.highContrast,
                largeText: gameState.largeText,
                reducedMotion: gameState.reducedMotion,
                colorblindMode: gameState.colorblindMode
            };
            localStorage.setItem('diceGameAccessibility', JSON.stringify(accessibilityData));
        }

        // 8. SEASONAL CONTENT
        function initializeSeasonalContent() {
            // Check current date for seasonal events
            const today = new Date();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            
            // Seasonal events
            if (month === 12 && day >= 15 && day <= 31) {
                gameState.seasonalEvent = 'winter';
                activateWinterTheme();
            } else if (month === 10 && day >= 20 && day <= 31) {
                gameState.seasonalEvent = 'halloween';
                activateHalloweenTheme();
            }
        }

        function activateWinterTheme() {
            // Change background to winter theme
            document.body.style.background = "linear-gradient(-45deg, #e3f2fd, #bbdefb, #90caf9, #64b5f6)";
            
            // Add snowflakes
            createSnowflakes();
            
            // Winter-themed dice skins
            queueAchievement("Winter Festival Event Active!");
        }

        function activateHalloweenTheme() {
            // Change background to Halloween theme
            document.body.style.background = "linear-gradient(-45deg, #4a148c, #7b1fa2, #6a1b9a, #8e24aa)";
            
            // Halloween-themed dice skins
            queueAchievement("Spooky Halloween Event Active!");
        }

        function createSnowflakes() {
            if (gameState.reducedMotion) return;
            
            for (let i = 0; i < 50; i++) {
                const snowflake = document.createElement('div');
                snowflake.innerHTML = '❄';
                snowflake.style.position = 'fixed';
                snowflake.style.top = '-20px';
                snowflake.style.left = `${Math.random() * 100}vw`;
                snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
                snowflake.style.opacity = Math.random() * 0.7 + 0.3;
                snowflake.style.zIndex = '1';
                snowflake.style.pointerEvents = 'none';
                
                document.body.appendChild(snowflake);
                
                gsap.to(snowflake, {
                    y: window.innerHeight + 50,
                    x: Math.random() * 100 - 50,
                    rotation: Math.random() * 360,
                    duration: Math.random() * 10 + 10,
                    ease: "none",
                    repeat: -1,
                    delay: Math.random() * 5
                });
            }
        }

        // ORIGINAL GAME FUNCTIONS (Enhanced)

        // Initialize audio context
        function initAudio() {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.log('Web Audio API not supported');
                gameState.soundEnabled = false;
            }
        }

        // Initialize ambient glow orbs
        function initAmbientGlow() {
            const orbs = [glowOrb1, glowOrb2, glowOrb3];
            const colors = gameState.darkMode 
                ? ['rgba(167, 139, 250, 0.3)', 'rgba(236, 72, 153, 0.3)', 'rgba(16, 185, 129, 0.3)']
                : ['rgba(255, 209, 220, 0.3)', 'rgba(181, 232, 255, 0.3)', 'rgba(201, 233, 212, 0.3)'];

            orbs.forEach((orb, index) => {
                orb.style.background = `radial-gradient(circle, ${colors[index]}, transparent)`;
                orb.style.width = `${100 + Math.random() * 200}px`;
                orb.style.height = orb.style.width;
                
                orb.style.left = `${Math.random() * 100}vw`;
                orb.style.top = `${Math.random() * 100}vh`;

                const tl = gsap.timeline({ repeat: -1, yoyo: true });
                tl.to(orb, {
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                    opacity: 0.6 + Math.random() * 0.4,
                    duration: 10 + Math.random() * 10,
                    ease: "sine.inOut"
                });
            });
        }

        // Toggle dark mode
        function toggleDarkMode() {
            gameState.darkMode = !gameState.darkMode;
            document.body.classList.toggle('dark-mode', gameState.darkMode);
            updateMenuDarkModeText();
            initAmbientGlow();
            localStorage.setItem('diceGameDarkMode', gameState.darkMode);
        }

        // Update menu dark mode text
        function updateMenuDarkModeText() {
            menuDarkMode.querySelector('.menu-text').textContent = 
                `Dark Mode: ${gameState.darkMode ? 'On' : 'Off'}`;
        }

        // Show modal
        function showModal(modalId) {
            document.getElementById(modalId).style.display = 'flex';
            if (modalId === 'leaderboardModal') updateLeaderboardDisplay();
            if (modalId === 'skinsModal') updateSkinsDisplay();
            if (modalId === 'statsModal') updateStatsDisplay();
        }

        // Close modal
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Update leaderboard display
        function updateLeaderboardDisplay() {
            leaderboardList.innerHTML = '';
            const sortedLeaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 10);
            
            if (sortedLeaderboard.length === 0) {
                leaderboardList.innerHTML = '<li>No scores yet!</li>';
                return;
            }

            sortedLeaderboard.forEach((entry, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${index + 1}. ${entry.name}</span>
                    <span>${entry.score} (${entry.wins} wins)</span>
                `;
                leaderboardList.appendChild(li);
            });
        }

        // Update skins display
        function updateSkinsDisplay() {
            skinGrid.innerHTML = '';
            Object.entries(diceSkins).forEach(([skinId, skin]) => {
                const skinItem = document.createElement('div');
                skinItem.className = `skin-item ${skin.unlocked ? '' : 'locked'}`;
                skinItem.innerHTML = `
                    <div class="skin-preview dice-skin-${skinId}" style="background: radial-gradient(circle at 30% 30%, ${getSkinColor(skinId)}, #f9f9f9)"></div>
                    <div>${skin.name}</div>
                    ${!skin.unlocked ? `<small>${skin.requirement}</small>` : ''}
                `;
                
                if (skin.unlocked) {
                    skinItem.addEventListener('click', () => selectSkin(skinId));
                    if (skinId === gameState.currentSkin) {
                        skinItem.style.borderColor = '#ff9a9e';
                    }
                }
                
                skinGrid.appendChild(skinItem);
            });
        }

        function getSkinColor(skinId) {
            const colors = {
                'default': '#fff',
                'neon': '#ff6b8b',
                'ocean': '#4facfe',
                'forest': '#43e97b',
                'royal': '#9d50bb'
            };
            return colors[skinId] || '#fff';
        }

        function selectSkin(skinId) {
            gameState.currentSkin = skinId;
            localStorage.setItem('diceGameSkin', skinId);
            updateSkinsDisplay();
            createInitialDice();
        }

        // Combo system
        function updateComboSystem(currentValues) {
            if (gameState.lastRollValues.length > 0) {
                const lastAllSame = gameState.lastRollValues.every(val => val === gameState.lastRollValues[0]);
                const currentAllSame = currentValues.every(val => val === currentValues[0]);
                
                if (lastAllSame && currentAllSame && gameState.lastRollValues[0] === currentValues[0]) {
                    gameState.comboMultiplier *= 2;
                    showFloatingText(`🔥 COMBO x${gameState.comboMultiplier}!`, diceResult);
                    if (gameState.comboMultiplier >= 4 && !achievements.comboMaster) {
                        achievements.comboMaster = true;
                        queueAchievement("Combo Master!");
                    }
                } else {
                    gameState.comboMultiplier = 1;
                }
            }
            
            gameState.lastRollValues = [...currentValues];
            comboStatusElement.textContent = `${gameState.comboMultiplier}x`;
        }

        // Computer turn
        function computerTurn() {
            if (!gameState.playerTurn && gameState.gameActive) {
                rollButton.disabled = true;
                diceResult.textContent = "Computer is rolling...";
                
                setTimeout(() => {
                    const numOfDice = parseInt(document.getElementById('numOfDice').value);
                    const values = [];
                    
                    for (let i = 0; i < numOfDice; i++) {
                        values.push(Math.floor(Math.random() * 6) + 1);
                    }
                    
                    const sum = values.reduce((a, b) => a + b, 0);
                    gameState.computerScore = sum;
                    
                    diceResult.textContent = `Computer rolled: ${values.join(' + ')} = ${sum}`;
                    gameState.playerTurn = true;
                    rollButton.disabled = false;
                    
                    if (sum >= gameState.targetScore) {
                        endGame('computer');
                    }
                }, 2000);
            }
        }

        // End game for PvC mode
        function endGame(winner) {
            gameState.gameActive = false;
            rollButton.disabled = true;
            
            if (winner === 'player') {
                diceResult.textContent += ' 🎉 You Win!';
                gameState.winsCount++;
                winsCountElement.textContent = gameState.winsCount;
                playWinSound();
                createConfetti();
            } else {
                diceResult.textContent += ' 💻 Computer Wins!';
            }
            
            // Add to leaderboard
            addToLeaderboard(gameState.winsCount, gameState.currentScore);
        }

        // Check daily challenge
        function checkDailyChallenge(sum) {
            if (gameState.gameMode === 'daily' && sum === dailyChallenge.target) {
                dailyChallenge.completed = true;
                if (!achievements.dailyChampion) {
                    achievements.dailyChampion = true;
                    queueAchievement("Daily Champion!");
                }
                unlockSkin('royal');
            }
        }

        // Add to leaderboard
        function addToLeaderboard(wins, score) {
            const playerName = prompt('Enter your name for the leaderboard:') || 'Player';
            leaderboard.push({
                name: playerName,
                wins: wins,
                score: score,
                date: new Date().toLocaleDateString()
            });
            
            // Keep only top 50 scores
            leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 50);
            localStorage.setItem('diceGameLeaderboard', JSON.stringify(leaderboard));
        }

        // Unlock skin
        function unlockSkin(skinId) {
            if (!diceSkins[skinId].unlocked) {
                diceSkins[skinId].unlocked = true;
                localStorage.setItem('diceGameSkins', JSON.stringify(diceSkins));
                queueAchievement(`Unlocked: ${diceSkins[skinId].name} skin!`);
                
                if (!achievements.skinCollector && Object.values(diceSkins).filter(s => s.unlocked).length >= 3) {
                    achievements.skinCollector = true;
                    queueAchievement("Skin Collector!");
                }
            }
        }

        // Check skin unlocks
        function checkSkinUnlocks() {
            if (gameState.winsCount >= 5) unlockSkin('neon');
            if (gameState.winStreak >= 3) unlockSkin('ocean');
            if (achievements.perfectRoll) unlockSkin('forest');
            if (gameState.winsCount >= 10) unlockSkin('royal');
        }
        
        // Sound effects using Web Audio API
        function playRollSound() {
            if (!gameState.soundEnabled || !audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(120, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + 0.3);
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
        
        function playWinSound() {
            if (!gameState.soundEnabled || !audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            
            const now = audioContext.currentTime;
            oscillator.frequency.setValueAtTime(523.25, now);
            oscillator.frequency.setValueAtTime(659.25, now + 0.1);
            oscillator.frequency.setValueAtTime(783.99, now + 0.2);
            oscillator.frequency.setValueAtTime(1046.50, now + 0.3);
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            
            oscillator.start(now);
            oscillator.stop(now + 0.5);
        }
        
        function playAchievementSound() {
            if (!gameState.soundEnabled || !audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1760, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }
        
        // Toggle sound
        function toggleSound() {
            gameState.soundEnabled = !gameState.soundEnabled;
            updateMenuSoundText();
            
            if (gameState.soundEnabled && audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
            }
        }

        // Lucky Challenge System
        function activateChallenge() {
            if (gameState.challengeCooldown > 0 || gameState.challengeActive) return;
            
            gameState.challengeActive = true;
            gameState.challengeCooldown = 3;
            challengeButton.disabled = true;
            challengeStatusElement.textContent = "Active!";
            
            showFloatingText("🎲 Lucky Challenge Activated!", diceResult);
            
            setTimeout(randomEvent, 1000);
        }

        function randomEvent() {
            const eventRoll = Math.random();
            let eventText = "";
            
            if (eventRoll < 0.3) {
                gameState.attemptsLeft++;
                attemptsLeftElement.textContent = gameState.attemptsLeft;
                eventText = "💫 Bonus Attempt!";
                showFloatingText(eventText, diceResult);
            } else if (eventRoll < 0.6) {
                const oldTarget = gameState.targetScore;
                gameState.targetScore = Math.max(5, gameState.targetScore - 5);
                targetScoreElement.textContent = gameState.targetScore;
                eventText = "🎁 Easier Target!";
                showFloatingText(eventText, diceResult);
                diceResult.textContent = `Target reduced from ${oldTarget} to ${gameState.targetScore}!`;
            } else if (eventRoll < 0.8) {
                eventText = "⚡ Double Points Next Roll!";
                showFloatingText(eventText, diceResult);
            } else {
                const numDiceInput = document.getElementById('numOfDice');
                const currentDice = parseInt(numDiceInput.value);
                if (currentDice < 6) {
                    numDiceInput.value = currentDice + 1;
                    eventText = "🎯 Extra Dice!";
                    showFloatingText(eventText, diceResult);
                } else {
                    eventText = "🌟 Maximum Dice!";
                    showFloatingText(eventText, diceResult);
                }
            }
            
            queueAchievement(eventText);
        }

        function updateChallengeCooldown() {
            if (gameState.challengeCooldown > 0) {
                gameState.challengeCooldown--;
                if (gameState.challengeCooldown === 0 && !gameState.challengeActive) {
                    challengeButton.disabled = false;
                    challengeStatusElement.textContent = "Ready!";
                } else if (gameState.challengeActive) {
                    challengeStatusElement.textContent = "Active!";
                } else {
                    challengeStatusElement.textContent = `${gameState.challengeCooldown} rolls`;
                }
            }
        }

        function showFloatingText(text, element) {
            const floatingText = document.createElement('div');
            floatingText.className = 'floating-text';
            floatingText.textContent = text;
            floatingText.style.color = gameState.darkMode ? '#a78bfa' : '#ff6b8b';
            
            const rect = element.getBoundingClientRect();
            floatingText.style.left = (rect.left + rect.width / 2) + 'px';
            floatingText.style.top = (rect.top - 50) + 'px';
            
            document.body.appendChild(floatingText);
            
            gsap.to(floatingText, {
                y: -100,
                opacity: 0,
                duration: 2,
                ease: "power2.out",
                onComplete: () => {
                    floatingText.remove();
                }
            });
        }
        
        // Difficulty settings
        const difficultySettings = {
            easy: { 
                target: 15, 
                message: "Roll 15 or higher to win!",
                attempts: 6
            },
            medium: { 
                target: 25, 
                message: "Roll 25 or higher to win!",
                attempts: 4
            },
            hard: { 
                target: 35, 
                message: "Roll 35 or higher to win!",
                attempts: 2
            }
        };
        
        // Initialize game
        function initGame() {
            // Load saved data
            const savedDarkMode = localStorage.getItem('diceGameDarkMode');
            if (savedDarkMode === 'true') {
                gameState.darkMode = true;
                document.body.classList.add('dark-mode');
            }
            
            const savedSkin = localStorage.getItem('diceGameSkin');
            if (savedSkin && diceSkins[savedSkin]) {
                gameState.currentSkin = savedSkin;
            }
            
            const savedLeaderboard = localStorage.getItem('diceGameLeaderboard');
            if (savedLeaderboard) {
                leaderboard = JSON.parse(savedLeaderboard);
            }
            
            const savedSkins = localStorage.getItem('diceGameSkins');
            if (savedSkins) {
                Object.assign(diceSkins, JSON.parse(savedSkins));
            }
            
            initAudio();
            initAmbientGlow();
            updateDifficulty();
            
            // Event listeners
            rollButton.addEventListener('click', rollDice);
            resetButton.addEventListener('click', resetGame);
            gameModeSelect.addEventListener('change', updateGameMode);
            difficultySelect.addEventListener('change', updateDifficulty);
            challengeButton.addEventListener('click', activateChallenge);
            
            // Close modals when clicking outside
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    e.target.style.display = 'none';
                }
            });
            
            createInitialDice();
            
            // Update menu text based on initial state
            updateMenuSoundText();
            updateMenuDarkModeText();
        }

        function updateGameMode() {
            gameState.gameMode = gameModeSelect.value;
            resetGame();
        }
        
        // Create initial dice display
        function createInitialDice() {
            const numOfDice = parseInt(document.getElementById('numOfDice').value);
            diceContainer.innerHTML = '';
            
            for (let i = 0; i < numOfDice; i++) {
                const dice = createDiceElement(1);
                diceContainer.appendChild(dice);
            }
        }
        
        // Update difficulty when changed
        function updateDifficulty() {
            const difficulty = document.getElementById('difficulty').value;
            gameState.targetScore = difficultySettings[difficulty].target;
            gameState.maxAttempts = difficultySettings[difficulty].attempts;
            gameState.attemptsLeft = gameState.maxAttempts;
            
            targetScoreElement.textContent = gameState.targetScore;
            attemptsLeftElement.textContent = gameState.attemptsLeft;
            diceResult.textContent = `Ready to roll! ${difficultySettings[difficulty].message}`;
            
            gameState.gameActive = true;
            rollButton.disabled = false;
            diceResult.style.color = "";
            
            createInitialDice();
        }
        
        // Create 3D dice element with dots
        function createDiceElement(value = 1) {
            const dice = document.createElement('div');
            dice.className = `dice ${gameState.currentSkin !== 'default' ? 'dice-skin-' + gameState.currentSkin : ''}`;
            
            for (let i = 1; i <= 6; i++) {
                const face = document.createElement('div');
                face.className = `dice-face face-${i}`;
                
                for (let j = 0; j < i; j++) {
                    const dot = document.createElement('div');
                    dot.className = 'dot';
                    face.appendChild(dot);
                }
                
                dice.appendChild(face);
            }
            
            setDiceFace(dice, value);
            return dice;
        }
        
        // Set dice to show specific face
        function setDiceFace(dice, value) {
            const rotations = {
                1: 'rotateX(0deg) rotateY(0deg)',
                2: 'rotateY(-90deg)',
                3: 'rotateX(-90deg)',
                4: 'rotateX(90deg)',
                5: 'rotateY(90deg)',
                6: 'rotateY(180deg)'
            };
            
            dice.style.transform = rotations[value];
        }
        
        // Enhanced rollDice function
        function rollDice() {
            if (!gameState.gameActive || (gameState.gameMode === 'pvc' && !gameState.playerTurn)) return;
            
            playRollSound();
            
            const numOfDice = parseInt(document.getElementById('numOfDice').value);
            const values = [];
            
            diceContainer.innerHTML = '';
            
            for (let i = 0; i < numOfDice; i++) {
                const dice = createDiceElement();
                diceContainer.appendChild(dice);
                
                dice.classList.add('rolling');
                
                setTimeout(() => {
                    const value = Math.floor(Math.random() * 6) + 1;
                    values.push(value);
                    
                    dice.classList.remove('rolling');
                    setDiceFace(dice, value);
                    
                    // Particle effect on dice landing
                    const diceRect = dice.getBoundingClientRect();
                    createParticleEffect(
                        diceRect.left + diceRect.width / 2,
                        diceRect.top + diceRect.height / 2,
                        gameState.darkMode ? '#a78bfa' : '#ff6b8b',
                        5
                    );
                    
                    if (values.length === numOfDice) {
                        finishRoll(values);
                    }
                }, 1000 + (i * 200));
            }
            
            gameState.rollsCount++;
            updateChallengeCooldown();
            
            if (gameState.rollsCount === 1 && !achievements.firstRoll) {
                achievements.firstRoll = true;
                queueAchievement("First Roll!");
            }
            
            gameState.attemptsLeft--;
            attemptsLeftElement.textContent = gameState.attemptsLeft;
            
            if (gameState.attemptsLeft <= 0) {
                gameState.gameActive = false;
                rollButton.disabled = true;
                if (gameState.gameMode === 'pvc') {
                    computerTurn();
                }
            }
            
            // Update statistics
            gameState.totalGames++;
            updateStatistics(values, false);
        }
        
        // Enhanced finishRoll function
        function finishRoll(values) {
            let sum = values.reduce((a, b) => a + b, 0);
            
            // Apply combo multiplier
            if (gameState.comboMultiplier > 1) {
                sum *= gameState.comboMultiplier;
            }
            
            gameState.currentScore = sum;
            
            // Update combo system
            updateComboSystem(values);
            
            addToRollHistory(values, sum);
            diceResult.textContent = `You rolled: ${values.join(' + ')} = ${sum}${gameState.comboMultiplier > 1 ? ` (x${gameState.comboMultiplier} combo!)` : ''}`;
            
            // Screen shake on high rolls
            if (sum >= 30) {
                screenShake(8, 0.3);
            }
            
            checkAchievements(values, sum);
            checkDailyChallenge(sum);
            checkSkinUnlocks();
            
            // Game mode specific handling
            if (gameState.gameMode === 'boss') {
                handleBossBattle(sum);
            } else if (gameState.gameMode === 'daily') {
                if (sum === dailyChallenge.target) {
                    handleWin(sum);
                } else if (gameState.attemptsLeft <= 0) {
                    diceResult.textContent = 'Daily Challenge Failed! Try again tomorrow.';
                    diceResult.style.color = '#F44336';
                }
            } else if (sum >= gameState.targetScore) {
                handleWin(sum);
            } else {
                diceResult.textContent += ' - Try again!';
                diceResult.style.color = '#F44336';
                
                gameState.winStreak = 0;
                streakCountElement.textContent = gameState.winStreak;
                
                if (gameState.attemptsLeft <= 0) {
                    if (gameState.gameMode === 'pvc') {
                        computerTurn();
                    } else {
                        diceResult.textContent = 'Game Over! No attempts left. Click Reset to play again.';
                        diceResult.style.color = '#F44336';
                    }
                } else if (gameState.gameMode === 'pvc') {
                    gameState.playerTurn = false;
                    setTimeout(computerTurn, 1000);
                }
            }
            
            gameState.lastRollSum = sum;
        }

        function handleBossBattle(sum) {
            // Calculate damage to boss (simplified)
            const damage = Math.max(1, Math.floor(sum / 5));
            gameState.bossHealth = Math.max(0, gameState.bossHealth - damage);
            
            // Update boss health bar
            const healthBar = document.getElementById('bossHealthBar');
            if (healthBar) {
                healthBar.style.width = `${gameState.bossHealth}%`;
            }
            
            diceResult.textContent += ` - Boss takes ${damage} damage!`;
            
            if (gameState.bossHealth <= 0) {
                // Boss defeated
                diceResult.textContent += ' 🎉 Boss Defeated!';
                handleWin(sum);
                
                // Award bonus XP for boss defeat
                addXP(50);
                queueAchievement("Boss Defeated! +50 XP");
                
                if (!achievements.bossSlayer) {
                    achievements.bossSlayer = true;
                    queueAchievement("Boss Slayer!");
                }
            }
        }

        // Enhanced handleWin function
        function handleWin(sum) {
            diceResult.textContent += ' 🎉 You Win!';
            diceResult.style.color = '#4CAF50';
            diceResult.classList.add('win-animation');
            gameState.winsCount++;
            winsCountElement.textContent = gameState.winsCount;
            
            playWinSound();
            gameState.winStreak++;
            streakCountElement.textContent = gameState.winStreak;
            
            // Award XP for winning
            const xpEarned = Math.floor(sum / 2) + (gameState.winStreak * 5);
            addXP(xpEarned);
            
            createConfetti();
            gameState.gameActive = false;
            rollButton.disabled = true;
            
            // Update statistics
            updateStatistics([], true);
            
            if (gameState.gameMode === 'solo') {
                addToLeaderboard(gameState.winsCount, sum);
            }
            
            setTimeout(() => {
                diceResult.classList.remove('win-animation');
            }, 1000);
        }
        
        // Add roll to history
        function addToRollHistory(values, sum) {
            const li = document.createElement('li');
            li.textContent = `Roll ${gameState.rollsCount}: ${values.join(' + ')} = ${sum}${gameState.comboMultiplier > 1 ? ` (x${gameState.comboMultiplier})` : ''}`;
            rollHistory.prepend(li);
            
            if (rollHistory.children.length > 5) {
                rollHistory.removeChild(rollHistory.lastChild);
            }
        }
        
        // Check for special achievements
        function checkAchievements(values, sum) {
            if (values.every(val => val === values[0]) && values.length > 1 && !achievements.perfectRoll) {
                achievements.perfectRoll = true;
                queueAchievement("Perfect Roll!");
                unlockSkin('forest');
            }
            
            if (sum === 7 && !achievements.luckySeven) {
                achievements.luckySeven = true;
                queueAchievement("Lucky Seven!");
            }
            
            if (sum >= 30 && !achievements.highRoller) {
                achievements.highRoller = true;
                queueAchievement("High Roller!");
            }
            
            if (gameState.rollsCount === 1 && !achievements.speedRunner) {
                achievements.speedRunner = true;
                queueAchievement("Speed Runner!");
            }
            
            if (gameState.gameMode === 'puzzle' && sum === gameState.puzzleTarget && !achievements.puzzleMaster) {
                achievements.puzzleMaster = true;
                queueAchievement("Puzzle Master!");
            }
        }
        
        // Queue achievement notification
        function queueAchievement(text) {
            achievementQueue.push(text);
            if (!isShowingAchievement) {
                showNextAchievement();
            }
        }
        
        // Show next achievement in queue
        function showNextAchievement() {
            if (achievementQueue.length === 0) {
                isShowingAchievement = false;
                return;
            }
            
            isShowingAchievement = true;
            const text = achievementQueue.shift();
            achievementText.textContent = text;
            achievementElement.classList.add('show');
            
            playAchievementSound();
            
            gsap.fromTo(achievementElement,
                { x: 300, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
            
            setTimeout(() => {
                gsap.to(achievementElement, {
                    x: 300,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in",
                    onComplete: () => {
                        achievementElement.classList.remove('show');
                        setTimeout(() => showNextAchievement(), 500);
                    }
                });
            }, 2500);
        }
        
        // Create confetti celebration
        function createConfetti() {
            if (gameState.reducedMotion) return;
            
            const confettiCount = 150;
            const confettiContainer = document.createElement('div');
            confettiContainer.style.position = 'fixed';
            confettiContainer.style.top = '0';
            confettiContainer.style.left = '0';
            confettiContainer.style.width = '100%';
            confettiContainer.style.height = '100%';
            confettiContainer.style.pointerEvents = 'none';
            confettiContainer.style.zIndex = '1000';
            document.body.appendChild(confettiContainer);
            
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.width = Math.random() * 10 + 5 + 'px';
                confetti.style.height = Math.random() * 10 + 5 + 'px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confettiContainer.appendChild(confetti);
                
                gsap.to(confetti, {
                    y: window.innerHeight + 100,
                    x: Math.random() * 200 - 100,
                    rotation: Math.random() * 360,
                    opacity: 1,
                    duration: 2 + Math.random() * 2,
                    ease: "power1.out",
                    onComplete: () => {
                        confetti.remove();
                    }
                });
            }
            
            setTimeout(() => {
                if (confettiContainer.parentNode) {
                    confettiContainer.remove();
                }
            }, 4000);
        }
        
        // Reset game function
        function resetGame() {
            if (gameState.gameMode === 'daily') {
                setupDailyChallenge();
            } else if (gameState.gameMode === 'multiplayer') {
                // Don't reset for multiplayer, just hide the panel
                multiplayerPanel.style.display = 'none';
                gameState.multiplayerActive = false;
                gameState.gameMode = 'solo';
                gameModeSelect.value = 'solo';
            } else {
                const difficulty = document.getElementById('difficulty').value;
                gameState.targetScore = difficultySettings[difficulty].target;
                gameState.maxAttempts = difficultySettings[difficulty].attempts;
                gameState.attemptsLeft = gameState.maxAttempts;
                
                targetScoreElement.textContent = gameState.targetScore;
                attemptsLeftElement.textContent = gameState.attemptsLeft;
                diceResult.textContent = `Ready to roll! ${difficultySettings[difficulty].message}`;
            }
            
            gameState.currentScore = 0;
            gameState.rollsCount = 0;
            gameState.winStreak = 0;
            gameState.challengeActive = false;
            gameState.challengeCooldown = 0;
            gameState.comboMultiplier = 1;
            gameState.lastRollValues = [];
            gameState.playerTurn = true;
            gameState.computerScore = 0;
            
            streakCountElement.textContent = gameState.winStreak;
            comboStatusElement.textContent = '1x';
            challengeStatusElement.textContent = "Ready!";
            challengeButton.disabled = false;
            diceResult.style.color = "";
            
            diceContainer.innerHTML = '';
            rollHistory.innerHTML = '';
            
            gameState.gameActive = true;
            rollButton.disabled = false;
            
            createInitialDice();
        }
        
        // Initialize the enhanced game when page loads
        window.addEventListener('DOMContentLoaded', initializeAllFeatures);
   