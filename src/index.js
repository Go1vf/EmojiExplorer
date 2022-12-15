import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const gameItemsArr = [
  {name: '🌍', color: '#5470c6', position: [null, null, null], display: false},
  {name: '🌍', color: '#5470c6', position: [null, null, null], display: false},
  {name: '🌍', color: '#5470c6', position: [null, null, null], display: false},
  {name: '🤔', color: '#fac858', position: [null, null, null], display: false},
  {name: '🤔', color: '#fac858', position: [null, null, null], display: false},
  {name: '🤔', color: '#fac858', position: [null, null, null], display: false},
  {name: '😂', color: '#ee6666', position: [null, null, null], display: false},
  {name: '😂', color: '#ee6666', position: [null, null, null], display: false},
  {name: '😂', color: '#ee6666', position: [null, null, null], display: false},
  {name: '🔥', color: '#73c0de', position: [null, null, null], display: false},
  {name: '🔥', color: '#73c0de', position: [null, null, null], display: false},
  {name: '🔥', color: '#73c0de', position: [null, null, null], display: false},
  {name: '🀄️', color: '#73c0de', position: [null, null, null], display: false},
  {name: '🀄️', color: '#73c0de', position: [null, null, null], display: false},
  {name: '🀄️', color: '#73c0de', position: [null, null, null], display: false},
  {name: '🌛', color: '#5470c6', position: [null, null, null], display: false},
  {name: '🌛', color: '#5470c6', position: [null, null, null], display: false},
  {name: '🌛', color: '#5470c6', position: [null, null, null], display: false},
  {name: '🐱', color: '#ea7ccc', position: [null, null, null], display: false},
  {name: '🐱', color: '#ea7ccc', position: [null, null, null], display: false},
  {name: '🐱', color: '#ea7ccc', position: [null, null, null], display: false},
  {name: '🐶', color: '#c14cac', position: [null, null, null], display: false},
  {name: '🐶', color: '#c14cac', position: [null, null, null], display: false},
  {name: '🐶', color: '#c14cac', position: [null, null, null], display: false},
  {name: '👊', color: '#f08300', position: [null, null, null], display: false},
  {name: '👊', color: '#f08300', position: [null, null, null], display: false},
  {name: '👊', color: '#f08300', position: [null, null, null], display: false},
  {name: '🐩', color: '#004eff', position: [null, null, null], display: false},
  {name: '🐩', color: '#004eff', position: [null, null, null], display: false},
  {name: '🐩', color: '#004eff', position: [null, null, null], display: false},
  {name: '🛁', color: '#00e4ff', position: [null, null, null], display: false},
  {name: '🛁', color: '#00e4ff', position: [null, null, null], display: false},
  {name: '🛁', color: '#00e4ff', position: [null, null, null], display: false},
  {name: '🥷', color: '#c0e8ff', position: [null, null, null], display: false},
  {name: '🥷', color: '#c0e8ff', position: [null, null, null], display: false},
  {name: '🥷', color: '#c0e8ff', position: [null, null, null], display: false},
];

