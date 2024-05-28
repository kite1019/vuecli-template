let dataArr = {};
// 讀取後台資料並重組資料格式
export function toDataArr(arr) {
    arr.forEach(function(item) {
        dataArr[item.BlockId] = item;
    });
}
//計算區塊實際資料 (因IndexBlock資料中有空白陣列)
export function dataNode(data, blockNumFirst) {
    for (let i = blockNumFirst; i <= (blockNumFirst + 9); i++) {
        if (dataArr[i]) {
            dataArr[i].Nodes.forEach(function(node) {
                if (node.Link.Url) {
                    data.push(node);
                }
            });
        }
    }
}
