import React, {useRef, useState} from "react";
import Field from "./Field";

export default function () {
    const [state, setState] = useState({});
    const currentStep = useRef('x');
    const endGame = useRef(false);

    function issetValue(x, y) {
        try {
            const value = state[x][y];
            if (!value) {
                return false
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    function checkWin(x, y) {
        console.time('test');
        const step = currentStep.current;

        function horizontalCheck() {
            let res = 1;
            for (let i = y - 2; i < y + 3; i++) {
                if (issetValue(x, i) && state[x][i] === step) {
                    res++;
                }
            }
            return res === 3;
        }

        function verticalCheck() {
            let res = 1;
            for (let i = x - 2; i < x + 3; i++) {
                if (issetValue(i, y) && state[i][y] === step) {
                    res++;
                }
            }
            return res === 3;
        }

        function diagonalCheck() {
            console.log("check")
            let res = 1,
                k = 0;
            const yArray = [];
            for (let i = y - 2; i < y + 4; i++) {
                yArray.push(i);
            }
            for (let i = x - 2; i < x + 3; i++) {
                if (issetValue(i, yArray[k]) && state[i][yArray[k]] === step) {
                    res++;
                }
                k++;
            }
            k = 0;
            if (res !== 3) {
                res = 1
            } else {
                return true;
            }
            for (let i = x + 2; i > x - 3; i--) {
                if (issetValue(i, yArray[k]) && state[i][yArray[k]] === step) {
                    res++;
                }
                k++;
            }
            return res === 3;
        }

        if (horizontalCheck())
            return true;
        //console.timeEnd('test');
        if (verticalCheck())
            return true;
        //console.timeEnd('test');
        if (diagonalCheck())
            return true;
        //console.timeEnd('test');
        return false;
    }

    function onClick(x, y) {
        if (endGame.current) {
            return;
        }
        if (issetValue(x, y)) {
            return;
        }
        setState({
                ...state,
                [x]: {
                    ...state[x],
                    [y]: currentStep.current
                }
            }
        );
        if (checkWin(x, y)) {
            endGame.current = true;
            return;
        }
        toggleStep();
    }

    function toggleStep() {
        if (currentStep.current === 'x') {
            currentStep.current = 'o';
        } else {
            currentStep.current = 'x';
        }
    }
    function resetGrid() {
        endGame.current = false;
        setState({});
    }

    function generateGrid() {
        const array = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                array.push(
                    <Field
                        x={i}
                        y={j}
                        value={issetValue(i, j) ? state[i][j] : ''}
                        clickHandler={onClick}
                        key={`${i} ${j}`}
                    />
                )
            }
        }
        return array;
    };
    return (<>
            <div className="grid">
                {generateGrid()}
            </div>
            {endGame.current ? 'Победил ' + currentStep.current : ''}
            {endGame.current ? <button onClick={resetGrid}>Начать заново</button> : ''}
        </>
    )
}