/* VARIABLES */
const stackEditCloseBtn = document.getElementById('add-close-btn');
const stackAddScreen = document.querySelector('.stack-add');
const stackEdit = document.querySelector('.stack-edit');
const modifyStackConfirmBtn = document.getElementById('adauga-stiva-btn');
const stackContent = document.querySelector('.stack-content');
const input = document.querySelector('.not-assigned');
const routConfirm = document.querySelector('.routine-confirm');
const routDelete = document.querySelector('.routine-delete');

let lastCapacity = 0;

/* EVENT LISTENERS */
stackEdit.addEventListener('click',function(){
    stackAddScreen.classList.add('stack-add-show');
});
stackEditCloseBtn.addEventListener('click', function(){
    stackAddScreen.classList.remove('stack-add-show');
});

// Setting stack's size
modifyStackConfirmBtn.addEventListener('click',function(){
    // Setting height
    let capacity = document.getElementById('capacity').value;
    console.log(capacity); // gets stack capacity
    stackAddScreen.classList.remove('stack-add-show'); 
    let height = (capacity*70); //70 px is the height of a routine. 40px is the header. I need to add header height so that it looks good
    let pxheight = height + 'px';
    stackContent.style.height =  pxheight;
    // Creating HTML elements
    createHTMLelements(capacity);

    
    
    
});
// Changing input to permanent text when pressing check button and deleting it when pressing times button
// Event Delegation!
stackContent.addEventListener('click',function(e){
    let inputParent = e.target.parentElement.parentElement;
    let input = e.target.parentElement.parentElement.firstChild;

    if (e.target.classList.contains('routine-confirm')) {
        
        
        if(input.value != '') {
            // Changing text to black and non-blinking
            input.style.pointerEvents = 'none';
            input.classList.remove('not-assigned');
            input.classList.add('assigned');
            // Moving buttons to upper element
            console.log(inputParent.parentElement.firstChild);
            if (inputParent.previousSibling != inputParent.parentElement.firstChild) { //firstChild here actually returns '#text' because of whitespaces, returns etc., it's before my first actual element.
                moveButtonsUp(inputParent,inputParent.previousSibling);
                console.log('test');
            } 
        }
        


    }
    if (e.target.classList.contains('routine-delete')) {
        // Deleting existing text, back to blinking
        input.style.pointerEvents = 'auto';
        input.classList.remove('assigned');
        input.classList.add('not-assigned');
        input.value = '';
        
        // Moving buttons to lower element
        console.log(inputParent.parentElement.lastChild.nextSibling);
        if (inputParent.nextSibling != null) { // null is what comes after my lastChild
            moveButtonsDown(inputParent, inputParent.nextSibling);
        } 


    }
});

/* FUNCTIONS */
function createHTMLelements(cap){
    // Deleting all routines
    for (let i = 0; i<lastCapacity; i++){
        stackContent.removeChild(stackContent.lastChild);
    }
    // Creating new routines
    for(let i = 0; i<cap; i++){
        let div = document.createElement('div');
        div.classList.add('stack-routine');

        let input = document.createElement('input');
        input.classList.add('not-assigned');
        input.setAttribute('type','text');

        div.appendChild(input);

        stackContent.appendChild(div);
        console.log('Stack routine created');
        if (i == cap-1){
            div.classList.add('active-element');
            let divButtons = document.createElement('div');
            divButtons.classList.add('stack-routine-btns');
            let checkBtn = document.createElement('i');
            checkBtn.classList.add('fas');
            checkBtn.classList.add('fa-check');
            checkBtn.classList.add('routine-confirm');
            let timesBtn = document.createElement('i');
            timesBtn.classList.add('fas');
            timesBtn.classList.add('fa-times');
            timesBtn.classList.add('routine-delete');

            divButtons.appendChild(checkBtn);
            divButtons.appendChild(timesBtn);

            div.appendChild(divButtons);
        }
    }
    lastCapacity = cap;
}

function moveButtonsUp(currentElement, upperElement) {
    let buttons = currentElement.lastChild;
    buttons.remove();
    currentElement.classList.remove('active-element');

    upperElement.append(buttons);
    upperElement.classList.add('active-element');
}
function moveButtonsDown(currentElement, lowerElement) {
    let buttons = currentElement.lastChild;
    buttons.remove();
    currentElement.classList.remove('active-element');

    lowerElement.append(buttons);
    lowerElement.classList.add('active-element');
}