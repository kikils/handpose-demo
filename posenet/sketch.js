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
  }

  // We can call both functions to draw all keypoints and the skeletons
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  const keyPoints = poses.keypoints
  for (let i = 0; i < keyPoints.length; i++) {
      const keypoint = keyPoints[i];
      if (keypoint.score > 0.3) {
        push()
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 30, 30);
        pop()
      }
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