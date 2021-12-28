import {  atom } from 'recoil';

const dataState = atom({
    key: "accountData",
    default: {
        id: undefined,
        name: undefined,
        places: [],
        locations: [],
        checkpoint: null
    }
})

export default dataState