/*
 * https://editor.p5js.org/LingDong-/sketches/1viPqbRMv
 */

let handposeModel = null;
let videoDataLoaded = false;

let statusText = "Loading handpose model...";

let myHands = [];

let capture;

// 指先と第一関節のインデックス
const fingerIndex = [3, 4, 7, 8, 11, 12, 15, 16, 19, 20];

// 曲げている本数
// 親指を考慮しない
const rock = 4;
const paper = 0;
const scissor = 2;

// グー、パー、チョキ
const emojiHand = [9994, 128400, 9996];
const emojiFace = [128535, 128527];

let bendFingersNum = 0;

let jankenHand = "";
let jankenFace = emojiFace[0];

handpose.load(detectionConfidence=1.0).then(function (_model) {
	statusText = "Model loaded."
	handposeModel = _model;
})


function setup() {
	capture = createCapture(VIDEO);

	capture.elt.onloadeddata = function () {
		videoDataLoaded = true;
		let canvas = createCanvas(600, 480);
        canvas.parent('show-capture')
	}

	capture.hide();
}

let toggleOn = false

function detectHands(hands) {
	for (let i = 0; i < hands.length; i++) {
		let landmarks = hands[i].landmarks;
		let counter = 0;
		let positions = [];

		for (let j = 0; j < landmarks.length; j++) {
			let [ex, ey, ez] = landmarks[j];
			fill(0, 255, 0);
			noStroke();
			ellipse(ex, ey, 12, 12);

			// 指先と第一関節だけ別の配列に入れ込む
			if (j == fingerIndex[counter]) {
				positions.push(landmarks[j]);

				counter++;
			}
		}

		// 曲げ伸ばし判定
		bendFingersNum = 0;
		for (let k = 0; k < positions.length / 2; k++) {
			// 第一関節
			let [jx, jy, jz] = positions[k * 2];
			// 指先
			let [tx, ty, tz] = positions[k * 2 + 1];

			// 指を曲げている本数を数える...親指は考慮しない
			// 親指以外が曲がっている時にカウントアップ
			if (k != 0 && ty > jy) {
				bendFingersNum++;
			}
		}

		// それぞれの手の形においての曲がっている指の本数を照合...親指は考慮しない
		// グー
		if (bendFingersNum == 4) {
			jankenHand = emojiHand[0];
			jankenFace = emojiFace[1];
            return 'グー'
		}
		// パー
		else if (bendFingersNum == 0) {
			jankenHand = emojiHand[1];
			jankenFace = emojiFace[1];
            return 'パー'
		}
		// チョキ
		else if (bendFingersNum == 2) {
			jankenHand = emojiHand[2];
			jankenFace = emojiFace[1];
            return 'チョキ'
		}
		// 無効な手
		else {
			jankenHand = "";
			jankenFace = emojiFace[0];
		}
	}
}

handList = [];
let timer = 10;
function draw() {
	if (toggleOn && handposeModel && videoDataLoaded) {
		handposeModel.estimateHands(capture.elt).then(function (_hands) {
			myHands = _hands;
			if (!myHands.length) {
				statusText = "Show your hand!"
				jankenHand = "";
				jankenFace = emojiFace[0];
			} else {
				statusText = "Confidence: " + (Math.round(myHands[0].handInViewConfidence * 1000) / 1000);
			}
		});
	}

	// background("#08CAE1");

	push();
	translate(width, 0);
	scale(-1.0, 1.0);
	image(capture, 0, 0, width, height);

    outHand = detectHands(myHands)
    if(outHand != null && outHand != '' && outHand != handList[handList.length - 1]){
        handList.push(outHand)
        document.getElementById('hands').textContent = handList
    }
	pop();

	push();
	textAlign(CENTER, CENTER);
	// textSize(135);
	// text(String.fromCodePoint(jankenFace), width * 0.25, height * 0.6);
    textSize(200);
	text(String.fromCodePoint(jankenHand), width * 0.15, height * 0.5);
	pop();

    push()
    textAlign(CENTER, CENTER);
    textSize(200);
    if(handposeModel && frameCount % 60 == 0 && timer > 0) {
        timer--;
    }
    text(timer, width * 0.5, height * 0.5);
    if(timer==0) {
        timer = ''
        text('POSE!!', width * 0.5, height * 0.5)
        toggleOn = true
        setTimeout(()=>{
            timer = 10
            toggleOn = false
        }, 2000)
    }
    pop();

	fill(255, 0, 0);
	text(statusText, 2, 60);
}