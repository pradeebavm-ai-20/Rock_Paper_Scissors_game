export const MOVES = ['rock', 'paper', 'scissors']

export const moveIcons = { rock: '✊', paper: '✋', scissors: '✌' }

export const moveNames = { rock: 'ROCK', paper: 'PAPER', scissors: 'SCISSORS' }

export function decideResult(userMove, computerMove) {
  if (userMove === computerMove) return 'draw'
  const wins = { rock: 'scissors', paper: 'rock', scissors: 'paper' }
  return wins[userMove] === computerMove ? 'win' : 'lose'
}

export function resultMessage(userMove, computerMove, result) {
  if (result === 'draw') return 'Same signal. The arena is locked.'
  const phrases = {
    'rock-scissors': 'Rock crushes Scissors',
    'paper-rock': 'Paper covers Rock',
    'scissors-paper': 'Scissors cut Paper',
  }
  return phrases[`${userMove}-${computerMove}`] || phrases[`${computerMove}-${userMove}`]
}
