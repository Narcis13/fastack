const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startRecording');

const fps = 30;
const duration = 5; // 5 seconds
const frames = [];

let ballX = 200;
let ballY = 200;
let ballRadius = 20;
let dx = 5;
let dy = 3;

function drawBall(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update ball position
    ballX += dx;
    ballY += dy;
    
    // Bounce off walls
    if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) dx = -dx;
    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) dy = -dy;
    
    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
    
    // Draw time
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Time: ${time.toFixed(2)}s`, 10, 30);
}

function captureFrame() {
    return new Promise(resolve => {
        canvas.toBlob(resolve, 'image/jpeg');
    });
}

async function recordCanvas() {
    const totalFrames = fps * duration;
    
    for (let i = 0; i < totalFrames; i++) {
        const time = i / fps;
        drawBall(time);
        
        const frame = await captureFrame();
        frames.push(frame);
        
        await new Promise(resolve => setTimeout(resolve, 1000 / fps));
    }
    
    await encodeToMP4(frames);
}

async function encodeToMP4(frames) {
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    frames.forEach((frame, i) => {
        ffmpeg.FS('writeFile', `frame${i}.jpg`, new Uint8Array(frame));
    });

    await ffmpeg.run('-framerate', `${fps}`, '-i', 'frame%d.jpg', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', 'output.mp4');

    const data = ffmpeg.FS('readFile', 'output.mp4');
    
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bouncing-ball.mp4';
    a.click();
}

startButton.addEventListener('click', recordCanvas);