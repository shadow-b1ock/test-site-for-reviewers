var blueBanner = new Image(300, 300);
blueBanner.src = "./blue.png";

var shadowHost = document.createElement('div');
document.body.appendChild(shadowHost);
var shadowRoot = shadowHost.attachShadow({ mode: 'closed' });
shadowRoot.appendChild(blueBanner);

var detector = document.createElement('p');
document.body.appendChild(detector);

function detected() {
    detector.textContent = "Blue image is being blocked"
}
function notDetected() {
    detector.textContent = "Blue image is NOT being blocked"
}

var perf = [];

function detect() {
    let start = performance.now();
    
    if (checkStyle(blueBanner)) detected();
    else if (checkStyle(shadowHost)) detected();
    else notDetected();

    perf.push(performance.now() - start);
}

function checkStyle(element) {
    var { display, visibility, position, opacity, clipPath, transform } = getComputedStyle(element);
    if (display === "none") return true;
    if (visibility !== "visible") return true;
    if (position !== "static") return true;
    if (opacity !== "1") return true;
    if (clipPath !== "none") return true;
    if (transform !== "none") return true;
    if (element.getBoundingClientRect().height === 0) return true;
    return false;
}
setInterval(detect, 300);
