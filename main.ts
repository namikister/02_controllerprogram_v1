/**
 * 02_ControllerProgram_v1
 * 
 * マイコンロボット(クローラータイプ)向け　コントローラー用プログラム
 * 
 * Programs a controller for the Tamiya Microcomputer Robot (Crawler Type).
 */
input.onButtonPressed(Button.A, function () {
    // 送信データを555に設定する
    // (前進指令)
    // Sets transmitted data to 555
    // (command for forward movement).
    //         
    data = 555
    basic.showArrow(ArrowNames.North)
})
input.onButtonPressed(Button.B, function () {
    // 送信データを666に設定する
    // (後進指令)
    // Sets transmitted data to 666
    // (command for reverse movement).
    //         
    data = 666
    basic.showArrow(ArrowNames.South)
})
// プログラムが動き出したときに一度だけ行う
// Runs once when the program starts.
//     
let data = 0
basic.showIcon(IconNames.SmallSquare)
basic.showIcon(IconNames.Square)
// グループ37のBBC micro:bit同士で通信するように設定する
// Allows communication between BBC micro:bits assigned to group 37.
//                 
radio.setGroup(37)
// 電波の強さを7(最大)に設定する
// Sets signal strength to 7 (maximum).
//                     
radio.setTransmitPower(7)
basic.pause(100)
basic.clearScreen()
// P02を表示する(プログラムNo.2)
// Shows P02 (Program no.2)
//                                 
basic.showString("P02")
// 繰り返し行う
// Block repeats continuously.
//     
basic.forever(function () {
    // ボタンが押されなかったなら
    // If no button is pressed...
    //             
    if (data != 555 && data != 666) {
        // 左に10°以上傾けたなら
        // If controller is tilted more than 10 degrees to the left...
        //                 
        // 右に10°以上傾けたなら
        // If controller is tilted more than 10 degrees to the right...
        //                 
        if (input.rotation(Rotation.Roll) <= -10) {
            // 送信データを傾き量に設定する
            // (旋回指令)
            // Sets transmitted data to tilt angle (command for turn).
            //                 
            data = input.rotation(Rotation.Roll)
            basic.showArrow(ArrowNames.West)
        } else if (input.rotation(Rotation.Roll) >= 10) {
            // 送信データを傾き量に設定する
            // (旋回指令)
            // Sets transmitted data to tilt angle (command for turn).
            //                 
            data = input.rotation(Rotation.Roll)
            basic.showArrow(ArrowNames.East)
        } else {
            basic.showIcon(IconNames.Target)
        }
    }
    // 送信データを送る
    // Transmits data.
    //             
    radio.sendNumber(data)
    // 送信データを0にリセットする
    // Resets transmitted data to 0.
    //                 
    data = 0
})
