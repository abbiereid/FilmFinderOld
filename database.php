<?php

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['function'])) {
    $action = $data['function'];
    switch ($action) {
        case 'register':
            registerUser($data['formData']);
            break;
    }
}

function registerUser($formData) {
    global $conn;
    $email = $formData['newEmail'];
    $username = $formData['newUsername'];
    $password = $formData['newPassword'];
    $DOB = $formData['newDOB'];

    $stmt = $conn->prepare("INSERT INTO users (email, username, password, DOB) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $email, $username, $password, $DOB);
    
    $success = $stmt->execute() ? true : false;
    $stmt->close();

    $response = array('success' => $success);
    echo json_encode($response);
}