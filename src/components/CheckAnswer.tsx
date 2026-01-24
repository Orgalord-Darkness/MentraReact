export default function CheckAnswer(props: {selectedAnswer: string, goodAnswer:string}) {
    window.alert(`Selected: ${props.selectedAnswer} | Good: ${props.goodAnswer}`);  
    if(props.selectedAnswer === props.goodAnswer) {
        return 1;
    }else{
        return 0; 
    } 
}