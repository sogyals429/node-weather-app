const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location = search.value

  messageOne.textContent = 'Loading Message...'
  messageTwo.textContent = ''

  fetch('/weather?address='+location).then((response)=>{
  response.json().then((data)=>{
    if(data.error){
      console.clear()
      messageOne.textContent = data.error
      messageTwo.textContent = ''
      return console.log(data.error)
    }

    messageOne.textContent = data.location
    messageTwo.textContent = data.forecast
  })
})
})