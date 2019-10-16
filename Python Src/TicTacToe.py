def board_beginning():
    global board, taken_spots, win, play_again, turn, val

    board = [["-", "-", "-"],
             ["-", "-", "-"],
             ["-", "-", "-"]]

    taken_spots = []

    win = False

    play_again = False
    turn = 1

    val = []


def change_board(z, y):
    global turn
    board[z][y] = 'X' if turn == 1 else 'O'

def togglePlayer():
    global turn
    if turn == 1:
        turn = 2
    elif turn == 2:
        turn = 1


def run_game():
    global board, val, win, turn, valid_move, win_tally, play_again



    board_beginning()

    while play_again == False:



        while win == False:

            first_turn = input("What is your move, player " + str(turn) + "?: (e.g.: 0-0)\n")
            move = first_turn.split('-')
            for i in first_turn:
                if len(first_turn) != 3:
                    print("Input must be in format 0-0")
                    valid_move = False
                    break
                if any(first_turn in s for s in taken_spots):
                    print("That spot is already taken!")
                    valid_move = False
                    break
                else:
                    valid_move = True

                list.append(val, i)

            if valid_move == True:
                inp_1 = int(move[0])
                inp_2 = int(move[1])

            z = 0
            y = 0

            val = []

            if valid_move == True:
                change_board(inp_1, inp_2)
                for i in board:
                    print(*i)
                togglePlayer()

            def spot_taken(turn_position):
                if valid_move == True:
                    taken_spots.append(turn_position)

            spot_taken(first_turn)

            def check_win(game_board):

                # checks for a complete row of X's or O's
                def game_won_horiz(game_board):
                    for row in game_board:
                        xh_win_tally = 0
                        yh_win_tally = 0
                        for elem in row:
                            if elem == 'X':
                                xh_win_tally += 1
                                if xh_win_tally == 3:
                                    global win
                                    win = True
                                    return win
                            elif elem == 'O':
                                yh_win_tally += 1
                                if yh_win_tally == 3:

                                    win = True
                                    return win

                game_won_horiz(game_board)

                # checks for a complete column of X's or O's
                # realized i don't know how to deal with it in one list
                # so i copy and pasted it into three different cases
                # for three generated vertical lists

                def game_won_vert(game_board):
                    # creates a list of the nth element in each row
                    line = [row[0] for row in game_board]
                    line2 = [row[1] for row in game_board]
                    line3 = [row[2] for row in game_board]
                    xv_win_tally = 0
                    yv_win_tally = 0
                    # iterates over the generated list and checks for a win
                    for elem in line:

                        if elem == 'X':
                            xv_win_tally += 1
                            if xv_win_tally == 3:
                                global win
                                win = True
                                return win
                        if elem == 'O':
                            yv_win_tally += 1
                            if yv_win_tally == 3:
                                win = True
                                return win
                    xv_win_tally = 0
                    yv_win_tally = 0
                    for elem in line2:

                        if elem == 'X':
                            xv_win_tally += 1
                            if xv_win_tally == 3:
                                win = True
                                return win
                        if elem == 'O':
                            yv_win_tally += 1
                            if yv_win_tally == 3:
                                win = True
                                return win
                    xv_win_tally = 0
                    yv_win_tally = 0
                    for elem in line3:

                        if elem == 'X':
                            xv_win_tally += 1
                            if xv_win_tally == 3:
                                win = True
                                return win
                        if elem == 'O':
                            yv_win_tally += 1
                            if yv_win_tally == 3:
                                win = True
                                return win

                game_won_vert(game_board)

                # a hardcoded solution to check for a right or left direction diagonal of X's or O's
                def game_won_diag(game_board):
                    # right diagonals
                    xdr_win_tally = 0
                    ydr_win_tally = 0

                    # left diagonals
                    ydl_win_tally = 0
                    xdl_win_tally = 0

                    # is checking for X - -
                    #                 - X -
                    #                 - - X
                    if game_board[0][0] == 'X':
                        xdr_win_tally += 1
                    if game_board[1][1] == 'X':
                        xdr_win_tally += 1
                    if game_board[2][2] == 'X':
                        xdr_win_tally += 1
                    if xdr_win_tally == 3:
                        global win
                        win = True
                        return win

                    # is checking for - - x
                    #                 - X -
                    #                 x - -
                    if game_board[0][2] == 'X':
                        xdl_win_tally += 1
                    if game_board[1][1] == 'X':
                        xdl_win_tally += 1
                    if game_board[2][0] == 'X':
                        xdl_win_tally += 1
                    if xdl_win_tally == 3:
                        win = True
                        return win

                    # is checking for O - -
                    #                 - O -
                    #                 - - O
                    if game_board[0][0] == 'O':
                        ydr_win_tally += 1
                    if game_board[1][1] == 'O':
                        ydr_win_tally += 1
                    if game_board[2][2] == 'O':
                        ydr_win_tally += 1
                    if ydr_win_tally == 3:
                        win = True
                        return win

                    # is checking for - - O
                    #                 - O -
                    #                 O - -
                    if game_board[0][2] == 'O':
                        ydl_win_tally += 1
                    if game_board[1][1] == 'O':
                        ydl_win_tally += 1
                    if game_board[2][0] == 'O':
                        ydl_win_tally += 1
                    if ydl_win_tally == 3:
                        win = True
                        return win

                    def score_board():
                        if turn == 1 and win == True:
                            print("Congrats player 1! You are the winner!")




                game_won_diag(game_board)

            check_win(board)

        another_round = input('Would you like to play again? (y/n)\n ')

        if another_round == 'n':
            play_again = True
        elif another_round == 'y':
            board_beginning()

            print("Great! Get ready!")
        else:
            print("Please answer in format (y/n)")

def run_game_comp():
    global val

    board_beginning()

    first_turn = input("What is your move, HUMAN?: (e.g.: 0-0)\n")
    move = first_turn.split('-')
    for i in first_turn:
        if len(first_turn) != 3:
            print("Input must be in format 0-0")
            valid_move = False
            break
        if any(first_turn in s for s in taken_spots):
            print("That spot is already taken!")
            valid_move = False
            break
        else:
            valid_move = True

        list.append(val, i)

    if valid_move == True:
        inp_1 = int(move[0])
        inp_2 = int(move[1])

    z = 0
    y = 0

    val = []

    if valid_move == True:
        change_board(inp_1, inp_2)
        for i in board:
            print(*i)
        togglePlayer()



    def computer_move(game_board):

        for row in game_board:
            for each in row:
                if



def main():
    game_start = input("Would you like to play against the Computer or local 2-player? ('C' for computer/ 'L' for local play)\n")
    if game_start == 'L':
        run_game()
    elif game_start == 'C':
        print("okay!\n")
    else:
        print("Please input either 'C' or 'L' :)\n")

main()
