/*  display
  gameScreen  => display
          => player display
          => log
          => enemy log
        => buttons

  screens process
  => opening
    => name form
    => select class
  => begin button press
    => combat phase from 1 - 10
      => set player
      => set monster
    => 4 buttons available?
    => select attack per turn
    => deal actions from monster/player
    => combat resolution
      => next turn / next round

    => after round 9 complete
    => begin boss round
      => set player
      => set boss
*/

// Display #######################################
// main
var mainPage = document.getElementById('main');
// gameScreen
var gameScreen = document.createElement('div');
  gameScreen.setAttribute('id', 'game-screen');
  mainPage.appendChild(gameScreen);

// gameScreen => display
var displayScreen = document.createElement('div');
  displayScreen.setAttribute('id', 'display');
  gameScreen.appendChild(displayScreen);
  // display => 3 logs
  var playerLogScreen = document.createElement('div');
    playerLogScreen.setAttribute('class', 'log');
    // playerLogScreen.appendChild(document.createTextNode('player log'));
    displayScreen.appendChild(playerLogScreen);
  var combatLogScreen = document.createElement('div');
    combatLogScreen.setAttribute('class', 'log');
    combatLogScreen.setAttribute('id', 'combat-log');
    // combatLogScreen.appendChild(document.createTextNode('combat log'));
    displayScreen.appendChild(combatLogScreen);
  var monsterLogScreen = document.createElement('div');
    monsterLogScreen.setAttribute('class', 'log');
    // monsterLogScreen.appendChild(document.createTextNode('monster log'));
    displayScreen.appendChild(monsterLogScreen);
    var docLog = document.getElementsByClassName('log');
    var docPlayerLog = docLog[0];
    var docCombatLog = docLog[1];
    var docMonsterLog = docLog[2];

function updateScroll(){
  docCombatLog.scrollTop = docCombatLog.scrollHeight;
}

// gameScreen => controls/button
var controlScreen = document.createElement('div');
  controlScreen.setAttribute('id', 'control-screen');
  controlScreen.appendChild(document.createTextNode('Controls'));
  gameScreen.appendChild(controlScreen);
  var docControlScreen = document.getElementById('control-screen');

// game process #########################################

// common variables pools ################################
var Class=['Saber','Archer','Lancer','Caster','Assasin','Rider','Beserker'];
var roundCount;
var turnCount;

// player variables ######################################
// set player display to welcome message
var welcomeMessage = document.createElement('p');
var welcomeMessageText= document.createTextNode('Welcome to Proto Arena! Please enter your name');
welcomeMessage.appendChild(welcomeMessageText);
docPlayerLog.appendChild(welcomeMessage);


// set player name to input on form
// log screen form test #######################################

var formLog = document.createElement('form');
  formLog.setAttribute('onsubmit', 'checkPlayerName()');
  var formLegend = document.createElement('legend');
    formLegend.appendChild(document.createTextNode('Name:'));

  var formLogName = document.createElement('input');
    formLogName.setAttribute('type', 'text');
    formLogName.setAttribute('name', 'playername');
    formLogName.setAttribute('id', 'player-form-name');
    formLogName.setAttribute('value', '');
    // input value ''
  var formSubmit = document.createElement('input');
    formSubmit.setAttribute('type', 'submit');
    formSubmit.setAttribute('value', 'submit');

  formLog.appendChild(formLegend);
  // formLog.appendChild(document.createElement('br'));
  formLog.appendChild(formLogName);
  formLog.appendChild(document.createElement('br'));
  formLog.appendChild(formSubmit);
  docCombatLog.appendChild(formLog);

// console.log(document.getElementById('player-form-name').value);

// somehow get the submitted value into playerName and continue js
var playerName= '';

function checkPlayerName(){
  playerName = document.getElementById('player-form-name').value;
  if (playerName !== ''){
    // call myGame
    // remove formlog from docCombatLog
    docCombatLog.removeChild(formLog);
    myGame();
    // console.log(playerName);
    // alert('player name entered');
  } else {
    // alert , need a name
    alert('Please Enter Your Name.');
  }
}
// declare all game code as myGame

