import { useEffect, useMemo, useState } from 'react'
import { White_piece, Black_piece } from './import.image'
import './App.css'

function App() {

  let createboard: Array<any> = []

  let [moveRunning, setMoveRunning] = useState(true)

  
  enum PieceColor {
    BLACK = "BLACK",
    WHITE = "WHITE"
  }


  interface PieceMoving {
    row: number,
    col: number,
    value: string,
    piece: PieceColor
  }
  interface CurrentPiece {
    col: number | null,
    row: number | null,
    color: PieceColor | ""
    img: string | ""
    name:string |""
  }


  let BlackPieces = [
    { Piece: Black_piece.Black_Rook, name: "BLACK_ROOK" },
    { Piece: Black_piece.Black_Knight, name: "BLACK_KNIGHT" },
    { Piece: Black_piece.Black_Bicap, name: "BLACK_BISHOP" },
    { Piece: Black_piece.BlacK_Queen, name: "BLACK_QUEEN" },
    { Piece: Black_piece.Black_King, name: "BLACK_KING" },
    { Piece: Black_piece.Black_Bicap, name: "BLACK_BISHOP" },
    { Piece: Black_piece.Black_Knight, name: "BLACK_KNIGHT" },
    { Piece: Black_piece.Black_Rook, name: "BLACK_ROOK" }
  ]



  let whitePieces = [
    {

      Piece: White_piece.White_Rook,
      name: "WHITE_ROOK"
    },
    {

      Piece: White_piece.White_Knight,
      name: "WHITE_KNIGHT"
    },
    {
      Piece: White_piece.White_Bicap,
      name: "WHITE_BISHOP"
    },
    {
      Piece: White_piece.White_King,
      name: "WHITE_KING"
    },


    {
      Piece: White_piece.White_Queen,
      name: "WHITE_QUEEN"
    },
    {
      Piece: White_piece.White_Bicap,
      name: "WHITE_BISHOP"
    },
    {
      Piece: White_piece.White_Knight,
      name: "WHITE_KNIGHT"
    },
    {
      Piece: White_piece.White_Rook,
      name: "WHITE_ROOK"
    }
  ]



  const MoveSet = {
    "moves": {
      "PAWN": {
        "BLACK": [
          { "forward": [1, 1] },
          { "double_forward": [2, 1] },
          { "capture_left": [1, 2] },
          { "capture_right": [1, 0] },
        ],
        "WHITE": [
          { "forward": [-1, -1] },
          { "double_forward": [-2, -1] },
          { "capture_left": [-1, -2] },
          { "capture_right": [-1, 0] },
          // { "capture_right": [1, -1] }
        ]
      },
      "KNIGHT": [
        { "move": [1, 2] },
        { "move": [2, 1] },
        { "move": [-1, 2] },
        { "move": [-2, 1] },
        { "move": [1, -2] },
        { "move": [2, -1] },
        { "move": [-1, -2] },
        { "move": [-2, -1] }
      ],
      "BISHOP": [
        { "move": [1, 1] },
        { "move": [1, -1] },
        { "move": [-1, 1] },
        { "move": [-1, -1] }
      ],
      "ROOK": [
        { "move": [0, 1] },
        { "move": [0, -1] },
        { "move": [1, 0] },
        { "move": [-1, 0] }
      ],
      "QUEEN": [
        { "move": [0, 1] },
        { "move": [0, -1] },
        { "move": [1, 0] },
        { "move": [-1, 0] },
        { "move": [1, 1] },
        { "move": [1, -1] },
        { "move": [-1, 1] },
        { "move": [-1, -1] }
      ],
      "KING": [
        { "move": [0, 1] },
        { "move": [0, -1] },
        { "move": [1, 0] },
        { "move": [-1, 0] },
        { "move": [1, 1] },
        { "move": [1, -1] },
        { "move": [-1, 1] },
        { "move": [-1, -1] }
      ]
    }
  }

  const [turn_change, setTurn_change] = useState<PieceColor>(PieceColor.WHITE)

  {/**@Create_a_Board */ }
  const [board, setBoard]: Array<any> = useState([])
  //  const [board_color, setBoard_color] = useState<Boolean |null>(null)
  const [current_piece, setCurrentPiece] = useState<CurrentPiece>(
    {
      col: null,
      row: null,
      color: '',
      img: "",
      name:""
    }
  )
  function PutBlackPiece(arr: Array<any>) {
    let Black_index = 0
    let White_index = 0
    arr = arr.map((row: any, index_row: number) => {

      row.map((col: any) => {
        if (index_row === 0) {
          col.img = BlackPieces[Black_index]["Piece"]
          col.name = BlackPieces[Black_index]["name"]
          col.piece = "BLACK"
          col.active = null
          Black_index++
        }
        if (index_row == 1) {
          col.img = Black_piece.Black_pown
          col.name = "BLACK_POWN"
          col.piece = "BLACK"
          col.active = null
        }
        if (index_row == 6) {
          col.img = White_piece.White_pown
          col.name = "WHITE_POWN",
            col.piece = "WHITE"
          col.active = null

        }
        if (index_row == 7) {
          col.img = whitePieces[White_index]["Piece"]
          col.name = whitePieces[White_index]["name"]
          col.piece = "WHITE"
          col.active = null
          White_index++
        }
      })

      return row
    })

    return arr
  }




  async function MovesAvailable(Cond: PieceMoving) {
    let own_color = Cond.piece
    
    console.log(MoveSet.moves["PAWN"], own_color)
    const PieceMovingSet = MoveSet.moves["PAWN"][own_color]
    // setBoard_color(true)
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        board[row][col].active = ""
      }
    }

    setBoard(board)
    for (let moves = 0; moves < PieceMovingSet.length; moves++) {

      if (own_color === PieceColor.WHITE) {
        let MovingArea_row = Cond.row + Object.values(PieceMovingSet[moves])[0][0]
        let MovingArea_col = Cond.col + Object.values(PieceMovingSet[moves])[0][1] + 1
        if (MovingArea_col >= 0 && MovingArea_row >= 0 && MovingArea_col <= 7 && MovingArea_row <= 7) {
          console.log("Hello this is the moves set ", MovingArea_row, MovingArea_col)

          if (board[MovingArea_row][MovingArea_col].img === null || !board[MovingArea_row][MovingArea_col].piece) {
            board[MovingArea_row][MovingArea_col].active = "bg-green-800"
            setBoard(board)
          }
          else if (board[MovingArea_row][MovingArea_col].piece &&
            board[MovingArea_row][MovingArea_col].piece !== own_color
          ) {
            board[MovingArea_row][MovingArea_col].active = "bg-yellow-800"
          }
          else {
            board[MovingArea_row][MovingArea_col].active = "bg-red-800"
            setBoard(board)
          }
        }
      }
      if (own_color === PieceColor.BLACK) {
        let MovingArea_row = Cond.row + Object.values(PieceMovingSet[moves])[0][0]
        let MovingArea_col = Cond.col + Object.values(PieceMovingSet[moves])[0][1] - 1

        if (MovingArea_col <= 7 && MovingArea_row <= 7 && MovingArea_col >= 0 && MovingArea_row >= 0) {
          if (board[MovingArea_row][MovingArea_col].img === null || board[MovingArea_row][MovingArea_col].piece !== own_color) {
            board[MovingArea_row][MovingArea_col].active = "bg-green-800"
            setBoard(board)
          } 
          else if (board[MovingArea_row][MovingArea_col ].piece &&
            board[MovingArea_row][MovingArea_col -1 ].piece !== own_color) {
            board[MovingArea_row][MovingArea_col -1].active = "bg-yellow-800"
          }
          else { 
            board[MovingArea_row][MovingArea_col].active = "bg-red-900"
            setBoard(board)
          }
        }
      }

    }
    setCurrentPiece({
      col: Cond.col,
      row: Cond.row,
      color: Cond.piece,
      name:Cond.value,
      img: board[Cond.row][Cond.col].img
    })
    setMoveRunning(old => !old)
    // createboard = board  
  }

  async function MovePieces(Move_Area: any) {
    
    
    if (current_piece.color && current_piece.col !== null && current_piece.row !== null) {
      let own_color = current_piece.color
      const PieceMovingSet = MoveSet.moves["PAWN"][own_color]
      for (let moves = 0; moves < PieceMovingSet.length; moves++) {
        // console.log(own_color)
        if (own_color === PieceColor.WHITE) {

          let MovingArea_row = current_piece.row + Object.values(PieceMovingSet[moves])[0][0]
          let MovingArea_col = current_piece.col + Object.values(PieceMovingSet[moves])[0][1] + 1


          if (MovingArea_col >= 0 && MovingArea_row >= 0 && MovingArea_col <= 7 && MovingArea_row <= 7) {

            if (Move_Area.row === MovingArea_row && Move_Area.col === MovingArea_col) {

              board[current_piece.row][current_piece.col].img = ""
              board[MovingArea_row][MovingArea_col].img = current_piece.img

              board[MovingArea_row][MovingArea_col].name = current_piece.name
              board[MovingArea_row][MovingArea_col].piece = current_piece.color
              board[MovingArea_row][MovingArea_col].active = ""
              setCurrentPiece({
                col: null,
                row: null,
                color: "",
                img: "",
                name:""
              })
            }

          }
        }

        if (own_color === PieceColor.BLACK) {

          let MovingArea_row = current_piece.row + Object.values(PieceMovingSet[moves])[0][0]
          let MovingArea_col = current_piece.col + Object.values(PieceMovingSet[moves])[0][1] - 1

          if (MovingArea_col >= 0 && MovingArea_row >= 0 && MovingArea_col <= 7 && MovingArea_row <= 7) {
            console.log("hello", current_piece, Move_Area.row === MovingArea_row && Move_Area.col === MovingArea_col)
            if (Move_Area.row === MovingArea_row && Move_Area.col === MovingArea_col) {
              board[current_piece.row][current_piece.col].img = ""
              board[MovingArea_row][MovingArea_col].img = current_piece.img
              board[MovingArea_row][MovingArea_col].active = ""
              board[MovingArea_row][MovingArea_col].name = current_piece.name
              board[MovingArea_row][MovingArea_col].piece = current_piece.color
              setCurrentPiece({
                col: null,
                row: null,
                color: "",
                img: "",
                name:""
              })
            }

          }
        }

      }

   
    }
    // if(turn_change === PieceColor.BLACK){
    //   setTurn_change(PieceColor.WHITE)
    // }else{
    //   setTurn_change(PieceColor.WHITE)
    // }
  }


  useEffect(() => {
    setBoard((old: any) => old = board)
  }, [moveRunning])

  useEffect(() => {
    let color = "bg-white"
    let img = ""
    for (let row = 0; row < Array(8).length; row++) {
      createboard[row] = []
      for (let col = 0; col < Array(8).length; col++) {

        createboard[row][col] = {
          img: img,
          bg: color,
          active: null
        }
        if (color === "bg-white") {
          color = "bg-black"
        } else {
          color = "bg-white"
        }
      }

      if (row % 2 == 0) {
        createboard[row].reverse();
      }


    }
    // console.log("hello")
    setBoard(createboard)
    PutBlackPiece(createboard)

  }, [])


  return (
    <>
      <div className='border'>
        {
          board.map((row: Array<any>, index_row: number) => {
            return (
              <div key={index_row} className={`w-100 grid grid-cols-8 grid-rows-1 h-[80px] `}>
                {
                  row.map((col: any, index_col) => {

                    return (
                      index_col % 2 == 0 ?
                        <div key={index_col} className={`${col.active ? col.active : col.bg} col-span-1 w-full min-h-full`} onClick={() => MovePieces({ row: index_row, col: index_col, value: col.name, piece: col.piece })}>
                          {
                            col.img ?
                              <div className='flex items-center justify-center w-full min-h-full' onClick={() => {

                                console.log(col)
                                MovesAvailable({ row: index_row, col: index_col, value: col.name, piece: col.piece })



                              }
                              }>
                                <img src={col.img} alt="" />
                              </div>

                              : null
                          }
                        </div> :
                        <div key={index_col} className={`${col.active ? col.active : col.bg} col-span-1 w-full min-h-full`} onClick={() => MovePieces({ row: index_row, col: index_col, value: col.name,  piece: col.piece })}>

                          {
                            col.img ?
                              <div className='flex items-center justify-center w-full min-h-full' onClick={() => {
                                console.log(col)

                                MovesAvailable({ row: index_row, col: index_col, value: col.name, piece: col.piece })

                              }
     
                              }>

                                <img src={col.img} alt="" />
                              </div> : null
                          }
                        </div>


                    )
                  })

                }
              </div>

            )
          }



          )

        }
      </div>

    </>
  )
}

export default App
