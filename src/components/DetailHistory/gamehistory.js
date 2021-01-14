import React, { useState, useContext, useEffect } from 'react';

import './index.css';
import Board from './boardhistory'

import Config from './configs'
import checkWin from './services'

import { Button } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from "react-router-dom";

import { useParams } from 'react-router-dom';
import {Chat} from '../Chatroom/Chat/chat'
const useStyles = makeStyles((theme) => ({

    item: {
        display: 'flex',
        flexDirection: 'row',
        marginTop:10
    },


}));

function Game() {
    let { id } = useParams();
    const classes = useStyles();
    const history_router=useHistory();
    const [history, setHistory] = useState([
        {
            squares: Array(Config.brdSize * Config.brdSize).fill(null)
        }
    ]);
  
    const [nextMove, setNextMove] = useState(true);
    const [winCells, setWinCell] = useState(null);
    const [stepNumber, setstepNumber] = useState(0);
    const [step,setStep]=useState([]);
    const [clicktime,setClickTime]=useState(0);
 
   
    
    const url = localStorage.getItem("backend");
    const token=JSON.parse(localStorage.getItem('token'));
    useEffect(()  => {
        const getRes = async ()  =>{
        // const res = await fetch("http://localhost:3000/move/history-move",{
          const res = await fetch("https://apiadmin-caro.herokuapp.com/move/history-move",{
            method: 'POST',
            headers: {
            Authorization: 'Bearer ' + `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id
          }),
        })
        if(res.status===200){
            console.log("Vo 200OK")
         
            const historychat = await res.json();
          
            setStep(historychat.historyMove.move);
            
        }else{
            const result = await res.json();
            alert(result.message);
        }
      }
      getRes();
      }, [])
    
 
    const handleClickBack=(i)=>{
        const history2 = history.slice(0, stepNumber + 1);
        const current = history2[history2.length - 1];
        const squares = current.squares.slice();
        if (winCells === null && squares[i] != null) {
            squares[i] = null;
            setHistory(history2.concat([
                {
                    squares: squares,
                    latestMoveSquare: i
                }
            ]));
            const _history = history2.concat([
                {
                    squares: squares,
                    latestMoveSquare: i
                }
            ])
            const XorO = nextMove ? "X" : "O";

        
            setstepNumber(history2.length);
            setNextMove(!nextMove);
          
        }
    }
    const handleClick = (i) => {
        const history2 = history.slice(0, stepNumber + 1);
        const current = history2[history2.length - 1];
        const squares = current.squares.slice();
        if (winCells === null && squares[i] === null) {
            squares[i] = nextMove ? "X" : "O";


            setHistory(history2.concat([
                {
                    squares: squares,
                    latestMoveSquare: i
                }
            ]));
            const _history = history2.concat([
                {
                    squares: squares,
                    latestMoveSquare: i
                }
            ])
            const XorO = nextMove ? "X" : "O";
            const _winCells = checkWin(i, XorO, history2.length - 1, _history);
            setWinCell(_winCells.winCells);
            setstepNumber(history2.length);
            setNextMove(!nextMove);
          
        }
    }
  
   
    // const disable=(winner==null)? true: false;
    const current = history[stepNumber];
    

    return (
        
        <div className="game">
          
            <div className="game-board">
                <Board
                    squares={current.squares}
                    winLine={winCells}
                />
            </div>

            <div className="game-info">              
               
                <div>
                <Button onClick={handleBack}>Back</Button>
                    <Button onClick={handleNext}>Next</Button>
                </div>
                
                <div>
                <Chat/>
                </div>
            </div>
        </div>
       
    );

    function handleBack(){
        if(clicktime>=0){
            let temp=clicktime;
            temp=temp-1;
            console.log("click time ",clicktime);
            handleClickBack(step[temp]);
           
            setClickTime(temp);
        }
       
    }
    function handleNext(){
        let temp=clicktime;
        handleClick(step[clicktime]);
        temp=temp+1;
        if(temp<step.length){
            setClickTime(temp);
        }
    }
}

export default Game;
