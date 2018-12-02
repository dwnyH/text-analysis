// Load application styles
import 'styles/index.less';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

// ================================
// START YOUR APP HERE
// ================================

var content = document.querySelector('.content');
var keywords = document.querySelectorAll('div');
content.addEventListener('keypress', countChars);

function countChars (event) {
    var wordStorage = {};
    var content = document.querySelector('.content');
    var keycode = event.keyCode;

    if (content.value.length > 5000) {
        debugger;
        if(confirm("5000자 미만으로 입력해주세요.")) {
            return;
        } else {
            return;
        }
    }

    if (keycode === 32 || keycode === 13) {
        saveWords(wordStorage);
    }
}

var result = document.querySelector('.result');

function saveWords (wordSave) {
    wordSave = {};
    debugger;
    var content = document.querySelector('.content');
    content.value = content.value.replace("\n", " ");
    content.value = content.value.replace("\'", "");
    var inputWords = content.value.split(" ");
    var filteredWords = checkWords(inputWords);
    for (var i = 0; i < filteredWords.length; i++) {
        if (!wordSave.hasOwnProperty(filteredWords[i])) {
            wordSave[filteredWords[i]] = 1;
        } else {
            wordSave[filteredWords[i]]++;
        }
    }
    showResult(wordSave);
    console.log(wordSave);
}

function checkWords (vocabArray) {
    var filterArray = [];
    var preposition = ['in', 'out', 'off', 'up', 'on', 'by', 'at', 'for', 'to', 'of', 'aboard', 'about', 'above', 'across', 'after', 'against', 'along', 'amid', 'among', 'anti', 'around', 'before', 'behind', 'below', 'beneath', 'beside', 'besides', 'between', 'beyond', 'concerning', 'considering', 'despite', 'down', 'during', 'except', 'excepting', 'excluding', 'following', 'for', 'from', 'in', 'inside', 'into', 'like', 'minus', 'near', 'onto', 'opposite', 'outside', 'over', 'past', 'plus', 'regarding', 'round', 'save', 'since', 'than', 'through', 'toward', 'towards', 'under', 'underneath', 'unlike', 'until', 'up', 'upon', 'versus', 'via', 'with', 'within', 'without'];
    var pronoun = ['i', 'im', 'my', 'me', 'mine', 'it', 'its', 'you', 'youre', 'we', 'us', 'our', 'he', 'hes', 'him', 'his', 'she', 'shes', 'her', 'they', 'theyre', 'them', 'their', 'what', 'whom', 'mine', 'yours', 'hers', 'ours', 'theirs', 'this', 'that', 'these', 'those', 'which', 'whose', 'whoever', 'whatever', 'whichever', 'whomever', 'myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'themselves', 'other', 'another', 'anything', 'everybody', 'another', 'each', 'few', 'many', 'none', 'some', 'all', 'any', 'anybody', 'anyone', 'everyone', 'everything', 'nobody', 'nothing', 'none', 'others', 'several', 'somebody', 'someone', 'something', 'most', 'enough', 'little', 'more', 'both', 'either', 'neither', 'much', 'such'];
    var modalVerbs = ['can', 'could', 'able', 'may', 'might', 'shall', 'should', 'must', 'has', 'have', 'will', 'would', 'the', 'and'];
    var beVerbs = ['is', 'are', 'am', 'was', 'were', 'been', 'be', 'being', 're'];
    var conjunction = ['though', 'although', 'though', 'while', 'if', 'only', 'unless', 'until', 'provided', 'assuming', 'that', 'even', 'case', 'than', 'rather', 'whether', 'much', 'whereas', 'because', 'since', 'so', 'why', 'how', 'who', 'whoever', 'whom', 'whomever', 'whose', 'where', 'wherever', 'which', 'whatever','after', 'before', 'now', 'once', 'since', 'till', 'until', 'when', 'whenever', 'while'];
    vocabArray.filter(function (item) {
        debugger;
        var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        if(regExp.test(item)){
            item = item.replace(regExp, "");
        }

        item = item.replace("\n", "");
        item = item.replace("/\"/gi", "");
        item = item.replace('\"', "");
        item = item.replace("\'", "");
        item = item.toLowerCase();
        if (conjunction.indexOf(item) === -1 && beVerbs.indexOf(item) === -1 && preposition.indexOf(item) === -1 && pronoun.indexOf(item) === -1 && modalVerbs.indexOf(item) === -1 && item.length >= 2) {
            filterArray.push(item);
        }
    });
    return filterArray;
}

function showResult(storage) {

    while ( result.hasChildNodes() ) {
        result.removeChild( result.firstChild );
    }

    for (var keys in storage) {
        var word = document.createElement('div');
        var frequency = document.createElement('span');

        word.innerText = keys;
        frequency.innerText = storage[keys];
        word.appendChild(frequency);

        if (storage[keys] < 2) {
            word.classList.add('low');
        }

        if (storage[keys] >= 2 && storage[keys] < 4) {
            word.classList.add('middle');
        }

        if (storage[keys] >= 4 && storage[keys] < 6) {
            word.classList.add('high');
        }

        if (storage[keys] >= 6) {
            word.classList.add('superHigh');
        }

        result.appendChild(word);
    }
}
