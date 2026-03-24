<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$file = __DIR__ . '/status.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $status = in_array($input['status'], ['online', 'away', 'offline']) ? $input['status'] : 'offline';
    
    file_put_contents($file, json_encode([
        'status' => $status,
        'timestamp' => time()
    ]));
    echo json_encode(['ok' => true]);
} else {
    // GET — отдаём текущий статус
    if (file_exists($file)) {
        $data = json_decode(file_get_contents($file), true);
        // Если последний сигнал был больше 3 минут назад — считаем оффлайн
        if (time() - ($data['timestamp'] ?? 0) > 180) {
            $data['status'] = 'offline';
        }
        echo json_encode($data);
    } else {
        echo json_encode(['status' => 'offline']);
    }
}