window.onload = function() {
    document.querySelector('#registerForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        await fetch('register.php', {
            method: 'POST',
            body: new FormData(e.target)
         }).then(response => {
             if (response.success === true) {
                 alert('Registration successful!');
             } else {
                 alert('Error: ' + response.status);
             }
         });
     });
}