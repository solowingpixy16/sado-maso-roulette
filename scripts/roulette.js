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
let radius;
if (ROULETTE_CANVAS.clientWidth <= ROULETTE_CANVAS.clientHeight) {
    radius = ROULETTE_CANVAS.clientWidth / 2.0;
} else {
    radius = ROULETTE_CANVAS.clientHeight / 2.0;
}

const PIECES_COUNT = 16;

// サド用の扇形を描画
for (let i = 0; i < PIECES_COUNT; i+=2) {
    CONTEXT.beginPath();
    // まずは点を中心に置く
    CONTEXT.moveTo(CENTER_X, CENTER_Y);
    // 一旦中心から円周に向かって半径を描画して、その後円弧を描く
    CONTEXT.arc(CENTER_X, CENTER_Y, radius, i / 8.0 * Math.PI, (i + 1.0) / 8.0 * Math.PI, false);
    // 円周から中心に向かって半径を描画する。これでパスが閉じて元の位置に戻る。
    CONTEXT.lineTo(CENTER_X, CENTER_Y);
    CONTEXT.fillStyle="blue";
    CONTEXT.fill();
    CONTEXT.closePath();
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
    CONTEXT.arc(CENTER_X, CENTER_Y, radius, i / 8.0 * Math.PI, (i + 1.0) / 8.0 * Math.PI, false);
    // 円周から中心に向かって半径を描画する。これでパスが閉じて元の位置に戻る。
    CONTEXT.lineTo(CENTER_X, CENTER_Y);
    CONTEXT.fillStyle="red";
    CONTEXT.fill();
    CONTEXT.closePath();
}

