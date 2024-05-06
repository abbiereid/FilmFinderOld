<?php
    include 'index.php';

    if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['username']) || !isset($_POST['password'])) {
        echo json_encode(array('success' => false, 'message' => 'Something went wrong'));
    } else {
        $email = $_POST['email'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $dob = $_POST['dob'];

        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $response['success'] = false;
            $response['message'] = 'Username already exists';
        } else {
            $stmt = $conn->prepare("INSERT INTO users (email, username, password, DOB) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $email, $username, $password, $dob);
            $stmt->execute();

            $response['success'] = true;
        }
    }

    $stmt->close();
    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($response);

?>