import random


MOVES = [
    "rock",
    "paper",
    "scissors"
]


def normalize_move(move):
    """
    Convert model label into a standard move.
    """

    move = move.strip().lower()

    if "rock" in move:
        return "rock"

    if "paper" in move:
        return "paper"

    if "scissor" in move:
        return "scissors"

    return None


def get_computer_move():
    return random.choice(MOVES)


def determine_winner(user_move, computer_move):

    if user_move == computer_move:
        return "draw"

    winning_combinations = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper"
    }

    if winning_combinations[user_move] == computer_move:
        return "win"

    return "lose"


def play_round(user_move):

    user_move = normalize_move(user_move)

    if user_move is None:
        raise ValueError("Invalid user move")

    computer_move = get_computer_move()

    result = determine_winner(
        user_move,
        computer_move
    )

    return {
        "userMove": user_move,
        "computerMove": computer_move,
        "result": result
    }