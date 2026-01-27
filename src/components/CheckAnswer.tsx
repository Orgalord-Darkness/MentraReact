export default function CheckAnswer(props: {selectedAnswer: string, goodAnswer:string}) {  
    if(props.selectedAnswer === props.goodAnswer) {
        return 1;
    }else{
        return 0; 
    } 
}