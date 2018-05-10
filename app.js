function readPublicKeys(pubkey) {
    var result = openpgp.key.readArmored(pubkey.trim());
    if (result.err) {
        throw new Error(result.err.toString());
    }
    return result.keys;
}

document.addEventListener("DOMContentLoaded", function (event) {
    var pubkey = document.getElementById('pubkey');
    var output = document.getElementById('output');
    var failure = document.getElementById('failure');
    var success = document.getElementById('success');
    var check = document.getElementById('check');
    failure.style.color = 'red';
    success.style.color = 'green';
    check.addEventListener('click', function (event) {
        openpgp.encrypt({
            publicKeys: readPublicKeys(pubkey.value),
            data: "Hello, world!"
        }).then(function (result) {
            success.style.display = '';
            failure.style.display = 'none';
            output.innerText = result.data;
        }).catch(function (err) {
            success.style.display = 'none';
            failure.innerText = "Failure: " + err.toString();
            failure.style.display = '';
            output.innerText = "";
        });
    })
});