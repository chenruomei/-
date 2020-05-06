import moment from 'moment'
export const state = () => ({
    list: [],
    postList: []
})
export const mutations = {
    addHistoryItem(state, data) {
        state.list.push(data)
        console.log(state)
    },
    addDraftList(state, data) {
        console.log(data)
        const newData = { ...data.form }
        // console.log(newData)
        // 判断是否有id，如果有id就覆盖原来的，没有就追加
        if (data.id || data.id === 0) {
            state.postList.splice(data.id, 1, newData)
        } else {
            state.postList.push(newData)
        }
        // console.log(state)
        state.postList.forEach((element) => {
            element.time = new Date()
            element.time = moment(element.time).format('YYYY-MM-DD')
        })
    }
}