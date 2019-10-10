export const SET_COUNTER = 'SET_COUNTER';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const set = (value)=>({
    type:SET_COUNTER,
    payload:value
})

export const decrement = ()=>({
    type:DECREMENT_COUNTER
})

export const increment = ()=>({
    type:INCREMENT_COUNTER
})

export const incrementIfOdd = ()=> (dispatch,getState) =>{
    const { counter } = getState;
    console.log(counter,111)
    if( counter % 2 === 0){
        return
    }
    dispatch(increment())
}

export const incrementAsync = (delay = 1000) => dispatch =>{
    setTimeout(()=>{
        dispatch(increment())
    },delay)
}