// 生成游戏items
const itemsArr = (level) => {
  let arr = [...gameItemsArr];
  // 每层有多少item
  const floorItemsArr = [9, 16, 25, 36, 49, 64, 81];
  const floorNumsArr = [3, 4, 5, 6, 7, 8, 9];

  // 每个等级有多少空item数组
  const noItemsNum = [7, 14, 14, 24, 49, 40];
  // 每个等级有多少item数组
  const itemsNum = [18, 36, 72, 111, 150, 240];

  // 空item数组
  const noItemsArr = [];
  let i = noItemsNum[level - 1];
  while (i > 0) {
      noItemsArr.push({name: '', color: '', position: [null, null, null], display: false});
      i--;
  }

  // 最后不完整的取几个
  const getArrItems = ((itemsNum[level - 1] / 3) % 12) * 3;
  const otherItemsArr = arr
      .map((i, index) => {
          if (index < getArrItems) {
              return i;
          }
          return null;
      })
      .filter((i) => i);
  let itemsNumsArr = [];
  if (level === 1) {
      itemsNumsArr = otherItemsArr;
  }
  if (level === 2) {
      itemsNumsArr = arr;
  }
  if (level === 3) {
      itemsNumsArr = arr.concat(arr);
  }
  if (level === 4) {
      arr = [...gameItemsArr];
      itemsNumsArr = arr.concat(arr, arr, otherItemsArr);
  }
  if (level === 5) {
      arr = [...gameItemsArr];
      itemsNumsArr = arr.concat(arr, arr, arr, otherItemsArr);
  }
  if (level === 6) {
      arr = [...gameItemsArr];
      itemsNumsArr = arr.concat(arr, arr, arr, arr, arr, otherItemsArr);
  }

  const allItems = itemsNumsArr.concat(noItemsArr).sort(() => Math.random() - 0.5);

  const resultArr = [];

  floorItemsArr.splice(0, level + 1).map((item, fIndex) => {
      resultArr.push(allItems.splice(0, item));
  });


  const zIndex = [6, 5, 4, 3, 2, 1];
  return resultArr.map((item, index) => {
      return {
          arr: [
              ...item.map((i, j) => {
                  i.position = [index + 1, parseInt(j / floorNumsArr[index]) + 1, (j + 1) % floorNumsArr[index] || floorNumsArr[index]];
                  return {...i};
              }),
          ],
          zIndex: zIndex[index],
          width: (index + 3) * 55,
      };
  });
};
// item是否能点击
const isItemCanClick = (item, allItems) => {
  const nowItem = {...item};
  const nowItemFloor = nowItem.position[0];
  // 最底下层不判断
  // if (nowItemFloor === allItems.length) return;

  const upFloor = allItems[nowItemFloor - 2]?.arr.filter((itemNow) => itemNow.name !== '') || [];

  if (upFloor.length === 0) return true;
  let midArr = [];
  upFloor.map((itemNowM) => {
      const position = itemNowM.position;
      const a = [position[0] + 1, position[1], position[2]];
      const b = [position[0] + 1, position[1], position[2] + 1];
      const c = [position[0] + 1, position[1] + 1, position[2]];
      const d = [position[0] + 1, position[1] + 1, position[2] + 1];
      midArr.push(a);
      midArr.push(b);
      midArr.push(c);
      midArr.push(d);
  });

  const isCanClick =
      midArr.filter((mItem) => nowItem.position[0] === mItem[0] && nowItem.position[1] === mItem[1] && nowItem.position[2] === mItem[2])
          .length === 0;

  return isCanClick;
};


let hasThreeItem = 0;
let length = 0;
const GameBox = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameItemsArr, setGameItemsArr] = useState(itemsArr(level));
  const [operateArr, setOperateArr] = useState([]);
  // 判断游戏是否下一关
  useEffect(() => {
      if (length === 7) {
          setScore("Failed");
          alert("You failed")
          window.location.reload();
      }

      if (gameItemsArr.length === 0) {
          alert("You pass this level");
          if (level === 6) {
              alert("You win");
              return;
          }
          setLevel((prev) => prev + 1);
          setGameItemsArr((prev) => {
              prev = itemsArr(level + 1);
              return [...prev];
          });
      }
  }, [gameItemsArr, level]);
  // 点击item
  const moveItem = (item, index, whichFloor) => {
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
          {/* 标题区域 */}
          <div className="titleArea">
              <div className="titleAreaTitle">Emoji Explorer</div>
              <div className="titleAreaScore">
                  <div>
                    <span>Level </span>
                    <span>{level}</span>
                  </div>
                   <div>
                    <span>Score: </span>
                  <span>{score}</span>
                  </div>
                 
              </div>
          </div>
          {/* 游戏区域 */}
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

          {/* 下方格子 */}
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
root.render(
    <div id="gameBox"><GameBox /></div>
);