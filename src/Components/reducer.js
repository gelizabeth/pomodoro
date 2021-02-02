export const initialState = {
    state: "initial",
    rounds: 4
}
const reducer = (state, action) =>{
switch(action.type){
    case 'SET_STATE':
        return{
            ...state,
            state: action.state
        };
     case 'DEC_ROUNDS':
            return{
                ...state.rounds,
                rounds: state.rounds - 1
            };
    case 'RESTART':
        return{
            ...state,
            state: "initial",
            rounds: 4
        }
    default: return state;
}
}
export default reducer;