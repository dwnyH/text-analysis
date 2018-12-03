// Load application styles
import 'styles/index.less';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

// ================================
// START YOUR APP HERE
// ================================

var content = document.querySelector('.content');
content.addEventListener('keydown', countChars);

function countChars (event) {
    var wordStorage = {};
    var content = document.querySelector('.content');
    var keycode = event.keyCode;

    if (content.value.length > 5000) {
        if(confirm("5000자 미만으로 입력해주세요.")) {
            return;
        } else {
            return;
        }
    }

    saveWords(wordStorage);
}

var result = document.querySelector('.result');

function saveWords (wordSave) {
    wordSave = {};
    var content = document.querySelector('.content');
    var textCount = content.value.length;
    var countBox = document.querySelector('.textCount');

    countBox.innerHTML = "Text Count : " + textCount;

    var checkAgain = content.value.split("");

    for (var i = 0; i < checkAgain.length; i++) {
        if(checkAgain[i].charCodeAt() > 122){
            checkAgain[i] = "";
        }
        if(checkAgain[i].charCodeAt() < 65  && checkAgain[i].charCodeAt() !== 32){
            if (checkAgain[i].charCodeAt() === 13 || checkAgain[i].charCodeAt() === 10) {
                checkAgain[i] = " ";
            } else {
                checkAgain[i] = "";
            }
        }
        if(checkAgain[i].charCodeAt() > 90 && checkAgain[i].charCodeAt() < 97){
            checkAgain[i] = "";
        }
        if (checkAgain[i] === "\n") {
            checkAgain[i] = " "
        }
    }

    var inputText = checkAgain.join('');
    var inputWords = inputText.split(" ");
    var filteredWords = checkWords(inputWords);

    for (var i = 0; i < filteredWords.length; i++) {
        if (!wordSave.hasOwnProperty(filteredWords[i])) {
            wordSave[filteredWords[i]] = 1;
        } else {
            wordSave[filteredWords[i]]++;
        }
    }
    showResult(wordSave);
    var keyWords = document.querySelectorAll('.keyWords');

    for (var i = 0; i < keyWords.length; i++) {
        keyWords[i].addEventListener('click', moveElements);
    }
}

