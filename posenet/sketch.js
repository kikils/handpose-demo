let video;
let poseNet;
let poses = [];

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent('show-capture')
  video = createCapture(VIDEO);
  video.size(width, height);

  posenet.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    inputResolution: { width: width, height: height },
    multiplier: 0.75,
    quantBytes: 2
  }).then(net => {
    modelReady()
    poseNet = net
    // console.log(poseNet.estimateSinglePose())
  })
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  push();
	translate(width, 0);
	scale(-1.0, 1.0);
  image(video, 0, 0, width, height);
  pop()
  if (poseNet){
    poseNet.estimateSinglePose(video.elt, {
      flipHorizontal: true
    }).then(estimated_poses => {
      poses = estimated_poses
    })
  }
  if(poses.keypoints) {
    drawKeypoints();
    checkPose()
  }

  // We can call both functions to draw all keypoints and the skeletons
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  const keyPoints = poses.keypoints
  for (let i = 0; i < keyPoints.length; i++) {
      const keypoint = keyPoints[i];
      if (keypoint.score > 0.5) {
        push()
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        pop()
      }
    }
}

let parts = []
function checkParamX(left, right) {
  return left in parts && right in parts && parts[left].x < parts[right].x
}
function checkParamY(up, down) {
  return up in parts && down in parts && parts[up].y < parts[down].y
}
function checkRangeY(base, comp) {
  let x = 0
  if ('leftShoulder' in parts && 'rightShoulder' in parts) {
    x = (parts['rightShoulder'].x - parts['leftShoulder'].x) / 3
  } else if ('leftEye' in parts && 'rightEye' in parts) {
    x = (parts['rightEye'].x - parts['leftEye'].x) * 1.2
  }
  return base in parts && comp in parts && parts[base].y - x <= parts[comp].y && parts[comp].y <= parts[base].y + x
}

function checkPose() {
  parts = []
  const keyPoints = poses.keypoints
  for (let i = 0; i < keyPoints.length; i++) {
      const keypoint = keyPoints[i];
      if (keypoint.score > 0.5) {
        parts[keypoint.part] = {x: keypoint.position.x, y: keypoint.position.y}
      }
  }

  // 左手が目の外側にあるか判定
  const isLeftHandEarSideX = checkParamX('leftElbow', 'leftEye') || checkParamX('leftWrist', 'leftEye')
  // 右手が目の外側にあるか判定
  const isRightHandEarSideX = checkParamX('rightEye', 'rightElbow') || checkParamX('rightEyerightWrist', 'rightWrist')
  // 左手が肩らへんにあるか判定
  const isLeftHandUnderEarY = checkRangeY('leftShoulder', 'leftElbow', 30)
  // 右手が肩らへんにあるか判定
  const isRightHandUnderEarY = checkRangeY('rightShoulder', 'rightElbow', 30)
  // 左手が肩よりも上がっているかどうか判定
  const isLeftHandUp = (checkParamX('leftElbow', 'leftShoulder') && (checkParamY('leftElbow', 'leftShoulder'))) || (checkParamX('leftWrist', 'leftShoulder') && checkParamY('leftWrist', 'leftShoulder'))
  const isRightHandUp = (checkParamX('rightShoulder', 'rightElbow') && checkParamY('rightElbow', 'rightShoulder')) || ((checkParamX('rightShoulder', 'rightWrist') && checkParamY('rightWrist', 'rightShoulder')))
  if (isLeftHandEarSideX && isRightHandEarSideX && isLeftHandUnderEarY && isRightHandUnderEarY) {
    console.log('TT')
  // } else if (isLeftHandEarSideX && isLeftHandUnderEarY && isLeftHandUp && isRightHandUp) {
  //   console.log('ウルトラマンポーズ')
  } else if (isLeftHandUp && isRightHandUp) {
    console.log('両手上げている')
  } else if (isLeftHandUp) {
    console.log('左手上げている')
  } else if (isRightHandUp) {
    console.log('右手上げている')
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}