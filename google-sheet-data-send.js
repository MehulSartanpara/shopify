function Oladupe() {

	fetch('https://script.google.com/macros/s/AKfycbybJLUapqcQj_uXZ3X8ACDBJsoqE0cnfDSivruYRKoVehn_Fk2ApTN_MFabdrxb-cKKUQ/exec', {
		method: 'GET',
	}).then(response => {
		if (!response.ok) {
		  throw new Error('Network response was not ok');
		}
		return response.text();
	})
	.then(response => {
		const rowCount = parseInt(response)
		const klaviyoForm = document.querySelector('[oladupe-klaviyo-form]')
		const customForm = document.querySelector('[oladupe-custom-form]')
		if (rowCount >= 161) {
			klaviyoForm.classList.remove('hidden')
			customForm.classList.add('hidden')
		} else {
			klaviyoForm.classList.add('hidden')
			customForm.classList.remove('hidden')
		}
	}).catch(error => {
		console.error('Error:', error)
	})

	// FORM JS
	const customForm = document.querySelector('[oladupe-free-bottle-form-btn]')
	customForm.addEventListener('click', function (e) {
		e.preventDefault()
		const form = e.target.closest('[oladupe-form]')

		let allFieldsFilled = true
		let EmailFieldsTrue = true
		let cityFieldsTrue = true
		let stateFieldsTrue = true
		const requiredFields = form.querySelectorAll('[required]');
		requiredFields.forEach(field => {
			if (field.value.trim() === '') {
				allFieldsFilled = false
			}
			if (field.getAttribute('name') === 'Email') {
				const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
				if (!validEmail) {
					EmailFieldsTrue = false
				}
			}
			if (field.getAttribute('name') === 'City') {
				var letters = /^[A-Za-z]+$/;
				if (!field.value.match(letters)) { 
					cityFieldsTrue = false
				}
			}
			if (field.getAttribute('name') === 'State') {
				var letters = /^[A-Za-z]+$/;
				if (!field.value.match(letters)) {
					stateFieldsTrue = false
				}
			}
		})
		const errorElement = document.querySelector('[oladupe-form-erorr]')
		const timeoutId = setTimeout(() => {
			errorElement.textContent = '';
		}, 3000);
		if (allFieldsFilled) {
			if(EmailFieldsTrue){
				if(cityFieldsTrue){
					if(stateFieldsTrue){
						customForm.classList.add('loading')
						$.ajax({
							url:'https://script.google.com/macros/s/AKfycbybJLUapqcQj_uXZ3X8ACDBJsoqE0cnfDSivruYRKoVehn_Fk2ApTN_MFabdrxb-cKKUQ/exec',
							type: 'POST',
							data:  $('[oladupe-form]').serialize(),
							success: function(response){
								if(response.error == 'limit_exceeded'){
									const hasPopupOutStock = $('[oladupe-out-stock-popup]')
									if(hasPopupOutStock.length){
										hasPopupOutStock.find('[oladupe-out-stock-popup-wrapper]').addClass('open')
									}else{
										const klaviyoForm = document.querySelector('[oladupe-klaviyo-form]')
										const customForm = document.querySelector('[oladupe-custom-form]')
										klaviyoForm.classList.remove('hidden')
										customForm.classList.add('hidden')
									}
								}else{
									const hasPopupSuccess = $('[oladupe-success-popup]')
									if(hasPopupSuccess.length){
										hasPopupSuccess.find('[oladupe-success-popup-wrapper]').addClass('open')
									}
								}
								customForm.classList.remove('loading')
								const form = document.querySelector('[oladupe-form]')
								form.reset()
							},
							error: function(error){
								console.error('Error:', error)
								customForm.classList.remove('loading')
								errorElement.textContent = 'Something went wrong, please try again.'
								timeoutId

							}
						})
					}else{
						errorElement.textContent = 'State field contains only alphabets.'
						timeoutId
					}
				}else{
					errorElement.textContent = 'City field contains only alphabets.'
					timeoutId
				}
			}else{
				errorElement.textContent = 'Email address must be in a valid format.'
				timeoutId
			}
		}else{
			errorElement.textContent = 'Please fill out all required fields.'
			timeoutId
		}
	})

	// CLOSE POPUP JS
	document.addEventListener('click', (e) => {
		if (e.target.closest('.close-popup')) {
			document.querySelector('.popup-wrapper.open').classList.remove('open')
			location.reload()
		}
		if (e.target.closest('.popup-wrapper.open')) {
			if (!e.target.closest('.popup-content')) {
				document.querySelector('.popup-wrapper.open').classList.remove('open')
				location.reload()
			}
		}
	})

	// POPUP TRIGGER JS
	document.addEventListener('click', (e) => {
		if (e.target.classList.contains('block__oladupe-footer-popup')) {
		  document.querySelector('#ot-sdk-btn').click();
		}
	})
}

const OladupeInit = {
	init() {
		const loyaltyElement = document.querySelectorAll('.page--oladupe')
		if (!loyaltyElement || loyaltyElement.length == 0)
			return
		new Oladupe()
	}
}

export default OladupeInit