function checkWords (vocabArray) {
    var filterArray = [];
    var preposition = ['in', 'out', 'off', 'up', 'on', 'by', 'at', 'for', 'to', 'of', 'aboard', 'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'anti', 'around', 'before', 'behind', 'below', 'beneath', 'beside', 'besides', 'between', 'beyond', 'concerning', 'considering', 'despite', 'down', 'during', 'except', 'excepting', 'excluding', 'following', 'for', 'from', 'in', 'inside', 'into', 'like', 'minus', 'near', 'onto', 'opposite', 'outside', 'over', 'past', 'plus', 'regarding', 'round', 'save', 'since', 'than', 'through', 'toward', 'towards', 'under', 'underneath', 'unlike', 'until', 'up', 'upon', 'versus', 'via', 'with', 'within', 'without', 'not', 'no'];
    var pronoun = ['an', 'i', 'im', 'my', 'me', 'mine', 'it', 'its', 'you', 'your', 'youre', 'there', 'we', 'us', 'our', 'he', 'hes', 'him', 'his', 'she', 'shes', 'her', 'they', 'theyre', 'them', 'their', 'what', 'whom', 'mine', 'yours', 'hers', 'ours', 'theirs', 'this', 'that', 'these', 'those', 'which', 'whose', 'whoever', 'whatever', 'whichever', 'whomever', 'myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'themselves', 'other', 'another', 'anything', 'everybody', 'another', 'each', 'few', 'many', 'none', 'some', 'all', 'any', 'anybody', 'anyone', 'everyone', 'everything', 'nobody', 'nothing', 'none', 'others', 'several', 'somebody', 'someone', 'something', 'most', 'enough', 'little', 'more', 'both', 'either', 'neither', 'much', 'such'];
    var modalVerbs = ['can', 'could', 'able', 'may', 'might', 'shall', 'should', 'shouldnt', 'must', 'has', 'hasnt', 'have', 'havent', 'will', 'wont', 'would', 'wouldnt', 'the', 'and'];
    var beVerbs = ['is', 'are', 'am', 'was', 'were', 'been', 'be', 'being', 're'];
    var conjunction = ['though', 'although', 'though', 'while', 'if', 'only', 'unless', 'until', 'provided', 'assuming', 'that', 'even', 'case', 'than', 'rather', 'whether', 'much', 'whereas', 'because', 'since', 'so', 'why', 'how', 'who', 'whoever', 'whom', 'whomever', 'whose', 'where', 'wherever', 'which', 'whatever','after', 'before', 'now', 'once', 'since', 'till', 'until', 'when', 'whenever', 'while', 'or'];

    vocabArray.filter(function (item) {
        item = item.toLowerCase();
        if (conjunction.indexOf(item) === -1 && beVerbs.indexOf(item) === -1 && preposition.indexOf(item) === -1 && pronoun.indexOf(item) === -1 && modalVerbs.indexOf(item) === -1 && item.length >= 2) {
            if (!Number(item)) {
                filterArray.push(item);
            }
        }
    });
    return filterArray;
}

function showResult(storage) {
    var a = [];

    while (result.children.length > 1) {
        if (result.lastElementChild.className !== 'superhighArea') {
            result.removeChild(result.lastElementChild);
        }
    }

    for (var keys in storage) {
        var word = document.createElement('div');
        var frequency = document.createElement('span');

        word.innerText = keys;
        frequency.innerText = storage[keys];
        word.appendChild(frequency);
        word.classList.add('keyWords');

        if (storage[keys] < 2) {
            word.classList.add('low');
            result.appendChild(word);
        }

        if (storage[keys] >= 2 && storage[keys] < 4) {
            word.classList.add('middle');
            result.appendChild(word);
        }

        if (storage[keys] >= 4 && storage[keys] < 6) {
            word.classList.add('high');
            result.appendChild(word);
        }

        if (storage[keys] >= 6) {
            word.classList.add('superHigh');
            a.push(word);
            //result.appendChild(word);
            // highFrequencyArea.appendChild(word);
        }
    }
    debugger;
    var allWords = document.querySelectorAll('.keyWords');
    for (var i = 0; i < a.length; i++) {
        result.insertBefore(a[i], allWords[parseInt(Object.keys(storage).length / 2)]);
    }
    // console.log(Object.keys(storage).length);
    // var allWords = document.querySelectorAll('.keyWords');
    // result.insertBefore(highFrequencyArea, parseInt(allWords[Object.keys(storage).length / 2]));

    var newNotice = document.querySelector('.notice');
    newNotice.style.display = 'block';

    var orderingButton = document.querySelector('.orderingStart');
    var keyWords = document.querySelectorAll('.keyWords');
    orderingButton.style.display = 'block';
    orderingButton.addEventListener('click', changeClassName);

    function changeClassName(event) {
        if (event.target.className === 'orderingStart') {
            event.target.className = 'orderingStop';
            event.target.innerText = 'Drag Ordering Stop';
            for (var i = 0; i < keyWords.length; i++) {
                keyWords[i].removeEventListener('click', moveElements);
                keyWords[i].addEventListener('drag', dragOver);
                keyWords[i].addEventListener('dragend', dragEnd);
            }
            return;
        }

        if (event.target.className === 'orderingStop') {
            event.target.className = 'orderingStart';
            event.target.innerText = 'Drag Ordering Start';
            for (var i = 0; i < keyWords.length; i++) {
                keyWords[i].addEventListener('click', moveElements);
            }
            return;
        }
    }

}

function dragOver(event) {
    debugger;
    event.preventDefault();
    console.log(1);
}
function dragEnd() {
    debugger;
    console.log(2);
}

function moveElements(event) {
    var target = event.target;
    target.classList.add('like');
    var likes = document.querySelectorAll('.like');
    var newTextbox = document.querySelector('.newSentence');
    if (likes.length === 5) {
        // newTextbox.style.display = "block";
        setTimeout(arrangeLikes,300);
        var newNotice = document.querySelector('.notice');
        newNotice.innerHTML = "Choose your favorite word!"
    }
}

function arrangeLikes() {
    var likeWords = document.querySelectorAll('.like');
    var wordBox = document.querySelector('.newWordBox');
    var newNotice = document.querySelector('.notice');
    newNotice.innerHTML = "Try to make a sentence with your favorite word"

    for (var i = 0; i < likeWords.length; i++) {
        likeWords[i].className = '';
        likeWords[i].removeEventListener('click', moveElements);
        wordBox.appendChild(likeWords[i]);

        likeWords[i].addEventListener('click', writingForm);
    }
}

function writingForm(event) {
    // var notePad = document.querySelector('.newSentence');
    // notePad.style.display = 'block';
    var writeSentence = document.querySelector('.writingFunction');
    writeSentence.style.display = 'block';
    var favoriteWord = event.target;
    console.log(favoriteWord);
    var favoriteWordBox = document.querySelector('.favoriteWord');
    favoriteWordBox.innerHTML = favoriteWord.innerText;

    var completeButton = document.querySelector('.complete');
    completeButton.addEventListener('click', showCompletedSentence);
}

function showCompletedSentence() {
    var writeSentence = document.querySelector('.writingArea');
    writeSentence.style.display = 'none';
    var completeButton = document.querySelector('.complete');
    completeButton.style.display = 'none';

    var completedSentence = document.createElement('div');
    var sentenceByUser = document.querySelector('.newSentence');
    completedSentence.innerHTML = sentenceByUser.value;
    completedSentence.classList.add('completedSentence');
    var completeBox = document.querySelector('.completeBox');

    completeBox.appendChild(completedSentence);
    completedSentence.classList.add('show');
}