function myGame(){

  var playerLevel= 1;
  var playerHealth;
  var playerATK= 400;
  var playerDEF= 110;
  var playerClass;

  // Clear logs and docs ####################################
  function clearPlayerLog(){
    while(docPlayerLog.hasChildNodes()){
      docPlayerLog.removeChild(docPlayerLog.firstChild);
    }
  }
  function clearCombatLog(){
    while(docCombatLog.hasChildNodes()){
      docCombatLog.removeChild(docCombatLog.firstChild);
    }
  }
  function clearMonsterLog(){
    while(docMonsterLog.hasChildNodes()){
      docMonsterLog.removeChild(docMonsterLog.firstChild);
    }
  }
  function clearControlScreen(){
    while(docControlScreen.hasChildNodes()){
      docControlScreen.removeChild(docControlScreen.firstChild);
    }
  }

  // player functions
  function playerHealthCalc(InputLevelHere){
    playerHealth= 1200 +((InputLevelHere/10)*1000);
    return playerHealth;
  }
  function playerMaxHealthCalc(InputLevelHere){
    var playerMaxHealth= 1200 +((InputLevelHere/10)*1000);
    return playerMaxHealth;
  }
  function playerStatuslog(){
    // playerHealthCalc();

    var docPlayerStatus = document.createElement('p');
    docPlayerStatus.setAttribute('id', 'player-status');
    docPlayerStatus.appendChild(document.createTextNode(playerName+ ' '+ playerClass+' LV: '+playerLevel))
    docPlayerStatus.appendChild(document.createElement('br'));
    docPlayerStatus.appendChild(document.createTextNode('Health: ' + playerHealth + ' / ' + playerMaxHealthCalc(playerLevel)));
    docPlayerStatus.appendChild(document.createElement('br'));
    docPlayerStatus.appendChild(document.createTextNode('ATK: '+playerATK));
    docPlayerStatus.appendChild(document.createElement('br'));
    docPlayerStatus.appendChild(document.createTextNode('DEF: '+playerDEF));
    // console.log(playerName+ ' '+ playerClass+' LV: '+playerLevel);
    // console.log('Health: '+playerHealthCalc(playerLevel));
    // console.log('ATK: '+playerATK);
    // console.log('DEF: '+playerDEF);
    // display on docPlayerLog
    docPlayerLog.appendChild(docPlayerStatus);
  }
  function playerStatusReset(){
    playerATK=400;
    playerDEF=100;
    classEffectPlayer();
    playerHealthCalc(playerLevel);
  }
  function playerBasicAttack(){
    var damageVariance= (Math.floor(Math.random()*(120-90)) + 90)/100;
    var damage = Math.floor(Math.floor(playerATK * damageVariance)*100/monsterDEF);
    monsterHealth = monsterHealth - damage;
    // console.log(monsterHealth);
    var docPlayerDMG = document.createElement('p');
    docPlayerDMG.setAttribute('id', 'player-damage');
    docPlayerDMG.appendChild(document.createTextNode(playerName +' attack hits '+monsterName+' for '+damage+'.'));
    // console.log(playerName +' attack hits '+monsterName+' for '+damage+'. Current '+monsterName+' health: '+monsterHealth);
    // display on docCombatLog
    docCombatLog.appendChild(docPlayerDMG);
    updateScroll();
  }
  function playerSpecialSkill(){
    var damageVariance= (Math.floor(Math.random()*(120-90)) + 90)/100;
    var damage = Math.floor(Math.floor(playerATK * damageVariance)*100/(monsterDEF*50/100));
    monsterHealth = monsterHealth - damage;

    var docPlayerSkill = document.createElement('p');
    docPlayerSkill.setAttribute('id', 'player-skill');
    docPlayerSkill.appendChild(document.createTextNode(playerName +' Cast Smite hitting '+monsterName+' for '+damage+'.'));
    // console.log(playerName +' Cast Smite hitting '+monsterName+' for '+damage+'. Current '+monsterName+' health: '+monsterHealth);
    // display on docCombatLog
    docCombatLog.appendChild(docPlayerSkill);
    updateScroll();
  }
  function playerActions(){
    var rng = Math.floor(Math.random()*100);
    if(rng<=70){
      playerBasicAttack();
    }
    else {
      if(rng>70 && rng<=90){
      playerSpecialSkill();
      }
      else {
        var docPlayerMiss = document.createElement('p');
        docPlayerMiss.setAttribute('id', 'player-miss');
        docPlayerMiss.appendChild(document.createTextNode(playerName +' attack misses '+monsterName));
        // console.log(playerName +' attack misses '+monsterName);
        // display on docCombatLog
        docCombatLog.appendChild(docPlayerMiss);
        updateScroll();
      }
    }
  }

  //monster variables #####################################
  var monsterNameList=['Werewolf','Imp','Automata','Orc','Wyvern','Gorgon','Dragon','Raptor','Elemental Golem','Risen Dead'];
  var monsterClass;
  var monsterLevel = 1;
  var monsterHealth;
  var monsterATK = 400;
  var monsterDEF = 100;

  function monsterHealthCalc(InputLevelHere){
    monsterHealth= 700 +((InputLevelHere/10)*1000);
    return monsterHealth;
  }
  function monsterMaxHealthCalc(InputLevelHere){
    var monsterMaxHealth= 700 +((InputLevelHere/10)*1000);
    return monsterMaxHealth;
  }
  //monster setup
  function monsterSummon(){
    monsterName =  monsterNameList[Math.floor(Math.random()*monsterNameList.length)];
    monsterClass = Class[Math.floor(Math.random()*Class.length)];
    classEffectMonster();
    // console.log(monsterClass);
    monsterHealthCalc(monsterLevel);
    // monsterStatuslog();
  }
  function bossSummon(){
    monsterLevel=5;
    monsterSummon();
    monsterName='Great '+ monsterName;
    monsterHealth= 800+monsterHealth;
    // var bossMaxHealth = monsterHealth;
    monsterATK=monsterATK+100;
  }
  function monsterStatusReset(){
    monsterATK=400;
    monsterDEF=100;
    classEffectMonster();
    monsterHealthCalc(monsterLevel);
  }
  function monsterStatuslog(){
    var docMonsterStatus = document.createElement('p');
    docMonsterStatus.setAttribute('id', 'monster-status');
    docMonsterStatus.appendChild(document.createTextNode(monsterName+ ' '+ monsterClass+ ' LV: '+monsterLevel));
    docMonsterStatus.appendChild(document.createElement('br'));
    docMonsterStatus.appendChild(document.createTextNode('Health: ' + monsterHealth + ' / ' + monsterMaxHealthCalc(monsterLevel)));
    // docMonsterStatus.appendChild(document.createElement('br'));
    // docMonsterStatus.appendChild(document.createTextNode('ATK: '+playerATK));
    // docMonsterStatus.appendChild(document.createElement('br'));
    // docMonsterStatus.appendChild(document.createTextNode('DEF: '+playerDEF));
    // console.log(monsterName+ ' '+ monsterClass+ ' LV: '+monsterLevel);
    // console.log('Health: '+monsterHealthCalc(monsterLevel));
    // console.log('ATK: '+monsterATK+' DEBU');
    // console.log('DEF: '+monsterDEF+' DEBU');
    // display on docMonsterLog
    docMonsterLog.appendChild(docMonsterStatus);
  }
  function bossStatuslog(){
    var docBossStatuslog = document.createElement('p');
    docBossStatuslog.setAttribute('id', 'monster-status');
    docBossStatuslog.appendChild(document.createTextNode(monsterName+ ' '+ monsterClass+ ' LV: '+monsterLevel));
    docBossStatuslog.appendChild(document.createElement('br'));
    docBossStatuslog.appendChild(document.createTextNode('Health: ' + monsterHealth + ' / ' + (monsterMaxHealthCalc(monsterLevel)+800)));
    docMonsterLog.appendChild(docBossStatuslog);
    //
  }
  function monsterBasicAttack(){
    var damageVariance= (Math.floor(Math.random()*(120-90)) + 90)/100;
    var damage = Math.floor(Math.floor(monsterATK * damageVariance)*100/playerDEF);
    playerHealth = playerHealth - damage;

    var docMonsterDMG = document.createElement('p');
    docMonsterDMG.setAttribute('id', 'monster-damage');
    docMonsterDMG.appendChild(document.createTextNode(monsterName +' attack hits '+playerName+' for '+damage+'.'));
    // console.log(monsterName +' attack hits '+playerName+' for '+damage+'. Current '+playerName+' health: '+playerHealth);
    // display on docCombatLog
    docCombatLog.appendChild(docMonsterDMG);
    updateScroll();
  }
  function monsterCritAttack(){
    var damageVariance= (Math.floor(Math.random()*(120-90)) + 90)/100;
    var damage = Math.floor((150/100)*Math.floor(monsterATK * damageVariance)*100/playerDEF);
    playerHealth = playerHealth - damage;

    var docMonsterCritDMG = document.createElement('p');
    docMonsterCritDMG.setAttribute('id', 'monster-crit-damage');
    docMonsterCritDMG.appendChild(document.createTextNode(monsterName +' Critical hits '+playerName+' for '+damage+'.'));
    // console.log(monsterName +' Critical hits '+playerName+' for '+damage+'. Current '+playerName+' health: '+playerHealth);
    // display on docCombatLog
    docCombatLog.appendChild(docMonsterCritDMG);
    updateScroll();
  }
  function monsterActions(){
    var rng = Math.floor(Math.random()*100);
    if(rng<=70){
      monsterBasicAttack();
    }
    else {
      if(rng>75 && rng<=85){
      monsterCritAttack();
      }
      else {
        var docMonsterMiss = document.createElement('p');
        docMonsterMiss.setAttribute('id', 'monster-miss');
        docMonsterMiss.appendChild(document.createTextNode(monsterName +' attack misses '+playerName));
        // console.log(monsterName +' attack misses '+playerName);
        // display on docCombatLog
        docCombatLog.appendChild(docMonsterMiss);
        updateScroll();
      }
    }
  }

  // Class variables ##############################################
  function classEffectPlayer(){
      switch(playerClass){
        case 'Saber':   playerATK= Math.floor(  1.3 * playerATK); playerDEF= Math.floor(  1.0 * playerDEF); break;
        case 'Archer':  playerATK= Math.floor(  1.1 * playerATK); playerDEF= Math.floor(  1.2 * playerDEF); break;
        case 'Lancer':  playerATK= Math.floor(  1.0 * playerATK); playerDEF= Math.floor(  1.3 * playerDEF); break;
        case 'Caster':  playerATK= Math.floor(  0.9 * playerATK); playerDEF= Math.floor(  1.4 * playerDEF); break;
        case 'Assasin': playerATK= Math.floor(  0.9 * playerATK); playerDEF= Math.floor(  1.4 * playerDEF); break;
        case 'Rider':   playerATK= Math.floor(  1.1 * playerATK); playerDEF= Math.floor(  1.1 * playerDEF); break;
        case 'Beserker':playerATK= Math.floor(  1.5 * playerATK); playerDEF= Math.floor(  0.8 * playerDEF); break;
        default: console.log('Summoning Ritual Error. Class is unknown')
      }
  }
  function classEffectMonster(){
    // console.log(monsterClass);
      switch(monsterClass){
        case 'Saber':   monsterATK= Math.floor(  1.3 * monsterATK); monsterDEF= Math.floor(  1.0 * monsterDEF); break;
        case 'Archer':  monsterATK= Math.floor(  1.1 * monsterATK); monsterDEF= Math.floor(  1.2 * monsterDEF); break;
        case 'Lancer':  monsterATK= Math.floor(  1.0 * monsterATK); monsterDEF= Math.floor(  1.3 * monsterDEF); break;
        case 'Caster':  monsterATK= Math.floor(  0.9 * monsterATK); monsterDEF= Math.floor(  1.4 * monsterDEF); break;
        case 'Assasin': monsterATK= Math.floor(  0.9 * monsterATK); monsterDEF= Math.floor(  1.4 * monsterDEF); break;
        case 'Rider':   monsterATK= Math.floor(  1.1 * monsterATK); monsterDEF= Math.floor(  1.1 * monsterDEF); break;
        case 'Beserker':monsterATK= Math.floor(  1.5 * monsterATK); monsterDEF= Math.floor(  0.8 * monsterDEF); break;
        default: console.log('Monster has escaped captivity. Class is unknown')
      }
  }

  // name checked, base functions loaded
  // show player stats
  // Set the player

  // Set playerClass
    playerClass = Class[Math.floor(Math.random()*Class.length)];
    classEffectPlayer();
    // console.log(playerName + ', you have been summoned as '+ playerClass + ' To fight in the Eternal Arena!');
    // send this to docCombatLog
    clearCombatLog();
    var playerStats = document.createElement('p');
    playerStats.setAttribute('id', 'playerHP');
    playerStats.appendChild(document.createTextNode(playerName + ', you have been summoned as '+ playerClass + ' To fight in the Eternal Arena!'));
    // docPlayerLog.removeChild(welcomeMessage);
    docCombatLog.appendChild(playerStats);
    // display player stat on docPlayerLog
    clearPlayerLog();
    clearMonsterLog();
    clearPlayerLog();
    playerHealthCalc(playerLevel);
    playerStatuslog();
    // remove all child inside control-screen
    clearControlScreen();
    // create button for starting round.
    var startButton = document.createElement('button');
    startButton.setAttribute('type', 'button');
    startButton.setAttribute('id', 'start-button');
    startButton.appendChild(document.createTextNode('Start Game'));
    docControlScreen.appendChild(startButton);
    document.getElementById('start-button').addEventListener('click', startCombat);
    // press start button to begin round, reset docCombatLog

    roundCount = 1;
    function playRound(roundCount){
      turnCount = 1;
      playerStatusReset();
      monsterSummon();
      monsterStatusReset();

      // remove three logs
      clearCombatLog();
      clearPlayerLog()
      clearMonsterLog()

      var docRoundCount = document.createElement('p');
      docRoundCount.setAttribute('id', 'round-count');
      docRoundCount.appendChild(document.createTextNode('Begin Round: ' + roundCount));
      docCombatLog.appendChild(docRoundCount);
      // add player and monster log
      playerStatuslog();
      monsterStatuslog();

      // empty control-screen
      clearControlScreen();
      // create fight button
      var fightButton = document.createElement('button');
      fightButton.setAttribute('type', 'button');
      fightButton.setAttribute('id', 'fight-button');
      fightButton.appendChild(document.createTextNode('Attack'));
      docControlScreen.appendChild(fightButton);
      document.getElementById('fight-button').addEventListener('click', startFightButton);
      // press start button to begin attack phase
    }
    function playBossRound(){
      turnCount = 1;
      playerStatusReset();
      bossSummon();
      // monsterStatusReset();

      // remove three logs
      clearCombatLog();
      clearPlayerLog()
      clearMonsterLog()

      var docRoundCount = document.createElement('p');
      docRoundCount.setAttribute('id', 'round-count');
      docRoundCount.appendChild(document.createTextNode('Begin Final Round: ' + roundCount));
      docCombatLog.appendChild(docRoundCount);
      // add player and monster log
      playerStatuslog();
      bossStatuslog();
      // empty control-screen
      clearControlScreen();
      // create fight button
      var fightButton = document.createElement('button');
      fightButton.setAttribute('type', 'button');
      fightButton.setAttribute('id', 'fight-button');
      fightButton.appendChild(document.createTextNode('Attack'));
      docControlScreen.appendChild(fightButton);
      document.getElementById('fight-button').addEventListener('click', startFightButton);
      // press start button to begin attack phase
    }
    function startCombat(){
      // set button for attack
      if (roundCount === 10){
        playBossRound(roundCount);
      } else{
        playRound(roundCount);
      }
    }
    function startFightButton(){
      // clearCombatLog();
      // player attack
      playerActions();
      clearMonsterLog();
      monsterStatuslog();

      if (monsterHealth <= 0){
        if (roundCount === 10){
          var docDefeatedMonster = document.createElement('p');
          docDefeatedMonster.setAttribute('id', 'monster-defeated');
          docDefeatedMonster.appendChild(document.createTextNode(playerName+' has defeated '+ monsterName+'!'));
          docDefeatedMonster.appendChild(document.createElement('br'));
          docDefeatedMonster.appendChild(document.createTextNode('Congratulations, you have won the game!'));
          docCombatLog.appendChild(docDefeatedMonster);
          updateScroll();
          // clear control-screen
          clearControlScreen();
          // new button to start a new game
          var resetButton = document.createElement('button');
          resetButton.setAttribute('type', 'button');
          resetButton.setAttribute('id', 'reset-button');
          resetButton.appendChild(document.createTextNode('Reset Game'));
          docControlScreen.appendChild(resetButton);
          document.getElementById('reset-button').addEventListener('click', myGame);
        } else {
          var docDefeatedMonster = document.createElement('p');
          docDefeatedMonster.setAttribute('id', 'monster-defeated');
          docDefeatedMonster.appendChild(document.createTextNode(playerName+' has defeated '+ monsterName+'!'));
          docCombatLog.appendChild(docDefeatedMonster);
          updateScroll();
          playerLevel = playerLevel + 1;
          monsterLevel=monsterLevel+1;
          roundCount += 1;

          // create button to play next round
          clearControlScreen();
          var nextRound = document.createElement('button');
          nextRound.setAttribute('type', 'button');
          nextRound.setAttribute('id', 'next-stage');
          nextRound.appendChild(document.createTextNode('Next Round'));
          docControlScreen.appendChild(nextRound);
          document.getElementById('next-stage').addEventListener('click', startCombat);
          // press start button to begin round, reset docCombatLog
          // playRound(roundCount);
        }
      } else{
        // monster attack
        monsterActions();
        if (playerHealth <= 0){
          var docDefeatedPlayer = document.createElement('p');
          docDefeatedPlayer.setAttribute('id', 'player-defeated');
          docDefeatedPlayer.appendChild(document.createTextNode(playerName + ' has been defeated!'));
          docCombatLog.appendChild(docDefeatedPlayer);
          updateScroll();
          // end game
          // clear control-screen
          clearControlScreen();
          // new button to start a new game
          var resetButton = document.createElement('button');
          resetButton.setAttribute('type', 'button');
          resetButton.setAttribute('id', 'reset-button');
          resetButton.appendChild(document.createTextNode('Reset Game'));
          docControlScreen.appendChild(resetButton);
          document.getElementById('reset-button').addEventListener('click', myGame);
        }
        clearPlayerLog();
        playerStatuslog();
      }
    }

}

