// ? =============> Global ===============>
const inputs = document.querySelectorAll("input");
const btnRegister = document.getElementById("btnRegister");
const formData = document.querySelector("form");
let isValid = false;
const mode = document.getElementById("mode");
// ! =============> When Start ===============>

if (localStorage.getItem("theme") != null) {
   const themeData = localStorage.getItem("theme");

   if (themeData === "light") {
      mode.classList.replace("fa-sun", "fa-moon");
   } else {
      mode.classList.replace("fa-moon", "fa-sun");
   }

   document.querySelector("html").setAttribute("data-theme", themeData);
}
formData.addEventListener("submit", function (e) {
  e.preventDefault();

  if (isValidData()) {  // Call isValidData before setForm
     setForm();
  }
});

inputs[0].addEventListener('input', function() {
	vName(inputs[0]);
});
inputs[1].addEventListener('input', function() {
	vName(inputs[1]);
});
inputs[2].addEventListener('input', function() {
	vEmail();
});
inputs[3].addEventListener('input', function() {
	vPass();
});
inputs[4].addEventListener('input', function() {
  vAge()
});

mode.addEventListener("click", function (e) {
   if (mode.classList.contains("fa-sun")) {
      document.querySelector("html").setAttribute("data-theme", "light");
      mode.classList.replace("fa-sun", "fa-moon"); // change icon -->moon

      localStorage.setItem("theme", "light");
   } else {
      mode.classList.replace("fa-moon", "fa-sun"); //change icon -->sun
      document.querySelector("html").setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
   }
});
// ! =============> Functions ===============>

function setForm() {
   const user = {
      first_name: inputs[0].value,
      last_name: inputs[1].value,
      email: inputs[2].value,
      password: inputs[3].value,
      age: inputs[4].value,
   };

   console.log(user);

   registerForm(user);
}

async function registerForm(userData) {
   const api = await fetch(`https://movies-api.routemisr.com/signup`, {
      method: "post",
      body: JSON.stringify(userData),
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
   });

   const response = await api.json();

   if (response.message === "success") {
      location.href = "./index.html";

   } else {
      document.getElementById("msg").innerHTML = response.errors?.email.message;
   }

   console.log(response);
}

//  =============> Validation ===============>
// function validationName(input) {
//    const regexStyle =
//       /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;

//    if (regexStyle.test(input.value)) {
//       // el tmam
//       input.classList.add("is-valid");
//       input.classList.remove("is-invalid");
//       return true;
//    } else {
//       //el mesh tmam

//       input.classList.add("is-invalid");
//       input.classList.remove("is-valid");

//       return false;
//    }
// }

function vName(index) {
	var regN = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
	if (regN.test(index.value)) {
		index.classList.add('is-valid');
		index.classList.remove('is-invalid');
		return true;
	} else {
		index.classList.add('is-invalid');
		index.classList.remove('is-valid');
		return false;
	}
}
function vEmail( ) {
  var regEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regEmail.test(inputs[2].value)) {
    inputs[2].classList.add('is-valid');
    inputs[2].classList.remove('is-invalid');
    return true;
  } else {
    inputs[2].classList.add('is-invalid');
    inputs[2].classList.remove('is-valid');
    return false;
  }
}

function vPass() {
  var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regpass.test(inputs[3].value)) {
    inputs[3].classList.add('is-valid');
    inputs[3].classList.remove('is-invalid');
    return true;
  } else {
    inputs[3].classList.add('is-invalid');
    inputs[3].classList.remove('is-valid');
    return false;
  }
}
function vAge() {
  var regAge = /^([1-7][0-9]|80)$/ ;
  if (regAge.test(inputs[4].value)) {
    inputs[4].classList.add('is-valid');
    inputs[4].classList.remove('is-invalid');
    return true;
  } else {
    inputs[4].classList.add('is-invalid');
    inputs[4].classList.remove('is-valid');
    return false;
  }
}
function isValidData() {
  if (vName(inputs[0]) && vName(inputs[1]) && vEmail() && vPass() && vAge()) {
    isValid = true;
  } else {
    isValid = false;
  }
  return isValid;
}

