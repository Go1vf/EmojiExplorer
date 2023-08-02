const generateGameItemsArr = (emojiOccurrences) => {
    const emojiList = Object.keys(emojiOccurrences);
    const gameItemsArr = [];
  
    emojiList.forEach((emoji) => {
      const color = '#fac858';
      for (let i = 0; i < emojiOccurrences[emoji]; i++) {
        gameItemsArr.push({ name: emoji, color, position: [null, null, null], display: false });
      }
    });
  
    return gameItemsArr;
};

const emojiOccurrences = {
    '🌍': 3,
    '🤔': 3,
    '😂': 3,
    '🔥': 3,
    '🀄️': 3,
    '🌛': 3,
    '🐱': 3,
    '🐶': 3,
    '👊': 3,
    '🐩': 3,
    '🛁': 3,
    '🥷': 3,
  };
const gameItemsArr = generateGameItemsArr(emojiOccurrences);

export const itemsArr = (level) => {
    // Game items generation logic here
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
  
export const isItemCanClick = (item, allItems) => {
    // Clickability logic here
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


  