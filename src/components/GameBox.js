// components/GameBox.js

import React, { useState, useEffect } from 'react';
import { isItemCanClick, itemsArr} from '../helpers/gameHelpers';

const GameBox = () => {
    let hasThreeItem = 0;
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [gameItemsArr, setGameItemsArr] = useState(itemsArr(level));
    const [operateArr, setOperateArr] = useState([]);

  useEffect(() => {
    // Game over conditions
    if (operateArr.length === 7) {
      setScore('Failed');
      alert('You failed');
      window.location.reload();
    }

    if (gameItemsArr.length === 0) {
      alert('You pass this level');
      if (level === 6) {
        alert('You win');
        return;
      }
      setLevel((prev) => prev + 1);
      setGameItemsArr(itemsArr(level + 1));
    }
  }, [gameItemsArr, level, operateArr]);

  const moveItem = (item, index, whichFloor) => {
    // Move item logic here
    let length = 0;
    hasThreeItem = 0;
    let hasThreeindex = 0;
    // 放到操作区
    setOperateArr((prev) => {
        const currentIndex = prev.findIndex((k) => k.name === item.name);
        if (currentIndex > -1) {
            prev.splice(currentIndex, 0, item);
        } else {
            prev.push(item);
        }
        length = prev.length;
        return [...prev];
      });
      // 操作原始数组
      setGameItemsArr((prev) => {
          prev[whichFloor].arr.splice(index, 1, {...item, name: '', color: ''});
          if (prev[prev.length - 1].arr.filter((item) => item.name !== '').length === 0) {
              return [];
          } else {
              return [...prev];
          }
      });

      // 判断清除逻辑
      operateArr.map((newItem, newIndex) => {
          if (newItem.name === item.name) {
              hasThreeItem++;
              hasThreeindex = newIndex;
          }
          return null;
      });
      // 如果有三个一样的
      if (hasThreeItem === 2) {
          setOperateArr((prev) => {
              prev.splice(hasThreeindex - 1, 3);
              length = prev.length;
              return [...prev];
          });
          setScore((prev) => prev + 100);
      }
  };

  return (
    <div className="gamebox">
      {/* Title Area */}
        <div class="container">
            <div class="title">Emoji Explorer</div>
            <div class="record">
                <div>
                    <span>Level: </span>
                    <span>{level}</span>
                </div>
                <div>
                    <span>Score: </span>
                    <span>{score}</span>
                </div>
            </div>
        </div>
      {/* <div className="titleArea">
        <div className="titleAreaTitle">Emoji Explorer</div>
        <div className="titleAreaScore">
          <div className="scoreLevel">
            <div>
              <span>Level: </span>
              <span>{level}</span>
            </div>
            <div>
              <span>Score: </span>
              <span>{score}</span>
            </div>
          </div>
        </div>
      </div> */}
      {/* Game Area */}
      <div className="gameArea">
              {gameItemsArr.map((item, index) => {
                  return (
                      <div
                          className="gameAreaFloor"
                          key={item.zIndex}
                          style={
                              item.arr.filter((k) => k.name !== '').length !== 0
                                  ? {zIndex: item.zIndex, width: item.width, height: item.width}
                                  : {display: 'none'}
                          }>
                          {item.arr.map((gameItem, gameIndex) => {
                              return (
                                  <div
                                      onClick={() => {
                                          if (gameItem.name === '' || !isItemCanClick(gameItem, gameItemsArr)) return;

                                          moveItem(gameItem, gameIndex, index);
                                      }}
                                      key={gameIndex}
                                      style={
                                          gameItem.name === ''
                                              ? {opacity: 0, pointerEvents: 'none'}
                                              : isItemCanClick(gameItem, gameItemsArr)
                                              ? {background: gameItem.color}
                                              : {background: '#c2cbcbee'}
                                      }
                                      className="gameItem">
                                      {gameItem.name}
                                  </div>
                              );
                          })}
                      </div>
                  );
              })}
        </div>
      {/* Operate Area */}
      <div className="operateArea">
              {operateArr.map((item, index) => {
                  return (
                      <div key={index} style={{background: item.color}} className="gameItemOperate">
                          {item.name}
                      </div>
                  );
              })}
        </div>
    </div>
  );
};

export default GameBox;
