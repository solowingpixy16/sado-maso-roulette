/**
 * Copyright 2025 solo-wing-pixy
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ROULETTE_CANVAS = document.getElementById("roulette_area");
const CONTEXT = ROULETTE_CANVAS.getContext("2d");

const CENTER_X = ROULETTE_CANVAS.clientWidth / 2.0;
const CENTER_Y = ROULETTE_CANVAS.clientHeight / 2.0;
let roulette_radius;
if (ROULETTE_CANVAS.clientWidth <= ROULETTE_CANVAS.clientHeight) {
    roulette_radius = ROULETTE_CANVAS.clientWidth / 2.0 - 20;
} else {
    roulette_radius = ROULETTE_CANVAS.clientHeight / 2.0 - 20;
}

const INDICATOR_CIRCLE_RADIUS = 10;
const INDICATOR_ORBIT_RADIUS = roulette_radius + 10;
const INDICATOR_SPEED_STANDARD = 0.02;
const INDICATOR_SPEED_SLOW1 = 0.02;
const INDICATOR_SPEED_SLOW2 = 0.015;
const INDICATOR_SPEED_SLOW3 = 0.01;
const INDICATOR_SPEED_SLOW4 = 0.005;

const PIECES_COUNT = 16;
const STEP_ANGLE = 2.0 * Math.PI / PIECES_COUNT;

const STATE_READY = 0;
const STATE_SPINNING = 1;
const STATE_SLOW1 = 2;
const STATE_SLOW2 = 3;
const STATE_SLOW3 = 4;
const STATE_SLOW4 = 5;
const STATE_RESULT = 6;

let current_state = STATE_READY;

const INDICATOR_STANDBY_ANGLE = 3.0/2.0 * Math.PI;
let current_indicator_angle = INDICATOR_STANDBY_ANGLE;
let indicator_angle_at_switching_state = INDICATOR_STANDBY_ANGLE;
const INDICATOR_BRAKE_REACTION_ANGLE = 1.0 / 4.0 * Math.PI;

function draw() {
    CONTEXT.clearRect(0, 0, ROULETTE_CANVAS.clientWidth, ROULETTE_CANVAS.clientHeight);
    // サド用の扇形を描画
    for (let i = 0; i < PIECES_COUNT; i+=2) {
        CONTEXT.beginPath();
        // まずは点を中心に置く
        CONTEXT.moveTo(CENTER_X, CENTER_Y);
        // 一旦中心から円周に向かって半径を描画して、その後円弧を描く
        CONTEXT.arc(CENTER_X, CENTER_Y, roulette_radius, i * STEP_ANGLE, (i + 1.0) / 8.0 * Math.PI, false);
        // 円周から中心に向かって半径を描画する。これでパスが閉じて元の位置に戻る。
        CONTEXT.lineTo(CENTER_X, CENTER_Y);
        CONTEXT.fillStyle = "blue";
        CONTEXT.fill();
        CONTEXT.closePath();
        CONTEXT.fillStyle = "yellow";
        CONTEXT.font = "20px Arial";
        CONTEXT.fillText("S", CENTER_X + 2.0 / 3.0 * roulette_radius * Math.cos((i + 0.5) * STEP_ANGLE), CENTER_Y + 2.0 / 3.0 * roulette_radius * Math.sin((i + 0.5) * STEP_ANGLE));
    }

    // マゾ用の扇形を描画
    for (let i = 1; i < PIECES_COUNT; i+=2) {
        // なーんかコピペコードになってて嫌
        // 1個の扇形を描画する処理を関数化、あと扇を一定間隔で埋め尽くす処理を関数化して処理を共通化したい
        // でも4月1日に間に合うことが正義なのでもうどうでもいい
        CONTEXT.beginPath();
        // まずは点を中心に置く
        CONTEXT.moveTo(CENTER_X, CENTER_Y);
        // 一旦中心から円周に向かって半径を描画して、その後円弧を描く
        CONTEXT.arc(CENTER_X, CENTER_Y, roulette_radius, i * STEP_ANGLE, (i + 1.0) / 8.0 * Math.PI, false);
        // 円周から中心に向かって半径を描画する。これでパスが閉じて元の位置に戻る。
        CONTEXT.lineTo(CENTER_X, CENTER_Y);
        CONTEXT.fillStyle = "red";
        CONTEXT.fill();
        CONTEXT.closePath();
        CONTEXT.fillStyle = "green";
        CONTEXT.font = "20px Arial";
        CONTEXT.fillText("M", CENTER_X + 2.0 / 3.0 * roulette_radius * Math.cos((i + 0.5) * STEP_ANGLE), CENTER_Y + 2.0 / 3.0 * roulette_radius * Math.sin((i + 0.5) * STEP_ANGLE));
    }

    switch (current_state) {
        case STATE_READY:
            current_indicator_angle = INDICATOR_STANDBY_ANGLE;
            break;
        case STATE_SPINNING:
            current_indicator_angle += INDICATOR_SPEED_STANDARD;
            break;
        case STATE_SLOW1:
            {
                current_indicator_angle += INDICATOR_SPEED_SLOW1;

                let threshold = indicator_angle_at_switching_state + INDICATOR_BRAKE_REACTION_ANGLE;
                if (current_indicator_angle >= threshold) {
                    ++current_state;
                    indicator_angle_at_switching_state = current_indicator_angle;
                    console.log("slow1 -->> slow2");
                }
            }
            break;
        case STATE_SLOW2:
            {
                current_indicator_angle += INDICATOR_SPEED_SLOW2;

                let threshold = indicator_angle_at_switching_state + INDICATOR_BRAKE_REACTION_ANGLE;
                if (current_indicator_angle >= threshold) {
                    ++current_state;
                    indicator_angle_at_switching_state = current_indicator_angle;
                    console.log("slow2 -->> slow3");
                }
            }
            break;
        case STATE_SLOW3:
            {
                current_indicator_angle += INDICATOR_SPEED_SLOW3;

                let threshold = indicator_angle_at_switching_state + INDICATOR_BRAKE_REACTION_ANGLE;
                if (current_indicator_angle >= threshold) {
                    ++current_state;
                    indicator_angle_at_switching_state = current_indicator_angle;
                    console.log("slow3 -->> slow4");
                }
            }
            break;
        case STATE_SLOW4:
            {
                current_indicator_angle += INDICATOR_SPEED_SLOW4;
                let normalized_current_indicator_angle = current_indicator_angle;
                while (normalized_current_indicator_angle >= 2.0 * Math.PI) {
                    // ここの計算が最高にバカすぎて論外
                    normalized_current_indicator_angle -= 2.0 * Math.PI;
                }
                let stopping_required = false;
                for (let angle = 3.0 / 2.0 * STEP_ANGLE; angle < 2.0 * Math.PI; angle += 2.0 * STEP_ANGLE) {
                    if (angle - STEP_ANGLE / 4.0 <= normalized_current_indicator_angle && normalized_current_indicator_angle <= angle + STEP_ANGLE / 4.0) {
                        stopping_required = true;
                    }
                }
                if (stopping_required) {
                    ++current_state;
                    indicator_angle_at_switching_state = current_indicator_angle;
                    document.getElementById("roulette_triggering_button").textContent = "Start";
                    document.getElementById("text_you_are").textContent = "あなたは....";
                    document.getElementById("text_masochist").textContent = "クソドMです!!!";
                    console.log("slow4 -->> result");
                }
            }
            break;
        case STATE_RESULT:
            break;
        default:
            console.log("This log must not be displayed.");
            break;
    }

    let current_indicator_x = CENTER_X + INDICATOR_ORBIT_RADIUS * Math.cos(current_indicator_angle);
    let current_indicator_y = CENTER_Y + INDICATOR_ORBIT_RADIUS * Math.sin(current_indicator_angle);
    CONTEXT.beginPath();
    CONTEXT.moveTo(current_indicator_x, current_indicator_y);
    CONTEXT.arc(current_indicator_x, current_indicator_y, INDICATOR_CIRCLE_RADIUS, 0, 2.0 * Math.PI, false);
    CONTEXT.fillStyle = "yellow";
    CONTEXT.fill();
    CONTEXT.closePath();
}

setInterval(draw, 10);

function triggerSpinningRoulette() {
    console.log(">>> triggerSpinningRoulette()");
    switch (current_state) {
        case STATE_READY:
        case STATE_RESULT:
            console.log("    triggerSpinningRoulette(): Start spinning");
            document.getElementById("roulette_triggering_button").textContent = "Stop!";
            document.getElementById("text_you_are").textContent = "_";
            document.getElementById("text_masochist").textContent = "_";
            current_state = STATE_SPINNING;
            indicator_angle_at_switching_state = current_indicator_angle;
            break;
        case STATE_SPINNING:
            console.log("    triggerSpinningRoulette(): Slow down");
            document.getElementById("roulette_triggering_button").textContent = "抽選中";
            current_state = STATE_SLOW1;
            indicator_angle_at_switching_state = current_indicator_angle;
            break;
        default:
            // 何もしない
            break;
    }
    console.log("<<< triggerSpinningRoulette()");
}
