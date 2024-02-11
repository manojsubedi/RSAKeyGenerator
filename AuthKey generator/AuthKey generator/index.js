
var successMessage = document.getElementById('copy-success-message')

async function generateAuthKey() {
    var password = document.getElementById('password').value;
    var iv = document.getElementById('iv').value;
    var key = document.getElementById('key').value;
    var keySize = parseInt(document.getElementById('keySize').value);
    var encryptionAlgorithm = document.getElementById('encryptionAlgorithm').value;
    var errorMessage = document.getElementById("error-message");
    // Convert key and IV from Hex to Uint8Array
    var keyBytes = new TextEncoder().encode(key);
    var ivBytes = new TextEncoder().encode(iv);
    var authKeyField = document.getElementById('authKey');
    var copyBtn =  document.getElementById('copyBtn')
    successMessage.style.display = 'none';
    

    // Convert password to Uint8Array
    var passwordBytes = new TextEncoder().encode(password);

    // Import key
    var importedKey = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        { name: "AES-CBC", length: keySize },
        false,
        ["encrypt"]
    );
        errorMessage.style.display = 'none';
    if (iv.length !== 16) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = "Error: Value must be 16 bytes long.";
        document.getElementById('result').style.display = 'none';
        copyBtn.style.display = 'none';
        
    } else {
        // Encrypt
        var encryptedBuffer = await crypto.subtle.encrypt(
            { name: "AES-CBC", iv: ivBytes },
            importedKey,
            passwordBytes
        );

        // Convert the result to Base64
        var encryptedArray = new Uint8Array(encryptedBuffer);
        var encryptedBase64 = btoa(String.fromCharCode.apply(null, encryptedArray));

        // Display the result
        document.getElementById('result').style.display = 'block';
        document.getElementById('authKey').value = encryptedBase64;
        if (document.getElementById('authKey').value != "") {
            copyBtn.style.visibility = 'visible'
        }
    }

}

function copyAuthKey() {
    var authKeyField = document.getElementById('authKey');
    authKeyField.select();
    document.execCommand('copy');
  
    // Create and hide message element
    successMessage.textContent = 'AuthKey copied to clipboard!';
    
    // Show message for 2 seconds and then hide
    successMessage.style.display = 'block';
    setTimeout(function() {
      successMessage.style.display = 'none';
    }, 2000);
  }