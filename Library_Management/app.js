console.log("Hello World!");

// constructor
function Book(name, author, price, type){
	// this refer to the "owner" of the method
	// in function this refer to  the global object
	this.name = name;
	this.author = author;
	this.price = price
	this.type = type;
}

// display function
function Display(){


}


// add method to display prototype
Display.prototype.add = function(book){
	let libraryData = document.getElementById('libraryData'); 
	let myString  = `
		      <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.price}</td>
                <td>${book.type}</td>

              </tr>
	`;
	libraryData.innerHTML += myString;
}

// implement the clear function
Display.prototype.clear = function(){
	let libraryForm = document.getElementById('libraryForm');
	libraryForm.reset();
}

// implement the validated function
Display.prototype.validated = function(book){
	if (book.name.length<3 || book.author.length<3 || book.price<=0){
		return false;
	}
	else{
		return true;
	}
}

Display.prototype.show = function(type, message){
	let showMessage = document.getElementById('showMessage');
	let boltText;
	if (type=='success'){
		boltText  = 'Success! ';
	}
	else{
		boltText = 'Error! ';
	}
	showMessage.innerHTML = `
		      <div class="alert alert-${type} alert-dismissible fade show">
			        <strong>${boltText} : ${message}</strong>
			        <button 
			            type="buttom" 
			            class="close" 
			            data-dismiss="alert" 
			            aria-label="Close"
			        >
			          <span aria-hidden="true">&times;</span>
			        </button>
		      </div>
	`;
	setTimeout(function(){
		message.innerHTML = '';
	}, 5000);
}

// add submit event listener to libraryForm
// grab form id (libraryForm)
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e){
	console.log("you have to submites libraryForm...")
	let bookName = document.getElementById('bookName').value;
	console.log(bookName);
	let bookAuthor  = document.getElementById('bookAuthor').value;
	console.log(bookAuthor);
	let bookPrice = document.getElementById('bookPrice').value;	
	console.log(bookPrice);
	
	let computerProgramming = document.getElementById('computerProgramming');
	let python = document.getElementById('python');
	let type;

	if (computerProgramming.checked){
		// if condition is true then my checkbox value store in type variable
		type = computerProgramming.value;
	}
	else if (python.checked){
		//return the checked state of the checkbox
		type = python.value;
	}

	let book = new Book(bookName, bookAuthor, bookPrice, type);
	console.log(book)

	let display = new Display();
	// add new method to object constructor
	if(display.validated(book)){
		display.add(book);
		display.clear();
		display.show("success", "Your Book Is Added Successfully!");
	}
	else{
		// show error to the user
		display.show("danger", "You Can not Add Book, Pls Try Again!");
	}

	e.preventDefault();
}