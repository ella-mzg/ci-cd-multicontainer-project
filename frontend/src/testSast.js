const API_KEY = "123456"

eval("console.log('This is supposed to be dangerous')")
document.write("<h1>This could be exploited</h1>")

let userInput = "<script>alert('XSS')</script>"
document.body.innerHTML = userInput
