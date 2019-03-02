function checkAreas(regular) {
    var samples = document.getElementsByClassName("sample");
    for (const sampleIndex in samples) {
        if (samples.hasOwnProperty(sampleIndex)) {
            const sampleItem = samples[sampleIndex].children;
            let sampleText = sampleItem[0];
            let sampleAnswer = sampleItem[1];
            answerCheking(sampleAnswer, regular, sampleText.value);
        }
    }
}

function answerCheking(answer, regular, text) {
    let boolValue = RegularCheking(regular, text);
    answer.textContent = boolValue ? "match" : "no match";
    answer.style["background-color"] = boolValue ? "green" : "red";
}

function RegularCheking(reg, str) {
    return reg.test(str);
}

regexp.addEventListener("input", () => {
    checkAreas(new RegExp(document.getElementById("regexp").value));
})

document.addEventListener("DOMContentLoaded", setup);

function getDataFromServer(url) {
    if (typeof url == 'string') {
        return fetch(url);
    }
    else {
        return Promise.reject('invalid url');
    }
}

function setup() {
    
    fetch('../sample.json').then(response => {
        console.log("1");
        if (response.ok) {
            return response.json();
        }
        else {
            throw new error("NO GOD NO");
        }
    } ).then(json => {
        renderSample(json[0]);

    }).catch(error => console.error(error)) 
    console.log(12);
}

function renderSample(sampleData) {
    const regexpElem = document.querySelector(".container textarea#regexp");

    const description = document.getElementById('description');
    description.textContent = sampleData.description;
    regexpElem.value = '';

    // const samples = document.querySelectorAll('.sample')
    // samples.forEach((samples, index) => {
    //     console.log(samples);
    //     samples.value = sampleData.samples[index];
    // })
    
    const samplesElem = document.querySelector('.samples');
    sampleData.samples.forEach(sampleTxt  => {
        const sampleTemplate = 
        `<div class="sample">
            <input type="text" value="${sampleTxt}" placeholder="Sample"><div class="answer">no match</div>
        </div>`;
        //let sampleItem = createHtmlObject(sampleTemplate);
        samplesElem.insertAdjacentHTML("beforeend", sampleTemplate);
    })
    samplesElem.addEventListener('input', (event) => {
        let sampleText = event.target;
        let sampleAnswer = sampleText.nextElementSibling;
        sampleText.addEventListener("input", () => {
            answerCheking(sampleAnswer, new RegExp(document.getElementById("regexp").value), sampleText.value);
        })
    })

    
}

function inputHandler(event) {
    console.log(event.target.value());
}


const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("HI");
    }, 3000);

    setTimeout(() => {
        reject("ERROR");
    }, 4000);
})




function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve
        }, ms)
    })
}

promise.then(result => {
    console.log(result);
    return delay(1000);
}).then(() => {
    console.log("step 3");
    return delay(2000)
}).then(() => {
    console.log("step 4");
    return delay(2000)
});


