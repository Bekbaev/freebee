import React, {useState} from 'react';
import '../css/drum.css'

const Drum = () => {
    const canvasRef = React.useRef(null)

    var start = null;
    var duration = 1000;
    var boundaryIncrementer = duration / 6;

    function drawDivisionLoader(timestamp) {

        // Timing Setup
        if (!start) {
            start = timestamp;
        }

        // Canvas setup
        var canvas = canvasRef.current;
        if (canvas) {
            var ctx = canvas.getContext('2d')
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw inner orange circle
            ctx.lineWidth = 6;
            ctx.strokeStyle = '#d89747';
            ctx.beginPath();
            ctx.arc(88, 88, 52, 0, 4 * Math.PI);
            ctx.stroke();
            ctx.closePath();

            // Draw outer circle
            ctx.lineWidth = 6;
            ctx.strokeStyle = '#363537';
            ctx.beginPath();
            ctx.arc(88, 88, 82, 0, 4 * Math.PI);
            ctx.stroke();

            // Draw animating arcs
            ctx.lineWidth = 6;

            // Find the remainder
            var remainder = (timestamp - start) % 1000;

            // Find out where the remainder lies within the boundaries
            if (remainder >= 0 && remainder <= (boundaryIncrementer)) {
                // Arc 1
                ctx.strokeStyle = '#d89747';
                ctx.beginPath();
                ctx.arc(88, 88, 68, (332 * Math.PI) / 180, (27 * Math.PI) / 180);
                ctx.stroke();

                // Arc 2
                ctx.strokeStyle = '#363537';
                ctx.beginPath();
                ctx.arc(88, 88, 68, (32 * Math.PI) / 180, (87 * Math.PI) / 180);
                ctx.stroke();

                // Arc 3
                ctx.beginPath();
                ctx.arc(88, 88, 68, (92 * Math.PI) / 180, (147 * Math.PI) / 180);
                ctx.stroke();

                // Arc 4
                ctx.beginPath();
                ctx.arc(88, 88, 68, (152 * Math.PI) / 180, (207 * Math.PI) / 180);
                ctx.stroke();

                // Arc 5
                ctx.beginPath();
                ctx.arc(88, 88, 68, (212 * Math.PI) / 180, (267 * Math.PI) / 180);
                ctx.stroke();

                // Arc 6
                ctx.beginPath();
                ctx.arc(88, 88, 68, (272 * Math.PI) / 180, (327 * Math.PI) / 180);
                ctx.stroke();
            }

            if (remainder > (boundaryIncrementer) && remainder <= (boundaryIncrementer * 2)) {
                // Arc 1
                ctx.beginPath();
                ctx.arc(88, 88, 68, (332 * Math.PI) / 180, (27 * Math.PI) / 180);
                ctx.stroke();

                // Arc 2
                ctx.strokeStyle = '#d89747';
                ctx.beginPath();
                ctx.arc(88, 88, 68, (32 * Math.PI) / 180, (87 * Math.PI) / 180);
                ctx.stroke();

                // Arc 3
                ctx.strokeStyle = '#363537';
                ctx.beginPath();
                ctx.arc(88, 88, 68, (92 * Math.PI) / 180, (147 * Math.PI) / 180);
                ctx.stroke();

                // Arc 4
                ctx.beginPath();
                ctx.arc(88, 88, 68, (152 * Math.PI) / 180, (207 * Math.PI) / 180);
                ctx.stroke();

                // Arc 5
                ctx.beginPath();
                ctx.arc(88, 88, 68, (212 * Math.PI) / 180, (267 * Math.PI) / 180);
                ctx.stroke();

                // Arc 6
                ctx.beginPath();
                ctx.arc(88, 88, 68, (272 * Math.PI) / 180, (327 * Math.PI) / 180);
                ctx.stroke();
            }

            if (remainder > (boundaryIncrementer * 2) && remainder <= (boundaryIncrementer * 3)) {
                // Arc 1
                ctx.beginPath();
                ctx.arc(88, 88, 68, (332 * Math.PI) / 180, (27 * Math.PI) / 180);
                ctx.stroke();

                // Arc 2
                ctx.beginPath();
                ctx.arc(88, 88, 68, (32 * Math.PI) / 180, (87 * Math.PI) / 180);
                ctx.stroke();

                // Arc 3
                ctx.strokeStyle = '#d89747';
                ctx.beginPath();
                ctx.arc(88, 88, 68, (92 * Math.PI) / 180, (147 * Math.PI) / 180);
                ctx.stroke();

                // Arc 4
                ctx.strokeStyle = '#363537';
                ctx.beginPath();
                ctx.arc(88, 88, 68, (152 * Math.PI) / 180, (207 * Math.PI) / 180);
                ctx.stroke();

                // Arc 5
                ctx.beginPath();
                ctx.arc(88, 88, 68, (212 * Math.PI) / 180, (267 * Math.PI) / 180);
                ctx.stroke();

                // Arc 6
                ctx.beginPath();
                ctx.arc(88, 88, 68, (272 * Math.PI) / 180, (327 * Math.PI) / 180);
                ctx.stroke();
            }

            if (remainder > (boundaryIncrementer * 3) && remainder <= (boundaryIncrementer * 4)) {
                // Arc 1
                ctx.beginPath();
                ctx.arc(88, 88, 68, (332 * Math.PI) / 180, (27 * Math.PI) / 180);
                ctx.stroke();

                // Arc 2
                ctx.beginPath();
                ctx.arc(88, 88, 68, (32 * Math.PI) / 180, (87 * Math.PI) / 180);
                ctx.stroke();

                // Arc 3
                ctx.beginPath();
                ctx.arc(88, 88, 68, (92 * Math.PI) / 180, (147 * Math.PI) / 180);
                ctx.stroke();

                // Arc 4
                ctx.strokeStyle = '#d89747';
                ctx.beginPath();
                ctx.arc(88, 88, 68, (152 * Math.PI) / 180, (207 * Math.PI) / 180);
                ctx.stroke();

                // Arc 5
                ctx.strokeStyle = '#363537';
                ctx.beginPath();
                ctx.arc(88, 88, 68, (212 * Math.PI) / 180, (267 * Math.PI) / 180);
                ctx.stroke();

                // Arc 6
                ctx.beginPath();
                ctx.arc(88, 88, 68, (272 * Math.PI) / 180, (327 * Math.PI) / 180);
                ctx.stroke();
            }

            if (remainder > (boundaryIncrementer * 4) && remainder <= (boundaryIncrementer * 5)) {
                // Arc 1
                ctx.beginPath();
                ctx.arc(88, 88, 68, (332 * Math.PI) / 180, (27 * Math.PI) / 180);
                ctx.stroke();

                // Arc 2
                ctx.beginPath();
                ctx.arc(88, 88, 68, (32 * Math.PI) / 180, (87 * Math.PI) / 180);
                ctx.stroke();

                // Arc 3
                ctx.beginPath();
                ctx.arc(88, 88, 68, (92 * Math.PI) / 180, (147 * Math.PI) / 180);
                ctx.stroke();

                // Arc 4
                ctx.beginPath();
                ctx.arc(88, 88, 68, (152 * Math.PI) / 180, (207 * Math.PI) / 180);
                ctx.stroke();

                // Arc 5
                ctx.strokeStyle = '#d89747';
                ctx.beginPath();
                ctx.arc(88, 88, 68, (212 * Math.PI) / 180, (267 * Math.PI) / 180);
                ctx.stroke();

                // Arc 6
                ctx.strokeStyle = '#363537';
                ctx.beginPath();
                ctx.arc(88, 88, 68, (272 * Math.PI) / 180, (327 * Math.PI) / 180);
                ctx.stroke();
            }

            if (remainder > (boundaryIncrementer * 5) && remainder < (boundaryIncrementer * 6)) {
                // Arc 1
                ctx.beginPath();
                ctx.arc(88, 88, 68, (332 * Math.PI) / 180, (27 * Math.PI) / 180);
                ctx.stroke();

                // Arc 2
                ctx.beginPath();
                ctx.arc(88, 88, 68, (32 * Math.PI) / 180, (87 * Math.PI) / 180);
                ctx.stroke();

                // Arc 3
                ctx.beginPath();
                ctx.arc(88, 88, 68, (92 * Math.PI) / 180, (147 * Math.PI) / 180);
                ctx.stroke();

                // Arc 4
                ctx.beginPath();
                ctx.arc(88, 88, 68, (152 * Math.PI) / 180, (207 * Math.PI) / 180);
                ctx.stroke();

                // Arc 5
                ctx.beginPath();
                ctx.arc(88, 88, 68, (212 * Math.PI) / 180, (267 * Math.PI) / 180);
                ctx.stroke();

                // Arc 6
                ctx.strokeStyle = '#d89747';
                ctx.beginPath();
                ctx.arc(88, 88, 68, (272 * Math.PI) / 180, (327 * Math.PI) / 180);
                ctx.stroke();
            }

        }

        window.requestAnimationFrame(drawDivisionLoader);

    }

    window.requestAnimationFrame(drawDivisionLoader);

    const [counter, setCounter] = useState(5)


    useState(() => {
        let interval = setInterval(() => {
            setCounter(prevState => --prevState)
        }, 1000)

    }, [])


    return (
        <div className='drum_container'>
            <div id="preloader">
                <div id="loader"></div>

                <canvas ref={canvasRef} id="division-loader" width="300px" height="300px"></canvas>

                <div id="countdown">
                    <div id="countdown-number">{counter}</div>
                </div>
            </div>
        </div>
    );
};


export default Drum;