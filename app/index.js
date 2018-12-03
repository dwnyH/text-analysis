// Load application styles
import 'styles/index.less';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

// ================================
// START YOUR APP HERE
// ================================

var content = document.querySelector('.content');
var result = document.querySelector('.result');
content.addEventListener('keydown', countCharacters);

function countCharacters () {
    var wordStorage = {};
    var content = document.querySelector('.content');

    if (content.value.length > 5000) {
        if (confirm('5000자 미만으로 입력해주세요.')) {
            return;
        } else {
            return;
        }
    }

    saveWords(wordStorage);
}

function saveWords (wordSave) {
    var content = document.querySelector('.content');
    var textCount = content.value.length;
    var countBox = document.querySelector('.textCount');
    var text = content.value.split('');

    countBox.innerHTML = 'Text Count : ' + textCount;
    wordSave = {};

    for (var i = 0; i < text.length; i++) {
        if (text[i].charCodeAt() > 122) {
            text[i] = '';
        }

        if (text[i].charCodeAt() < 65  && text[i].charCodeAt() !== 32) {
            if (text[i].charCodeAt() === 13 || text[i].charCodeAt() === 10) {
                text[i] = ' ';
            } else {
                text[i] = '';
            }
        }

        if (text[i].charCodeAt() > 90 && text[i].charCodeAt() < 97) {
            text[i] = '';
        }

        if (text[i] === '\n') {
            text[i] = ' ';
        }
    }

    var inputWords = text.join('').split(' ');
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

    vocabArray.filter (function (item) {
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
    var highestFrequentItems = [];

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
            highestFrequentItems.push(word);
        }
    }

    var allWords = document.querySelectorAll('.keyWords');

    for (var i = 0; i < highestFrequentItems.length; i++) {
        result.insertBefore(highestFrequentItems[i], allWords[parseInt(Object.keys(storage).length / 2)]);
    }

    var newNotice = document.querySelector('.notice');
    newNotice.style.display = 'block';
}


function moveElements(event) {
    var newNotice = document.querySelector('.notice');
    var target = event.target;
    target.classList.add('like');
    var likes = document.querySelectorAll('.like');

    if (likes.length === 5) {
        setTimeout(arrangeLikes,300);
        newNotice.innerHTML = 'Choose your favorite word!';
    }
}

function arrangeLikes() {
    var likeWords = document.querySelectorAll('.like');
    var wordBox = document.querySelector('.newWordBox');
    var newNotice = document.querySelector('.notice');
    newNotice.innerHTML = 'Try to make a sentence with your favorite word';

    for (var i = 0; i < likeWords.length; i++) {
        likeWords[i].className = '';
        likeWords[i].removeEventListener('click', moveElements);
        wordBox.appendChild(likeWords[i]);
        likeWords[i].addEventListener('click', writingForm);
    }
}

function writingForm(event) {
    var writeSentence = document.querySelector('.writingFunction');
    var favoriteWord = event.target;
    var favoriteWordBox = document.querySelector('.favoriteWord');
    var completeButton = document.querySelector('.complete');

    writeSentence.style.display = 'block';
    favoriteWordBox.innerHTML = favoriteWord.innerText;
    completeButton.addEventListener('click', showCompletedSentence);
}

function showCompletedSentence() {
    var writeSentence = document.querySelector('.writingArea');
    var completeButton = document.querySelector('.complete');
    var completedSentence = document.createElement('div');
    var sentenceByUser = document.querySelector('.newSentence');
    var completeBox = document.querySelector('.completeBox');

    writeSentence.style.display = 'none';
    completeButton.style.display = 'none';
    completedSentence.innerHTML = sentenceByUser.value;
    completedSentence.classList.add('completedSentence');
    completeBox.appendChild(completedSentence);
    completedSentence.classList.add('show');
}