// ######### develop ######################################################

  // function update scroll



    // function startCombat
    /* set monster
    set button for attack
    set round at 1 => if roundCount = 2 then monsterLevel+1
      if roundCount === 10 then play PLAY BOSS ROUND()
        else:
        PLAY ROUND [roundCount] // 1
          set turn at 1
          playerStatusReset
          monsterStatusReset
          monsterSummon
            docMonsterLog:
              console.log(playerName+' '+ playerClass+ ' LV '+ playerLevel+ ' VS '+monsterName+' '+monsterClass+' LV '+monsterLevel);
              console.log('HP: '+playerHealth+ '         HP: '+monsterHealth);
          wait for fight button
          // fightButton ()
            remove docCombatLog
            play function playerActions, check if monster hp 0
              console.log(playerName+' has defeated '+ monsterName+'!');
              playerLevel = playerLevel + 1;
              monsterLevel=monsterLevel+1;
              roundCount+1
              PLAY ROUND [roundCount] // 2
            play monsterActions, check if player hp 0
              console.log(playerName + ' has been defeated!');
            turnCount+1
            wait fight button

      // playBossRound();
      console.log(playerName+' has entered the final battle!');
      console.log('Final Round');
      set turn at 1
      playerStatusReset
      monsterStatusReset
      bossSummon
        docMonsterLog
          console.log(playerName+' '+ playerClass+ ' LV '+ playerLevel+ ' VS '+monsterName+' '+monsterClass+' LV '+monsterLevel);
          console.log('HP: '+playerHealth+ '         HP: '+monsterHealth);
      fightButtonBoss()
        play function playerActions, check if monster hp 0
          console.log(playerName+' has defeated '+ monsterName+'!');
          console.log('Congratulations, '+playerClass+' '+playerName+'! You are victorius!');
        play monsterActions, check if player hp 0
          console.log(playerName + ' has been defeated!');
        turnCount+1
        wait fight button
  /*
    //############################################################################
    //round 1 to 9 looped
    for(var roundCount=1; roundCount<=9; roundCount++){
      if(arenaWinCondition===false){
        break;
      }
      if(roundCount===2){
        monsterLevel=monsterLevel+1;
      }
      for(var turnCount=1; turnCount<=100; turnCount++){
        if(turnCount===1){
          console.log('Round '+roundCount);
          playerStatusReset();
          monsterStatusReset();
          monsterSummon();
          console.log(playerName+' '+ playerClass+ ' LV '+ playerLevel+ ' VS '+monsterName+' '+monsterClass+' LV '+monsterLevel);
          console.log('HP: '+playerHealth+ '         HP: '+monsterHealth);
          // log player and monster on docPlayerLog and docMonsterLog
          // playerStatuslog();
          // monsterStatuslog();
        }
        playerActions();
        if (monsterHealth <= 0){
          console.log(playerName+' has defeated '+ monsterName+'!');
          playerLevel = playerLevel + 1;
          monsterLevel=monsterLevel+1;
          break;
        }
        monsterActions();
        if (playerHealth <= 0){
          console.log(playerName + ' has been defeated!');
          var arenaWinCondition = false;
          break;
        }

        // playerStatuslog();
        // monsterStatuslog();
        }
      }//turncount end

      if(roundCount===9 && arenaWinCondition!==false){
        var arenaWinCondition= true;
    }//round count end

    // BOSS BATTLE ##################################################################
    if (arenaWinCondition === false){
      console.log('The End...');
    }
    else {//round 10 boss
      console.log(playerName+' has entered the final battle!');
      console.log('Final Round');
      for(var turnCount=1; turnCount<=99; turnCount++){
        if(turnCount===1){
          playerStatusReset();
          monsterStatusReset();
          bossSummon();
          console.log(playerName+' '+ playerClass+ ' LV '+ playerLevel+ ' VS '+monsterName+' '+monsterClass+' LV '+monsterLevel);
          console.log('HP: '+playerHealth+ '         HP: '+monsterHealth);
          // playerStatuslog();
          // monsterStatuslog();
        }//end if
        playerActions();
        if (monsterHealth <= 0){
          console.log(playerName+' has defeated '+ monsterName+'!');
          console.log('Congratulations, '+playerClass+' '+playerName+'! You are victorius!');
          break;
        }
        monsterActions();
        if (playerHealth <= 0){
          console.log(playerName + ' has been defeated!');
          console.log('The End...');
          break;
        }
      }//end for turn loop
    }

  }

  */
