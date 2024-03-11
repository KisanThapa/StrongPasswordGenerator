function generatePassword(
	passwordLength,
	isUpperCase,
	isLowerCase,
	isNumber,
	isSpecial,
	customCharacters
) {
	let password = "";
	let characterSet = "";

	if (isUpperCase) {
		characterSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	}
	if (isLowerCase) {
		characterSet += "abcdefghijklmnopqrstuvwxyz";
	}
	if (isNumber) {
		characterSet += "0123456789";
	}
	if (isSpecial) {
		characterSet += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
	}

	for (let i = 0; i < passwordLength - customCharacters.length; i++) {
		let randomIndex = Math.floor(Math.random() * characterSet.length);
		password += characterSet[randomIndex];
	}

	password += customCharacters;

	password = password.split("");
	for (let i = password.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[password[i], password[j]] = [password[j], password[i]];
	}
	password = password.join("");

	return password;
}

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("generate").addEventListener("click", function () {
		let passwordLength = document.getElementById("length").value;
		let isUpperCase = document.getElementById("uppercase").checked;
		let isLowerCase = document.getElementById("lowercase").checked;
		let isNumber = document.getElementById("number").checked;
		let isSpecial = document.getElementById("special").checked;
		let customCharacters = document.getElementById("custom").value;

		// Remove duplicate characters
		customCharacters = [...new Set(customCharacters)].join("");

		if (passwordLength < 1) {
			alert("Password length must be greater than 0");
			return;
		}

		if (customCharacters.length > passwordLength) {
			alert("Custom characters length must be less than or equal to password length");
			return;
		}

		let generatedPassword = generatePassword(
			passwordLength,
			isUpperCase,
			isLowerCase,
			isNumber,
			isSpecial,
			customCharacters
		);

		document.getElementById("password").value = generatedPassword;
	});

	document.getElementById("copy").addEventListener("click", function () {
		if (!document.getElementById("password").value) {
			return;
		}

		let password = document.getElementById("password").value;
		navigator.clipboard
			.writeText(password)
			.then(() => alert("Password copied to clipboard"))
			.catch((err) => console.error("Could not copy text: ", err));
	});
});
