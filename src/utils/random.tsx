export const randomInt = (max: number)=> Math.floor(Math.random() * max)

export function randElement(tabs:[]){
    const count = tabs.length;
    const n = randomInt(count);
    return tabs[n];
    
}