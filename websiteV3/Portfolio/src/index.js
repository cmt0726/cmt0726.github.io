var boxOne = document.getElementById('projects');
var boxTwo = document.getElementById('dropDown')
document.getElementById('clickable').onclick = function() {

    boxOne.className = 'moveable';

}

boxOne.addEventListener('animationend', () => {
    boxOne.style.zIndex = "1";
    boxOne.className = "";
    boxOne.style.top = 450 + 'px';
    window.location.href = "#projects" //test purposes
    boxTwo.addEventListener('animationend', () => {
        boxTwo.remove();
    })
    
})

boxOne.addEventListener('animationiteration', ()=> {
    
})

boxOne.addEventListener('animationstart', () => {
    //boxOne.style.flexDirection = "column";
    boxTwo.style.animationName = "dropUp";
    boxTwo.style.animationDuration = '.3s';
    boxTwo.style.animationIterationCount = 1;
    boxTwo.addEventListener('animationend', () => {
        document.getElementById('clickable').style.zIndex = '-100';
        boxTwo.remove();
    })
})
        